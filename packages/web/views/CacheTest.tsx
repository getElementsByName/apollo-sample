import * as React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";



interface StateType {
    count: number
}
class CacheTest extends React.Component<null, StateType> {
    constructor(props: null) {
        super(props)


        this.state = {
            count: 0
        }
    }

    private getUserQuery = (id: string) => {
        const graphqlQuery = gql`
            query {
            user(id: ${id}) {
                name
                id
            }
        }
        `

        return graphqlQuery;
    }

    private nextCount = () => {
        this.setState({
            count: (this.state.count + 1) % 3
        })
    }

    render() {
        return (<>
            <button onClick={this.nextCount}>Next User</button>
            <Query
                query={this.getUserQuery(this.state.count + "")}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Query Loading...</p>;
                    if (error) return <p>Query Error :(</p>;

                    // console.log("react query", data);
                    return (
                        <div>
                            <div>DATA: {JSON.stringify(data)}</div>
                        </div>
                    );
                }}
            </Query>
        </>)
    }

}

export { CacheTest }