import * as React from "react";
// import { hot } from "react-hot-loader";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { AppReactRouter } from "./AppReactRouter";
type ApolloCacheType = any;

interface AppRootProps {
  apolloClient: ApolloClient<ApolloCacheType>;
}

const App = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <AppReactRouter />
  </ApolloProvider>
);

// const HMRApp = hot(module)(App);
const HMRApp = App

export default HMRApp;
export { HMRApp as AppRoot, AppRootProps, ApolloCacheType };
