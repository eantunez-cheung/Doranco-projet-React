import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom'

import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.css';


import logo from '../icons/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100vw',
    bottom: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar({ activeMenu = "accueil" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={styles.nvstyle}>
        <Toolbar>
          <Button component={Link} exact to='/Accueil' className={styles.button + ' ' + classes.title + ' ' + (activeMenu === 'accueil' ? styles.activeMenu : '')} alt="home">
            <i class="fas fa-home fa-3x" />
          </Button>
          <Button component={Link} exact to='/Ajouter' className={styles.button + ' ' + classes.title + ' ' + (activeMenu === 'ajouter' ? styles.activeMenu : '')} alt="add">
            <i class="fas fa-plus-square fa-3x" />
          </Button>
          <Typography className={styles.logo}>
            <img src={logo} alt="logo" />
          </Typography>
          <Button component={Link} exact to='/Favoris' className={styles.button + ' ' + classes.title + ' ' + (activeMenu === 'favorite' ? styles.activeMenu : '')} alt="favorite">
            <i class="fas fa-heart fa-3x" />
          </Button>
          <Button component={Link} exact to='/Profil' className={styles.button + ' ' + classes.title + ' ' + (activeMenu === 'profile' ? styles.activeMenu : '')} alt="profile">
            <i class="fas fa-user fa-3x" />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}