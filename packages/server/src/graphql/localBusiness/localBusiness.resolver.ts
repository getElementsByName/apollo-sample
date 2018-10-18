import { localBusinessTable } from './localBusuness.mock'
import { delegateToSchema } from 'graphql-tools';
import { schema } from '../'

const query = {
  getLocalBusinessList: async (parent, args, context, info) => {
    
    return args.idList.map((id)=>{
      return delegateToSchema({
        schema: schema,
        operation: 'query',
        fieldName: 'getLocalBusiness',
        args: { id: id },
        context,
        info,       
       });
    })
  },

  getLocalBusiness: async (parent, args, context, info) => {
    // console.log("getLocalBusiness", args)

    return localBusinessTable[args.id]
  }
};

export default {
  Query: query
}