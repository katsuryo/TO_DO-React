import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
    {/* BrowserRouterタグで囲っているため、switch等がAppコンポーネントで使用できる */}
      <App/>
    </BrowserRouter>,
    // idがrootである要素を取得し、Appコンポーネントをrootに描画する
    document.querySelector('#root'),
  );
});
