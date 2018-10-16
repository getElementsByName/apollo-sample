import * as React from "react";

import { Query } from "react-apollo";
import { UserQuery } from './UserQuery'

interface PropsType { }
interface StateType {
    count: number
}



class CacheTest extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)


        this.state = {
            count: 0
        }
    }

    private nextCount = () => {
        this.setState({
            count: (this.state.count + 1) % 3
        })
    }

    render() {
        return (<>
            <button onClick={this.nextCount}>Next User</button>
            <UserQuery id={this.state.count + ""}></UserQuery>
        </>)
    }

}

export { CacheTest }