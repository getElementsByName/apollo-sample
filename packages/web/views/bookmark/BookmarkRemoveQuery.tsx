import * as React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";


const BOOKMARKREMOVE_QUERY = gql`
mutation removeBookmark($localBusinessId: ID!) {
  removeBookmark(localBusinessId: $localBusinessId) {
    name
    id
    bookmarkList {
        id
      name
    }
  }
}
`

type BookmarkLocalBusiness = {
    name: string;
    id: string;
}

type User = {
    name: string;
    id: string;
    maskingId: string
    bookmarkList: BookmarkLocalBusiness[]
};

type ResponseData = {
    removeBookmark: User
}


type SchemaVariables = {
    localBusinessId: string
};

class RemoveBookmarkMutation extends Mutation<ResponseData, SchemaVariables> { }

interface PropsType {
    id: string
}


const RemoveBookmark: React.SFC<PropsType> = ({id}) => {
    return (
        <RemoveBookmarkMutation mutation={BOOKMARKREMOVE_QUERY}>
            {(removeBookmark, { data }) => (
                <button onClick={() => {
                    removeBookmark({
                        variables: { localBusinessId: id }
                    })
                }}>Remove Bookmark</button>
            )}
        </RemoveBookmarkMutation>
    );
};

export { RemoveBookmark }
