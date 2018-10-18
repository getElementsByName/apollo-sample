import * as React from "react";
import { LocalBusinessQueryView } from "./LocalBusinessQuery";

interface PropsType { }

class LocalbusinessPage extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props)
    }
    render() {
        return (<>
            <LocalBusinessQueryView id={"id-kimbapheaven1"}>{({ name, id }) => {
                return (
                    <>
                        <div>Business Name: {name}</div>
                    </>
                )
            }}</LocalBusinessQueryView>
        </>)
    }

}

export { LocalbusinessPage }