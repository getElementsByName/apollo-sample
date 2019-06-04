import * as React from "react";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { USER_QUERY, } from '../bookmark/BookmarkQuery'
import { BookmarkQuery, BOOKMARK_PAGINATION_QUERY, ResponseData, RESET_QUERY} from './BookmarkPaginationQuery'

interface PropsType { }
interface StateType {
}

const withApollo = BaseComponent => props => (
  <ApolloConsumer>
    {(client)=>{
      return <BaseComponent {...props} apolloClient={client} />
    }}
  </ApolloConsumer>
)

interface WithApolloClientProps<T = any> {
  apolloClient: ApolloClient<T>
}

class BookmarkPaginationPage extends React.Component<PropsType & WithApolloClientProps, StateType> {

    constructor(props) {
        super(props)
    }


    resetBookmark = () => {
      const {apolloClient} = this.props

      const cachedList: ResponseData = apolloClient.readQuery({
        query: RESET_QUERY,
        variables: {
          userId: "id-why"
        }
      });

      
      const newData: ResponseData = {
        getBookmarkPagination: {
          ...cachedList.getBookmarkPagination,  // __typename: cachedList.getBookmarkPagination['__typename'] + totalCount
          edges: null,
          pageInfo: null
        } 
      }
      
      apolloClient.writeQuery({
        query: RESET_QUERY,
        variables: {
          userId: "id-why"
        },
        data: newData,
      });

    }


    render() {
        return (<>
          <div>BOOKMARK PAGINATION</div>

          <BookmarkQuery userId="id-why" first={10}>
            {({list, fetchMore}) => {
              return [...list.map((localBusiness, index) => {
                return <div key={localBusiness.id + index}>{localBusiness.name}</div>
              }),
              fetchMore && <button key="more" onClick={fetchMore as any}>More</button>
            ]
            }}
          </BookmarkQuery>

          <button onClick={this.resetBookmark}>resetBookmark</button>

        </>)
    }

}

const TestPageWithApolloClient = withApollo(BookmarkPaginationPage)
export { TestPageWithApolloClient as BookmarkPaginationPage }