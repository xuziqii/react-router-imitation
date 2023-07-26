import React, { useEffect } from "react";

export type LocationType = {
  pathname?: string;
  search?: string;
};

export function getLocation(): LocationType {
  const { pathname, search } = window.location;

  return {
    pathname,
    search,
  };
}

function getNextLocation(to: string): LocationType {
  const start = to.indexOf("?");
  let res: LocationType = {};
  if (start >= 0) {
    res.search = to.slice(start);
    res.pathname = to.slice(0, start);
  } else {
    res.pathname = to;
  }
  return res;
}

type CbType = (v: LocationType) => void;

type AnyObjType = {
  [key: string]: any;
};

// 获取初始 location
let globalLocation: LocationType = getLocation();

let listener: CbType[] = [];

function push(to: string, state: AnyObjType = {}) {
  // 路由导航
  // 修改 location
  globalLocation = getNextLocation(to);
  window.history.pushState(state, "", to);
  listener.forEach((f) => f(globalLocation));
}

// 观察者模式
function listen(cb: CbType) {
  listener.push(cb);
  const unSubscribe = () => {
    listener = listener.filter((f) => f !== cb);
  };
  return unSubscribe;
}

export type HistoryType = {
  location: LocationType;
  push: (to: string, state?: AnyObjType) => void;
  listen: (cb: CbType) => void;
};
export const history: HistoryType = {
  location,
  push,
  listen,
};

function initHistory() {
  globalLocation = getLocation();
  listener.forEach((f) => f(globalLocation));
}

export function useInitHistory() {
  useEffect(() => {
    window.addEventListener("popstate", initHistory);
    return () => window.removeEventListener("popstate", initHistory);
  }, []);
}
