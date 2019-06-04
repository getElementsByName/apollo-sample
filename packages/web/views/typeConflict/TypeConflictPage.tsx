import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { TypeConflictQuery, ResponseData } from './TypeConflictQuery'

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

class TypeConflictPage extends React.Component<PropsType & WithApolloClientProps, StateType> {

    constructor(props) {
        super(props)
    }



    render() {
        return (<>
          <div>BOOKMARK TYPE CONFLICT</div>

          <TypeConflictQuery userId="id-why" first={10}>
            {({list, fetchMore}) => {
              return [...list.map((localBusiness, index) => {
                return <div key={index}>{localBusiness.name}</div>
              }),
              fetchMore && <button key="more" onClick={fetchMore as any}>More</button>
            ]
            }}
          </TypeConflictQuery>
        </>)
    }

}

const TypeConflictPageWithApolloClient = withApollo(TypeConflictPage)
export { TypeConflictPageWithApolloClient as TypeConflictPage }