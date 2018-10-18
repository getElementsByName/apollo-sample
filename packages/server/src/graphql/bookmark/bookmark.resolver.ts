import { whyBookmark } from './bookmark.mock'
import { delegateToSchema } from 'graphql-tools';
import { schema } from '../'

// const type = {
//   localBusiness: async (parent, args, context, info) => {
//     console.log(parent)

//     if(parent instanceof Array === false){
//       return null
//     }
//     return delegateToSchema({
//       schema: schema,
//       operation: 'query',
//       fieldName: 'getLocalBusinessList',
//       args: { idList: parent },
//       context,
//       info,
//     });
//   }
// };

const query = {
  getBookmarkList: async (parent, args, context, info) => {
     return delegateToSchema({
      schema: schema,
      operation: 'query',
      fieldName: 'getLocalBusinessList',
      args: { idList: whyBookmark },
      context,
      info,
    });
  }
}

export default {
  Query: query,
  // BookmarkList: type
}