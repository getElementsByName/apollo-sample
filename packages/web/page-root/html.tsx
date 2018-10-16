import * as React from "react";

const GLOBAL_INITIAL_STATE_NAME = "__initialState__";

interface AssetsProps {
  jsList: (string | JSX.Element)[];
}

interface HTMLProps {
  contents?: string;
  stateJson?: any;
  assets?: AssetsProps;
}

class HTML extends React.Component<HTMLProps> {
  render() {
    const props = this.props;
    const jsFileList = props.assets.jsList;

    const jsScriptList = jsFileList.map((filePath: string | JSX.Element) => {
      if (typeof filePath === "string") {
        return <script key={filePath} src={filePath} />;
      } else {
        return filePath;
      }
    });

    return (
      <html>
        <head />
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: props.contents }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.${GLOBAL_INITIAL_STATE_NAME}=${JSON.stringify(
                props.stateJson
              )};`
            }}
          />

          {jsScriptList}
        </body>
      </html>
    );
  }
}

export default HTML;
export { GLOBAL_INITIAL_STATE_NAME, HTML, AssetsProps };