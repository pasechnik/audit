import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Navbar, NavItem, Nav, MenuItem, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import classes from './Header.scss'

export const Navigation = () => (
  <Navbar inverse className={classes['navbar-nav']}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>
          Аудит
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={2} title='Раб. док.' id='basic-nav-dropdown'>
          <LinkContainer to='/tab1'>
            <NavItem eventKey={2.1} href='/tab1'>
              Ф. О.
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/tab2'>
            <NavItem eventKey={2.2} href='/tab2'>
              По виду
            </NavItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to='/tab1'>
            <NavItem eventKey={2.3} href='/tab1'>
              Исполнитель
            </NavItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <LinkContainer to='/help'>
          <NavItem eventKey={3} href='/help'>Help</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Navigation
