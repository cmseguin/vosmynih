import { useCallback, useMemo, useState } from "react";

export const useHistoricalState = <T>(initialState: T) => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentState, setCurrentState] = useState(initialState);

  const setState = useCallback((newState: T) => {
    setHistory((prevHistory) => [...prevHistory, newState]);
    setCurrentState(newState);
  }, []);

  const revert = useCallback(
    (versionsBack: number) => {
      setHistory((prevHistory) => prevHistory.slice(0, -versionsBack));
      setCurrentState(history[history.length - 1 - versionsBack]);
    },
    [history],
  );

  const undo = useCallback(() => revert(1), [revert]);

  const getVersion = useCallback(
    (versionsBack: number) => {
      return history[history.length - 1 - versionsBack];
    },
    [history],
  );

  const lastVersion = getVersion(1);
  const previousState = useMemo(() => lastVersion, [lastVersion]);

  return {
    state: currentState,
    setState,
    undo,
    revert,
    getVersion,
    previousState,
  };
};
