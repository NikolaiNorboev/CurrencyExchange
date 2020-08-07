import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return(
    <div>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/table'>Table</NavLink>
    </div>
  )
}

export default Navbar;
