import * as React from "react";
import { Route, Switch } from "react-router";
import { Home } from "../views/Home";

export class AppReactRouter extends React.Component {
    public render() {
        return (
           <Home></Home>
        );
    }
}
