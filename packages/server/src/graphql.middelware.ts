import * as Koa from "koa"
import { ApolloServer, makeExecutableSchema } from "apollo-server-koa"
import { typeDefs, resolvers } from "./graphql"


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})



function applyMiddlewareToApp(app: Koa){
    const apolloServer = new ApolloServer({
        schema
    })
    
    apolloServer.applyMiddleware({app})
}

export { applyMiddlewareToApp }