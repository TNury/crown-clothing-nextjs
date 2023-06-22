import { useCallback, useEffect } from 'react';

interface useClickOutsideProps {
  elementId: string;
  onOutsideClick: () => void;
}

export const useClickOutside = ({
  elementId,
  onOutsideClick,
}: useClickOutsideProps) => {
  const handleOnBlur = useCallback(
    (event: MouseEvent): void => {
      const elementRef = document.getElementById(elementId);

      if (!elementRef?.contains(event.target as Node)) {
        onOutsideClick();
      }
    },
    [elementId, onOutsideClick]
  );

  useEffect(() => {
    // Timeout to prevent handleBlur from being triggered
    // immediately after the component is rendered.
    setTimeout(() => {
      window.addEventListener('click', handleOnBlur);
    }, 100);

    return () => {
      window.removeEventListener('click', handleOnBlur);
    };
  }, [elementId, onOutsideClick]);

  return null;
};
