import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route as ReactRoute,
  Redirect,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

interface PrivateRouteProps {
  component: React.ComponentType;
  path: string;
  exact?: boolean;
  isPrivate?: boolean;
  signed: boolean;
}

const Route: React.FC<PrivateRouteProps> = ({
  component,
  path,
  exact,
  isPrivate,
  signed,
}) => {
  if (isPrivate && !signed) return <Redirect to="/login" />;
  if (!isPrivate && signed) return <Redirect to="/" />;
  return <ReactRoute component={component} exact={exact} path={path} />;
};

const Routes: React.FC<{ signed: boolean }> = ({ signed }) => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} signed={signed} />
        <Route path="/" exact isPrivate component={Home} signed={signed} />
        <Route path="/test" isPrivate component={Home} signed={signed} />
      </Switch>
    </Router>
  );
};

export default Routes;
