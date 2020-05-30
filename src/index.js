import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Routes from './routes'
import TopBar from './components/TopBar'

const App = () => {
  return(
    // <React.StrictMode>
      <BrowserRouter>
        <TopBar />

        <Routes />

      </BrowserRouter>
    // </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
