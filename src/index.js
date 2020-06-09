import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Routes from './routes'
import TopBar from './components/TopBar'
import CurrentUserChecker from './components/CurrentUserChecker'
import {CurrentUserProvider} from "./contexts/currentUser";

const App = () => {
  return(
    // <React.StrictMode>
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
    // </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
