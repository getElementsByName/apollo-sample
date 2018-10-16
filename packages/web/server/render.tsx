import * as React from "react";
import * as ReactDomServer from "react-dom/server";
import { HTML, AssetsProps } from "../page-root/html";
import { AppRoot } from "../page-root/AppRoot";
import { ServerProps, APOLLO_INITIAL_STATE_NAME } from "../page-root/props/server";
import { getDataFromTree } from "react-apollo";

async function renderAppByUrl() {
  const serverAppProps = new ServerProps();
  const app = <AppRoot {...serverAppProps} />;

  // console.log("before apollo");
  await getDataFromTree(app); // render#1
  // console.log("before render");

  const apolloState = serverAppProps.apolloClient.extract();
  const htmlString = ReactDomServer.renderToString(app); // render#2

  return {
    appProps: serverAppProps,
    apolloState,
    htmlString
  };
}


const DEV_MODE_INNERHTML = "DEV (only the static shell)";

function renderHTML({ requestUrl }: { requestUrl: string }) {
  const assets: AssetsProps = {
    jsList: [
      "./static/bundle.js",
      "./static/vendors.js"
    ]
  };

  interface RenderResult {
    htmlString: string;
  }
  let appRenderPromise: PromiseLike<RenderResult>;
  const isFullRender = true
  if (isFullRender) {
    const renderPromise = renderAppByUrl();

    appRenderPromise = renderPromise.then(
      ({ htmlString, apolloState }) => {
        const scriptElement: JSX.Element = (
          <script
            key="__LOADABLE_STATE__"
            dangerouslySetInnerHTML={{
              __html:
                `window.${APOLLO_INITIAL_STATE_NAME}=${JSON.stringify(
                  apolloState
                ).replace(/</g, "\\u003c")};`
            }}
          />
        );

        assets.jsList = [scriptElement as any].concat(assets.jsList);
        return {
          htmlString,
        };
      }
    );
  } else {
    appRenderPromise = Promise.resolve({
      htmlString: DEV_MODE_INNERHTML,
      state: {}
    });
  }

  return appRenderPromise.then(({ htmlString }) => {
    const pageString = ReactDomServer.renderToStaticMarkup(
      <HTML assets={assets} contents={htmlString} />
    );

    return `<!doctype html>
    ${pageString}
    `;
  });
}

export { renderHTML };
