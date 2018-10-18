import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";

const LocalBusinessListQuery = gql`
query localBusinessList($idList: [String]) {
  getLocalBusinessList(idList: $idList) {
    name,
    id
  }
}`

type LocalBusiness = {
    name: string;
    id: string;
};

type ResponseData = {
    getLocalBusinessList: LocalBusiness
}

type InputProps = {
    idList: string[]
};

type SchemaVariables = {
    idList: string[]
};


const injectGraphqlDataToProps = graphql<InputProps, ResponseData, SchemaVariables>(LocalBusinessListQuery, {
    options: ({ idList } /* input props */) => ({
        variables: { idList },
        // fetchPolicy: "no-cache"
    }),
    props: (operationOprions) => {
        return operationOprions
    }
});

type InjectedProps = ChildDataProps<InputProps, ResponseData, SchemaVariables>;

class BookmarkQueryView extends React.Component<InjectedProps, {}> {
    render() {
        const { loading, getLocalBusinessList, error } = this.props.data;

        if (loading) return <p>Query Loading...</p>;
        if (error) return <p>Query Error :(</p>;

        // console.log("react query", user);
        return (
            <div>
                <div>DATA: {JSON.stringify(getLocalBusinessList)}</div>
            </div>)
    }
}


const BookmarkQuery = injectGraphqlDataToProps(BookmarkQueryView)


export { BookmarkQuery }
