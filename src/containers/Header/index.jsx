import { AppBar, Container, Toolbar } from '@mui/material';
import Logo from '../../assets/svg/logo_black.svg';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar color="secondary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src={Logo} className="logo" alt="logo" width="170"></img>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
