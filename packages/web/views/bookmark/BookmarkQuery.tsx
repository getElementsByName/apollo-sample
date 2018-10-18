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


const injectGraphqlDataToProps = graphql<InputProps, ResponseData, SchemaVariables>(USER_QUERY, {
    options: ({ id } /* input props */) => ({
        variables: { id },
        // fetchPolicy: "no-cache"
    }),
    props: (resultOptions) => {
        return resultOptions
    }
});

type InjectedProps = ChildDataProps<InputProps, ResponseData, SchemaVariables>;

class BookmarkQueryView extends React.Component<InjectedProps, {}> {
    render() {
        const { loading, getUser, error } = this.props.data;

        if (loading) return <p>Query Loading...</p>;
        if (error) return <p>Query Error :(</p>;

        // console.log("react query", user);
        return this.props.children(getUser)
    }
}


const BookmarkQuery = injectGraphqlDataToProps(BookmarkQueryView)


export { BookmarkQuery }
