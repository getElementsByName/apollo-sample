import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";

const BOOKMARK_PAGINATION_QUERY_NO_ID = gql`
fragment localBusiness on LocalBusiness {
  name
  id
}

query bookmarkPagination($userId: ID!, $first: Int, $after: ID) {
  getBookmarkPagination(first:  $first, userId: $userId, after: $after) @connection(key: "getBookmarkPaginationKey", filter: ["userId"]) {
    totalCount
    edges {
        node {
            ...localBusiness
        }
        cursor
    }
    pageInfo {
        endCursor
        hasNextPage
    }
  }
}`


type BookmarkLocalBusiness = {
    name: string;
}

type ResponseData = {
    getBookmarkPagination: {
        totalCount: number
        edges: {
            node: BookmarkLocalBusiness
        }[]
        __typename: string,
        pageInfo: {
            endCursor: string
            hasNextPage: boolean
        }
    }
};



type InputProps = {
    userId: string
    first?: number
    children: (args: {list: BookmarkLocalBusiness[], fetchMore: Function}) => React.ReactNode
};

type SchemaVariables = {
    userId: string
    first?: number
};

// Query HOC 생성자
const injectGraphqlDataToProps = graphql<InputProps, ResponseData, SchemaVariables>(BOOKMARK_PAGINATION_QUERY_NO_ID, {
    options: ({ userId, first } /* input props */) => ({   // 외부 props로 받은 데이터 바인딩
        variables: { userId, first },
        // fetchPolicy: "no-cache"
    }),

    props: (resultOptions) => { // 내부 data로 내보낼 데이터 정제
        return resultOptions
    }
});

// 외부 props + 내부 props (data 상태를 표현하는 타입 추가)
type InjectedProps = ChildDataProps<InputProps, ResponseData, SchemaVariables>;



class TypeConflictQueryView extends React.Component<InjectedProps, {}> {
    render() {
        const { loading, getBookmarkPagination, error, refetch, fetchMore  } = this.props.data;

        if (loading) return <p>Query Loading...</p>;
        if (error) return <p>Query Error :(</p>;


        const isReseted = getBookmarkPagination.edges === null 
                            && getBookmarkPagination.totalCount > 0 // 무한 루프 방지를 위한 보강 (없어도 정상 동작)

        if(isReseted) {
            refetch()
        }

        const fetchMoreForChildren = () => {
            fetchMore({
                variables: {
                    after: getBookmarkPagination.pageInfo.endCursor
                },

                updateQuery: (previousResult: ResponseData, {fetchMoreResult}: {fetchMoreResult:ResponseData}) => {
                  const newEdges = fetchMoreResult.getBookmarkPagination.edges;
                  const pageInfo = fetchMoreResult.getBookmarkPagination.pageInfo;
    
                  return newEdges.length
                    ? {
                        ...fetchMoreResult,
                        // Put the new comments at the end of the list and update `pageInfo`
                        // so we have the new `endCursor` and `hasNextPage` values
                        getBookmarkPagination: {
                          ...previousResult.getBookmarkPagination,
                          edges: [...previousResult.getBookmarkPagination.edges, ...newEdges],
                          pageInfo
                        }
                      }
                    : previousResult;
                }
              })
        }

        return this.props.children({
            list: isReseted ? [] : getBookmarkPagination.edges.map(edge => edge.node),
            fetchMore: fetchMoreForChildren
        })
    }
}

const TypeConflictQuery = injectGraphqlDataToProps(TypeConflictQueryView)
export { BOOKMARK_PAGINATION_QUERY_NO_ID, ResponseData, TypeConflictQuery }
