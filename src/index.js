import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Routes from './routes'
import TopBar from './components/TopBar'
import {CurrentUserProvider} from "./contexts/currentUser";

const App = () => {
  return(
    // <React.StrictMode>
    <CurrentUserProvider>
      <BrowserRouter>
        <TopBar />

        <Routes />
      </BrowserRouter>
    </CurrentUserProvider>
    // </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
