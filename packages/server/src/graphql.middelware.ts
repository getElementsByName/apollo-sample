import * as Koa from "koa"
import { ApolloServer } from "apollo-server-koa"
import { schema} from "./graphql"





function applyMiddlewareToApp(app: Koa){
    const apolloServer = new ApolloServer({
        schema
    })
    
    apolloServer.applyMiddleware({app})
}

export { applyMiddlewareToApp, schema }