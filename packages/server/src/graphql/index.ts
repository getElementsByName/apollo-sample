import * as path from "path"
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas"

// merge all types in child directories
const typesPath = path.join(__dirname, "./")
const typesArray = fileLoader(typesPath, { recursive: true, extensions: [".graphql"] })
const typeDefs = mergeTypes(typesArray, { all: true })

// merge all resolvers in child directories
const resolversPath = path.join(__dirname, "/**/*.resolver.*")
const resolversArray = fileLoader(resolversPath)
const resolvers = mergeResolvers(resolversArray)

export {
    typeDefs,
    resolvers
}