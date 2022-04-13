// @flow
import * as React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import logo from '../../assets/img/logo.png'
import { Menu } from './Menu';

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: '#000000'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  logo: {
    width: 100,
    [theme.breakpoints.up('sm')]: {
      width: 170
    }
  }
}))

export const Navbar: React.FC = () => {
  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Menu/>

      <Typography className={classes.title}>
        <img className={classes.logo} src={logo}/>
      </Typography>
      </Toolbar>
    </AppBar>
  );
};
