import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {CurrentUserContext} from "../contexts/currentUser";

const FeedToggler = ({tagName}) => {
  const [currentUserState] = useContext(CurrentUserContext)
  return (
    <div className='feed-toggle'>
      <ul className="nav nav-pills outline-active">
        { currentUserState.isLoggedIn &&
          <li className="nav-item">
            <NavLink className='nav-link' to='/feed'>
              Your Feed
            </NavLink>
          </li>
        }
        <li className="nav-item">
          <NavLink className='nav-link' to='/' exact>
            Global Feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink className='nav-link' to={`/tags/${tagName}`} exact>
              <i className='ion-pound'></i>
              &nbsp;
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggler;