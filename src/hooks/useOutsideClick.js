import { useRef, useEffect } from 'react';

export function useOutsideClick(handler, capturingPhase = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener('click', handleClick, capturingPhase);

      return () =>
        document.removeEventListener('click', handleClick, capturingPhase);
    },
    [handler, capturingPhase]
  );

  return ref;
}
