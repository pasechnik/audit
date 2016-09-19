import React from 'react'
import { IndexLink, Link } from 'react-router'
import LoadingBar from 'react-redux-loading-bar'
import { Navigation } from './Navigation'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <Navigation />
    <LoadingBar className={classes.loadingbar} maxProgress={100} />
  </div>
)

export default Header
