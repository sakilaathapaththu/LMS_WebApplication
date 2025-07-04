
import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography,
  Menu, Container, Avatar, Button, Tooltip, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/AuthContext'; // adjust path if needed
import API, { IMAGE_BASE_URL } from "../../Utils/api";

const pages = ['Home', 'Courses','About Us', 'Contact Us'];
const pageRoutes = {
  Home: '/',
  Courses: '/courses',
  'Contact Us': '/contactus',
  'About Us':'/aboutus',
};
const loggedInMenu = ['Profile', 'Logout'];

export default function HomePageNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '70px' }}>
          <SchoolIcon sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            mr: 1.5,
            color: '#1976d2',
            fontSize: '2rem'
          }} />
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '0.5px',
              color: '#1976d2',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                color: '#1565c0'
              }
            }}
          >
            SmartLearn
          </Typography>

          {/* Mobile nav toggle */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton 
              size="large" 
              onClick={handleOpenNavMenu} 
              sx={{ 
                color: '#424242',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ 
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  mt: 1
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page} 
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(pageRoutes[page]);
                  }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)'
                    }
                  }}
                >
                  <Typography 
                    textAlign="center"
                    sx={{
                      fontWeight: 500,
                      color: '#424242'
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Small screen logo */}
          <SchoolIcon sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            mr: 1,
            color: '#1976d2',
            fontSize: '1.8rem'
          }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '0.5px',
              color: '#1976d2',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                color: '#1565c0'
              }
            }}
          >
            SmartLearn
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(pageRoutes[page]);
                }}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  px: 2,
                  py: 1,
                  color: '#424242', 
                  display: 'block',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    color: '#1976d2'
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right-side profile/login menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account settings">
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0,
                  '&:hover': {
                    '& .MuiAvatar-root': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                {user ? (
                  <Avatar
                    src={user?.profileImage ? `${IMAGE_BASE_URL}/${user.profileImage}` : '/default-avatar.png'}
                    alt={user?.username || 'user'}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      border: '2px solid #e0e0e0',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{ 
                      width: 40, 
                      height: 40,
                      bgcolor: '#1976d2',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: '#1565c0'
                      }
                    }}
                  >
                    <AccountCircle sx={{ color: 'white', fontSize: 24 }} />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  minWidth: '180px'
                }
              }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {user ? (
                loggedInMenu.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (option === 'Logout') logout();
                      if (option === 'Profile') navigate('/profile');
                    }}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                  >
                    <Typography 
                      textAlign="center"
                      sx={{
                        fontWeight: 500,
                        color: '#424242'
                      }}
                    >
                      {option}
                    </Typography>
                  </MenuItem>
                ))
              ) : (
                <>
                  <MenuItem 
                    onClick={() => { 
                      handleCloseUserMenu(); 
                      navigate('/login'); 
                    }}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                  >
                    <Typography 
                      textAlign="center"
                      sx={{
                        fontWeight: 500,
                        color: '#424242'
                      }}
                    >
                      Login
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    onClick={() => { 
                      handleCloseUserMenu(); 
                      navigate('/signup'); 
                    }}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                  >
                    <Typography 
                      textAlign="center"
                      sx={{
                        fontWeight: 500,
                        color: '#424242'
                      }}
                    >
                      Register
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}