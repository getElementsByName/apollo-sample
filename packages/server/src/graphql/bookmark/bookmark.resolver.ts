import { bookmarkTable } from './bookmark.mock'
import { delegateToSchema } from 'graphql-tools';
import { schema } from '../'
import { localBusinessTable } from '../localBusiness/localBusuness.mock'

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
  getBookmarkPagination: async (parent, args, context, info) => {
    const requestLength = args.first < 100 ? args.first : 100

    const bookmarkSet = bookmarkTable[args.userId]

    const bookmarkList =  Array.from(bookmarkSet)
    
    const bookmarkIdList = []

    
    
    for(let i = 0; i < requestLength; i++) {
      const mockLength = bookmarkList.length
      console.log('mockLength', mockLength)
      const ramdomIndex = Math.floor(Math.random() * mockLength)
      const bookmarkId = bookmarkList[ramdomIndex]

      bookmarkIdList.push(bookmarkId)
    }

    /*
    totalCount
      edges {
        node {
          name
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      */

    return {
      totalCount: 30,
      edges: bookmarkIdList.map((id) => {
        return {
          node: localBusinessTable[id],
  
          cursor: id
        }
      }),
      pageInfo: {
        endCursor: bookmarkIdList[bookmarkIdList.length - 1],
        hasNextPage: true
      }
    }

    
  },
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