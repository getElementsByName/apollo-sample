
import { delegateToSchema } from 'graphql-tools';
import { schema } from '../'

const type = {
  name: (...args) => {
    return "USER-NAME" + Math.random()
  },
  bookmarkList: async (parent, args, context, info) => {
    console.log(parent)
    return delegateToSchema({
      schema: schema,
      operation: 'query',
      fieldName: 'getBookmarkList',
      args: null,
      context,
      info,
    });
  }
}

const query = {
  getUser: async (parent, { id }, context, info) => {
    const params = { id }

    return {
      id,
    }
  }
};

export default {
  Query: query,
  User: type
}