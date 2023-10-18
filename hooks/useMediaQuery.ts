import { useEffect, useState } from 'react';

/**
 * Modified from link below
 * @see https://observablehq.com/@werehamster/avoiding-hydration-mismatch-when-using-react-hooks
 * @param mediaQueryString
 * @returns {unknown}
 */
export function useMediaQuery(mediaQueryString) {
  const [matches, setMatches] = useState<Boolean>();

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(!!mediaQueryList.matches);
    listener();
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [mediaQueryString]);

  return matches;
}
