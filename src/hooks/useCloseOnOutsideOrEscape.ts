import { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  excludeSelectors?: string[];
  disabled?: boolean;
};

export const useCloseOnOutsideOrEscape = ({
  ref,
  onClose,
  excludeSelectors = [],
  disabled,
}: Props) => {
  useEffect(() => {
    if (disabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // Check if the click is inside excluded elements
      const isExcluded = excludeSelectors.some((selector) => {
        const excludedELement = document.querySelector(selector);
        return excludedELement?.contains(target);
      });

      if (ref.current && !ref.current.contains(target) && !isExcluded) {
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [ref, onClose, excludeSelectors]);
};
