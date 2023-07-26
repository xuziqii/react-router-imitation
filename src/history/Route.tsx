import React, { FC, ReactNode } from "react";
import { useLocation } from "./Router";

type RoutePropsType = {
  children: ReactNode;
  path: string;
};

export const Route: FC<RoutePropsType> = ({ path, children }) => {
  const location = useLocation();
  if (location.pathname === path) {
    return children;
  }
  return null;
};
