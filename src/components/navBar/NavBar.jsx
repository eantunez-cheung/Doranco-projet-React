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


import logo from '../../icons/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100vw',
    bottom: 0,
    borderRadius: 0,
  },
  button: {
    flexGrow: 1,
    borderRadius: 0,
  },
  toolbarWrapper: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default function NavBar({ activeMenu, isConnected, form }) {
  const classes = useStyles();

  const handleSubmit = () => {
    if (form != null && !isConnected) {
      form.setForm('login')
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={styles.nvstyle}>
        <Toolbar className={classes.toolbarWrapper}>
          <Button component={Link} exact to='/Accueil' className={styles.button + ' ' + classes.button + ' ' + (activeMenu === 'accueil' ? styles.activeMenu : '')} alt="home">
            <i class="fas fa-home fa-3x" />
          </Button>
          <Button component={Link} exact to={(isConnected ? '/Ajouter' : '/Accueil')} className={styles.button + ' ' + classes.button + ' ' + (activeMenu === 'ajouter' ? styles.activeMenu : '')} alt="add" onClick={handleSubmit}>
            <i class="fas fa-plus-square fa-3x" />
          </Button>
          <Typography className={styles.logo}>
            <img src={logo} alt="logo" />
          </Typography>
          <Button component={Link} exact to={(isConnected ? '/Favoris' : '/Accueil')} className={styles.button + ' ' + classes.button + ' ' + (activeMenu === 'favorite' ? styles.activeMenu : '')} alt="favorite" onClick={handleSubmit}>
            <i class="fas fa-heart fa-3x" />
          </Button>
          <Button component={Link} exact to={(isConnected ? '/Profil' : '/Accueil')} className={styles.button + ' ' + classes.button + ' ' + (activeMenu === 'profile' ? styles.activeMenu : '')} alt="profile" onClick={handleSubmit}>
            <i class="fas fa-user fa-3x" />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}