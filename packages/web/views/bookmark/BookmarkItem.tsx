import * as React from "react";
import { RemoveBookmark  } from './BookmarkRemoveQuery'

interface PropsType {
    id: string
    name: string
}
interface StateType {
}


class BookmarkItem extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
    }

 

    render() {
        const { name, id } = this.props
        return (<>
            <div>
                <span>NAME: {name}</span>
                <RemoveBookmark id={id}></RemoveBookmark>
            </div>
        </>)
    }

}

export { BookmarkItem }