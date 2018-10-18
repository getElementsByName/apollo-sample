import * as React from "react";


import { BookmarkQuery } from './BookmarkQuery'

interface PropsType { }
interface StateType {
    count: number
}


class BookmarkPage extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
    }
    render() {
        return (<>
            <BookmarkQuery id={"id-why"}>{({ name, bookmarkList }) => {
                return (
                    <>
                        <div>User Name: {name}</div>
                        
                        {bookmarkList.map((localbusiness) => {
                            return (<div key={localbusiness.id}>localbusiness: {localbusiness.name}</div>)
                        })}
                    </>
                )
            }}</BookmarkQuery>
        </>)
    }

}

export { BookmarkPage }