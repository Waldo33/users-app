import { useCallback, useMemo, useState } from "react";

export type TUseVisibilityFunctions = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  reset: () => void;
};

type TUseVisibilityReturnValue = [boolean, TUseVisibilityFunctions];

export const useVisibility = (
  defaultVisible: boolean,
): TUseVisibilityReturnValue => {
  const [isVisible, setVisible] = useState(defaultVisible);

  const show = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const hide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const toggle = useCallback(() => {
    setVisible((state) => !state);
  }, [setVisible]);

  const reset = useCallback(() => {
    setVisible(defaultVisible);
  }, [setVisible, defaultVisible]);

  return useMemo(
    () => [isVisible, { show, hide, toggle, reset }],
    [isVisible, show, hide, toggle, defaultVisible],
  );
};
