import React from 'react';
import { Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="my-color" variant="dark">
      <Navbar.Brand href={"/"}>My App</Navbar.Brand>
    </Navbar>
  )
}

export default Header;