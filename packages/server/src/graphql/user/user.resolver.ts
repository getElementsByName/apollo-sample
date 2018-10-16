
const query = {
  user: async (parent, { id }) => {
    const params = { id }
    
    return {
        id,
        name: "USER-NAME"
    }
  }
};

export default {
  Query: query
}