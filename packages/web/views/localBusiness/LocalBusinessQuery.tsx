import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LocalBusinessListQuery = gql`
query localBusinessList($idList: [ID]!) {
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

type SchemaVariables = {
    idList: string[]
};


// 타입 한정 <Query> :( ?
class LocalBusinessQuery extends Query<ResponseData, SchemaVariables> { }



interface PropsType {
    children: (data: LocalBusiness) => React.ReactNode
    id: string
}

class LocalBusinessQueryView extends React.Component<PropsType, {}> {
    render() {
        const { id } = this.props

        return (
            <LocalBusinessQuery query={LocalBusinessListQuery} variables={{ idList: [id] }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Query Loading...</p>;
                    if (error) return <p>Query Error :(</p>;

                    return this.props.children(data.getLocalBusinessList[0])
                }}
            </LocalBusinessQuery>
        )
    }
}




export { LocalBusinessQueryView }
