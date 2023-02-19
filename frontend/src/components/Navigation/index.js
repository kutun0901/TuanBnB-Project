import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='header-container'>
      <li>
        <NavLink exact to="/" className='logo-title'>TuanBnB</NavLink>
      </li>
      {sessionUser && (
        <li className="new-spot-button">
          <NavLink to="/spots/new" className="new-spot">
            Create a New Spot
          </NavLink>
        </li>
      )}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
