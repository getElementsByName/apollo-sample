import { bookmarkTable } from './bookmark.mock'
import { delegateToSchema } from 'graphql-tools';
import { schema } from '../'

// const type = {
//   localBusiness: async (parent, args, context, info) => {  // 재귀 위험 (예: getBookmarkList로 delegation이후 resolve 결과가 LocalBusiness타입이어서 다시 localBusiness로 resolve)
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
    // console.log('getBookmarkList (context): ', context)
     return delegateToSchema({
      schema: schema,
      operation: 'query',
      fieldName: 'getLocalBusinessList',
      args: { idList: bookmarkTable[args.userId] },
      context,
      info,
    });
  }
}

export default {
  Query: query,
  // BookmarkList: type
}