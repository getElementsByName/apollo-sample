import * as React from "react";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { GLOBAL_INITIAL_STATE_NAME } from "../html";

const APOLLO_INITIAL_STATE_NAME = "__APOLLO_STATE__";
type ApolloCacheType = any

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <T>(enhancer: T) => T;
    [GLOBAL_INITIAL_STATE_NAME]: any;
    [APOLLO_INITIAL_STATE_NAME]: ApolloCacheType;
  } // TODO: compose TYPE (T를 StoreEnhancer로 검토)
}

class BrowserProps {
  apolloClient: ApolloClient<ApolloCacheType>;
  Router: React.ComponentType
  constructor() {
    const apolloClient = new ApolloClient({
      // uri: "http://localhost:3000/graphql"
      cache: new InMemoryCache().restore(window[APOLLO_INITIAL_STATE_NAME])
    });
    this.apolloClient = apolloClient;
    const Router: React.SFC = ({children}) => {
      return <BrowserRouter>{children}</BrowserRouter>
    }
    this.Router = Router
  }
}

export {APOLLO_INITIAL_STATE_NAME, BrowserProps };
