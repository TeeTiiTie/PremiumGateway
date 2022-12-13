import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Content } from "./Content";
import * as CONST from "../../Constant";
import * as layoutRedux from "../layout/_redux/layoutRedux";

export function ContentRoute({
  children,
  component: Component,
  render,
  title,
  ...props
}) {
  const dispatch = useDispatch();

  dispatch(layoutRedux.actions.updateTitle(props.title));

  return (
    <Route {...props}>
      {(routeProps) => {
        if (typeof children === "function") {
          return <Content>{children(routeProps)}</Content>;
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return <Content>{children}</Content>;
        }

        if (Component) {
          return (
            <Content>
              <Helmet>
                <title>{`${title} - ${CONST.APP_INFO.name}`}</title>
              </Helmet>
              <Component {...routeProps} />
            </Content>
          );
        }

        if (render) {
          return <Content>{render(routeProps)}</Content>;
        }

        return null;
      }}
    </Route>
  );
}

ContentRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.node,
  render: PropTypes.func,
  title: PropTypes.string,
};

// Same approach for defaultProps too
ContentRoute.defaultProps = {
  title: "",
};
