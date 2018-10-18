import * as React from "react";


import { BookmarkQuery } from './BookmarkQuery'
import { BookmarkItem } from './BookmarkItem'


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
        
        
            <BookmarkQuery id={"id-why"}>{({ name, bookmarkList, id }) => {
                //  console.log("bookmarkList", bookmarkList)

                return (
                    <>

                        <div>User Name: {name}</div>
                        
                        {bookmarkList.map((localbusiness) => {
                            return (<BookmarkItem key={localbusiness.id} id={localbusiness.id} name={localbusiness.name}></BookmarkItem>)
                        })}

                    </>
                )
            }}</BookmarkQuery>
        </>)
    }

}

export { BookmarkPage }