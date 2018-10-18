import * as React from 'react'
import ApolloClient from "apollo-boost";
import fetch from 'node-fetch';
(global as any).fetch = (global as any).fetch || fetch
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient as ApolloClientForServer } from "apollo-client";
import { APOLLO_INITIAL_STATE_NAME } from './client'
import { StaticRouter } from "react-router-dom";

type ApolloCacheType = any

class ServerProps {
    apolloClient: ApolloClient<ApolloCacheType>;
    Router: React.ComponentType

    constructor(url: string) {
        const apolloClient = new ApolloClientForServer({
            ssrMode: true,
            // Remember that this is the interface the SSR server will use to connect to the
            // API server, so we need to ensure it isn't firewalled, etc
            link: createHttpLink({
                uri: "http://localhost:8000/graphql",
                credentials: "same-origin",
                headers: {
                    // cookie: req.header('Cookie'),
                }
            }),
            cache: new InMemoryCache()
        });

        this.apolloClient = apolloClient;
        const Router: React.SFC = ({ children }) => {
            return <StaticRouter location={url}>{children}</StaticRouter>
        }
        this.Router = Router
    }
}


export { ServerProps, APOLLO_INITIAL_STATE_NAME }