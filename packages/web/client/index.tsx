import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRoot } from "../page-root/AppRoot";
import { BrowserProps } from '../page-root/props/client'
const rootDomElement = document.getElementById("root");

const rootProps = new BrowserProps();
const rootReactElement = <AppRoot {...rootProps}/>;

ReactDOM.hydrate(rootReactElement, rootDomElement);
