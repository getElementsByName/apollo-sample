import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";

const USER_QUERY = gql`
query getUser ($id: ID!)    {
    user(id: $id) {
        name
        id
    }
}
`

type User = {
    name: string;
    id: string;
};

type Response = {
    user: User
}

type InputProps = {
    id: string
};

type Variables = {
    id: string
};


const withUser = graphql<InputProps, Response, Variables>(USER_QUERY, {
    options: ({ id } /* input props */) => ({
        variables: { id },
        // fetchPolicy: "no-cache"
    }),
    props: ({ data }) => {
        return {
            data
        }
    }
});

type ChildProps = ChildDataProps<InputProps, Response, Variables>;

class UserQueryView extends React.Component<ChildProps, {}> {
    render() {
        const { loading, user, error } = this.props.data;

        if (loading) return <p>Query Loading...</p>;
        if (error) return <p>Query Error :(</p>;

        // console.log("react query", user);
        return (
            <div>
                <div>DATA: {JSON.stringify(user)}</div>
            </div>)
    }
}


const UserQuery = withUser(UserQueryView)


export { UserQuery }
