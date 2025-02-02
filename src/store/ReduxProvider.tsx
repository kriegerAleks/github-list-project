import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}> {children}</Provider>;
}

export default ReduxProvider;
