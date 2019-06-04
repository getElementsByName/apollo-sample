import * as React from "react";
// import { hot } from "react-hot-loader";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { AppReactRouter } from "./AppReactRouter";
type ApolloCacheType = any;

interface AppRootProps {
  apolloClient: ApolloClient<ApolloCacheType>;
  Router: React.ComponentType
}

const App: React.SFC<AppRootProps> = ({ apolloClient, Router }) => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <AppReactRouter />
    </Router>
  </ApolloProvider>
);

// const HMRApp = hot(module)(App);
const HMRApp = App

export default HMRApp;
export { HMRApp as AppRoot, AppRootProps, ApolloCacheType };
