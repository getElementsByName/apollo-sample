import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";

const USER_QUERY = gql`
    query userQuery($id: ID!) {
        getUser(id: $id){
            name
            id
            maskingId
            bookmarkList {
                name
                id
            }
        }
    }
`

type BookmarkLocalBusiness = {
    name: string;
    id: string;
}

type User = {
    name: string;
    id: string;
    maskingId: string
    bookmarkList: BookmarkLocalBusiness[]
};

type ResponseData = {
    getUser: User
}

type InputProps = {
    id: string
    children: (data: User) => React.ReactNode
};

type SchemaVariables = {
    id: string
};

// Query HOC 생성자
const injectGraphqlDataToProps = graphql<InputProps, ResponseData, SchemaVariables>(USER_QUERY, {
    options: ({ id } /* input props */) => ({   // 외부 props로 받은 데이터 바인딩
        variables: { id },
        // fetchPolicy: "no-cache"
    }),
    props: (resultOptions) => { // 내부 data로 내보낼 데이터 정제
        return resultOptions
    }
});

// 외부 props + 내부 props (data 상태를 표현하는 타입 추가)
type InjectedProps = ChildDataProps<InputProps, ResponseData, SchemaVariables>;

class BookmarkQueryView extends React.Component<InjectedProps, {}> {
    render() {
        const { loading, getUser, error } = this.props.data;

        if (loading) return <p>Query Loading...</p>;
        if (error) return <p>Query Error :(</p>;

            console.log("BookmarkQueryView (data): ", this.props.data)
        return this.props.children(getUser)
    }
}


const BookmarkQuery = injectGraphqlDataToProps(BookmarkQueryView)


export { BookmarkQuery }
