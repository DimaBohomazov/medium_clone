import React, {useContext, Fragment} from 'react';
import {Link, NavLink} from "react-router-dom";
import {CurrentUserContext} from "../contexts/currentUser";

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext)
  return (
    <nav className='navbar navbar-light'>
      <div className="container">
        <Link to='/' className='navbar-brand'>
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to='/' exact>
              Home
            </NavLink>
          </li>
          { !currentUserState.isLoggedIn
            ? <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/login' >
                    Sing In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/register' >
                    Sing Up
                  </NavLink>
                </li>
              </Fragment>

            : <Fragment>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/articles/new'>
                    <i className='ion-compose'></i>
                    &nbsp;
                    New Post
                  </NavLink>
                </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={`/profiles/${currentUserState.currentUser.username}`}>
                  {currentUserState.currentUser.image && <img className='user-pic' src={currentUserState.currentUser.image} alt="profile"/>}
                  &nbsp;
                  {currentUserState.currentUser.username}
                </NavLink>
              </li>
              </Fragment>

          }
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;