import { useEffect } from "react";
import { createPortal } from "react-dom";

const PayPalModal = ({ isOpen, onClose, amount, tierLabel, tierDesc, hostedButtonId }) => {
  useEffect(() => {
    if (isOpen && hostedButtonId) {
      // Lock background scrolling while modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Render the PayPal hosted button
      if (window.paypal && window.paypal.HostedButtons) {
        const containerId = `paypal-container-${hostedButtonId}`;
        // Clear previous button if any to avoid duplicates
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = "";
        }
        
        window.paypal.HostedButtons({
          hostedButtonId: hostedButtonId
        }).render(`#${containerId}`);
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose, hostedButtonId]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative z-10 bg-[#160e0c] border border-[#33221b] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#2a1e18] pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-paragraph uppercase tracking-[.25em] text-[#8c7d75]">
              Backing <span className="normal-case">TheFakes</span>
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

        <div className="flex flex-col gap-4">
          {/* Custom Description Managed by React */}
          {tierDesc && (
            <p className="font-paragraph text-[#8c7d75] text-sm leading-relaxed">
              {tierDesc}
            </p>
          )}

          {/* PayPal Button Container */}
          <div className="w-full relative z-10 flex justify-center min-h-[60px]">
            <div id={`paypal-container-${hostedButtonId}`} className="w-full" style={{ minWidth: "250px" }}></div>
          </div>

          <div className="flex items-center justify-center text-[10px] text-[#8c7d75] font-paragraph">
            <span>🔒 256-bit Secure PayPal Checkout</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PayPalModal;
