import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalPayment = ({ amount, tierLabel }) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const numericAmount = Math.max(1, parseFloat(amount) || 1);
  const formattedAmount = numericAmount.toFixed(2);

  const handleCreateOrder = (data, actions) => {
    setErrorMessage("");
    return actions.order.create({
      purchase_units: [
        {
          description: `The Fake Donation: ${tierLabel}`,
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
    setErrorMessage(
      "An error occurred while connecting with PayPal. Please check your credentials or try again."
    );
  };

  const handleReset = () => {
    setPaymentSuccess(null);
    setErrorMessage("");
  };

  return (
    <div className="donate-paypal-container w-full bg-[#180f0d] border-[.25vw] border-[#2a1e18] rounded-2xl p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-300">
      {paymentSuccess ? (
        <div className="flex flex-col items-center text-center py-4 gap-3">
          <div className="w-14 h-14 rounded-full bg-[#2a1e18] border border-[#a89070] flex items-center justify-center text-2xl text-[#a89070]">
            ✓
          </div>
          <h4 className="font-sans font-bold text-milk text-xl md:text-2xl uppercase tracking-tight">
            Thank you, {paymentSuccess.payer?.name?.given_name || "Supporter"}!
          </h4>
          <p className="font-paragraph text-[#a89070] text-sm max-w-md">
            Your contribution of{" "}
            <span className="text-milk font-bold">${formattedAmount} USD</span> for{" "}
            <span className="text-milk font-semibold">{tierLabel}</span> has been received.
          </p>
          {paymentSuccess.id && (
            <span className="text-[11px] font-mono text-[#8c7d75] tracking-wider uppercase">
              Order ID: {paymentSuccess.id}
            </span>
          )}
          <button
            onClick={handleReset}
            className="mt-3 px-6 py-2 rounded-full bg-[#2a1e18] hover:bg-[#3d2820] text-milk font-sans text-xs uppercase tracking-widest border border-[#0f0d0e] transition-all cursor-pointer"
          >
            Back another tier
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center border-b border-[#2a1e18] pb-3">
            <div className="flex flex-col">
              <span className="text-[11px] font-paragraph uppercase tracking-[.25em] text-[#8c7d75]">
                Selected Tier
              </span>
              <span className="font-sans font-bold text-milk text-base md:text-lg">
                {tierLabel}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-paragraph uppercase tracking-[.25em] text-[#8c7d75]">
                Amount
              </span>
              <div className="font-sans font-bold text-milk text-xl md:text-2xl">
                ${formattedAmount}{" "}
                <span className="text-xs text-[#a89070] font-normal">USD</span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-red-300 text-xs flex justify-between items-center">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage("")}
                className="text-red-400 hover:text-red-200 font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {isPending ? (
            <div className="flex items-center justify-center py-6 gap-3 text-[#a89070] font-paragraph text-sm">
              <div className="w-4 h-4 border-2 border-[#a89070] border-t-transparent rounded-full animate-spin"></div>
              <span>Initializing PayPal Gateway...</span>
            </div>
          ) : isRejected ? (
            <div className="p-4 bg-yellow-950/30 border border-yellow-800/50 rounded-lg text-[#d4af37] text-xs">
              Unable to load PayPal script. Please check your network or verify your PayPal Client ID configuration.
            </div>
          ) : null}

          <div className="w-full relative z-10 paypal-buttons-wrapper">
            <PayPalButtons
              key={`${formattedAmount}-${tierLabel}`}
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "donate",
                height: 44,
              }}
              forceReRender={[formattedAmount, tierLabel]}
              createOrder={handleCreateOrder}
              onApprove={handleApprove}
              onError={handleError}
              onCancel={() => setErrorMessage("Payment was cancelled.")}
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#8c7d75] font-paragraph">
            <span>🔒 Encrypted 256-bit PayPal Checkout</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PayPalPayment;
