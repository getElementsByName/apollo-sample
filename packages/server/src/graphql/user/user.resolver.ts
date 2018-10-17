import graphqlFields = require('graphql-fields')

const query = {
  user: async (parent, { id }, context, info) => {
    const params = { id }
    
    const fields = graphqlFields(info)
    console.log(fields)

    return {
        id,
        name: "USER-NAME"
    }
  }
};

export default {
  Query: query
}