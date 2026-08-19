import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalModal = ({ isOpen, onClose, amount, tierLabel }) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const numericAmount = Math.max(1, parseFloat(amount) || 1);
  const formattedAmount = numericAmount.toFixed(2);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage("");
      setPaymentSuccess(null);

      // Lock background scrolling while modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleCreateOrder = (data, actions) => {
    setErrorMessage("");
    return actions.order.create({
      purchase_units: [
        {
          description: `The Fake Support - ${tierLabel}`,
          amount: {
            currency_code: "USD",
            value: formattedAmount,
          },
        },
      ],
    });
  };

  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      setPaymentSuccess(details);
      setErrorMessage("");
    } catch (err) {
      console.error("Capture error:", err);
      setErrorMessage("Payment capture was not completed. Please try again.");
    }
  };

  const handleError = (err) => {
    console.error("PayPal checkout error:", err);
    setErrorMessage("PayPal encountered an error. Please verify your connection or PayPal account.");
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative z-10 bg-[#160e0c] border border-[#33221b] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#2a1e18] pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-paragraph uppercase tracking-[.25em] text-[#8c7d75]">
              Backing The Fake
            </span>
            <h3 className="font-sans font-bold text-milk text-lg uppercase tracking-tight">
              {tierLabel}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#241714] hover:bg-[#33201b] text-[#a89070] hover:text-milk flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {paymentSuccess ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-12 h-12 rounded-full bg-[#2a1e18] border border-[#a89070] flex items-center justify-center text-xl text-[#a89070]">
              ✓
            </div>
            <h4 className="font-sans font-bold text-milk text-xl uppercase">
              Thank You, {paymentSuccess.payer?.name?.given_name || "Supporter"}!
            </h4>
            <p className="font-paragraph text-[#a89070] text-sm">
              Your donation of <span className="text-milk font-bold">${formattedAmount} USD</span> has been received. Thank you for supporting indie development!
            </p>
            {paymentSuccess.id && (
              <span className="text-[10px] font-mono text-[#8c7d75] tracking-wider uppercase">
                ID: {paymentSuccess.id}
              </span>
            )}
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#e2d9ce] hover:bg-white text-[#130f0d] font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Amount Summary */}
            <div className="bg-[#1e1210] border border-[#2a1e18] rounded-xl p-3.5 flex justify-between items-center">
              <span className="text-xs font-paragraph text-[#a89070] uppercase tracking-wider">
                Total Donation
              </span>
              <span className="font-sans font-bold text-milk text-2xl">
                ${formattedAmount} <span className="text-xs text-[#a89070]">USD</span>
              </span>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-lg text-red-300 text-xs flex justify-between items-center">
                <span>{errorMessage}</span>
                <button
                  onClick={() => setErrorMessage("")}
                  className="text-red-400 hover:text-red-200 font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {isPending && (
              <div className="flex items-center justify-center py-4 gap-2 text-[#a89070] text-xs">
                <div className="w-3.5 h-3.5 border-2 border-[#a89070] border-t-transparent rounded-full animate-spin"></div>
                <span>Loading PayPal...</span>
              </div>
            )}

            {isRejected && (
              <div className="p-3 bg-yellow-950/30 border border-yellow-800/50 rounded-lg text-[#d4af37] text-xs">
                Unable to connect to PayPal. Please verify your client ID or network.
              </div>
            )}

            {/* PayPal Buttons */}
            <div className="w-full relative z-10">
              <PayPalButtons
                key={`${formattedAmount}-${tierLabel}`}
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "donate",
                  height: 40,
                }}
                forceReRender={[formattedAmount, tierLabel]}
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onError={handleError}
                onCancel={() => setErrorMessage("Payment was cancelled.")}
              />
            </div>

            <div className="flex items-center justify-center text-[10px] text-[#8c7d75] font-paragraph">
              <span>🔒 256-bit Secure PayPal Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PayPalModal;
