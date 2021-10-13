import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles({
  navbarItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#455A64',
    height: '7vh',
    padding: '0 30px',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)',
  },
});

export default function Navbar() {
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [session] = useSession();

  //checks to see if current page is a project page
  const onHomePage = router.pathname === '/';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.navbarItems} position="static">
      <Typography variant="h4" className={classes.title} onClick={() => router.push('/')}>
        codedrop
      </Typography>
      {session && (
        <>
          <MenuRoundedIcon
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </MenuRoundedIcon>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => router.push('/projects')}>Projects</MenuItem>
            <MenuItem onClick={() => signOut({ callbackUrl: `/signin` })}>Logout</MenuItem>
          </Menu>
        </>
      )}
      {onHomePage && (
        <Link href="https://github.com/oslabs-beta/codedrop" passHref>
          <a target="_blank">
            <Button variant="contained" color="primary">
              Github
            </Button>
          </a>
        </Link>
      )}
    </AppBar>
  );
}
