import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./../Routes";
import React from "react";
import store from './../store';

export const render = ctx => {

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={ctx.path}>
        <Routes />
      </StaticRouter>
    </Provider>
  );

  const html = `
      <html>
      <head><title>react ssr</title></head>
      <body><div id="root">${content}</div></body>
      <script src="/main.js"></script>
      </html>
      `;
  return html;
};
