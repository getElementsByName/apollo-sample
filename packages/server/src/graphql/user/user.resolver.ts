
import { delegateToSchema } from 'graphql-tools';
import { schema } from '../'
import { userTableMock } from './user.mock'


const type = {
  maskingId: (parent) => {
    const id: string = parent.id
    const visibleFirsLength = 5
    const first = id.substring(0, visibleFirsLength);
    const masking = id.substring(visibleFirsLength, id.length).replace(/./g,"*");
    return first + masking  // "whynot000" -> "whyno****"
  },

  bookmarkList: async (parent, args, context, info) => {
    // console.log("bookarmkList parent:", parent)
    return delegateToSchema({
      schema: schema,
      operation: 'query',
      fieldName: 'getBookmarkList',
      args: {
        userId:  parent.id
      },
      context,
      info,
    });
  }
}

const query = {
  getUser: async (parent, args, context, info) => {
    return userTableMock[args.id]
  }
};

export default {
  Query: query,
  User: type
}