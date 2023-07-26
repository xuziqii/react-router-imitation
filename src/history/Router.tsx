import React, { FC, ReactNode, useEffect, useState } from "react";

import {
  LocationType,
  history,
  useInitHistory,
  HistoryType,
  getLocation,
} from "./history";

type RouterPropsType = {
  children: ReactNode;
};

export type RouterContextType = {
  history: HistoryType;
  location: LocationType;
};

const RouterContext = React.createContext<RouterContextType>({
  history,
  location: {},
});

export const Router: FC<RouterPropsType> = ({ children }) => {
  const [location, setLocation] = useState<LocationType>(getLocation());
  useInitHistory();
  useEffect(() => {
    const cb = history.listen((v) => {
      setLocation(v);
    });
    return cb;
  }, []);

  return (
    <RouterContext.Provider value={{ history, location }}>
      {children}
    </RouterContext.Provider>
  );
};

// 提供 route
export function useLocation() {
  const context = React.useContext(RouterContext);
  return context.location;
}

export function useHistory() {
  const context = React.useContext(RouterContext);
  return context.history;
}
