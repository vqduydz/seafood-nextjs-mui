import { AppBar, Box } from '@mui/material';
import Button from '../Button/Button';
import { Wrapper } from '../Wrapper/Wrapper';
import MyBadge from './MyBadge';
import UserBox from './UserBox';
import { memo } from 'react';

function Header() {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 100, boxShadow: '0px -15px 15px 20px rgba(0,0,0,0.2)' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.4rem',
            background: '#fff',
            color: '#333',
          }}
        >
          <Wrapper
            sx={{
              justifyContent: 'space-between',
              '.logo': {
                minWidth: { xs: '200px', lg: '250px' },
                minHeight: { xs: '60px', lg: '80px' },
              },
            }}
          >
            <Button
              link
              className="logo"
              style={{
                backgroundImage: `url(/images/logo.png)`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '90% 90%',
              }}
              href={'/'}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                '.header-btn': {
                  textTransform: 'uppercase',
                  fontWeight: '900',
                  fontSize: { xs: '1.6rem', lg: '1.8rem' },
                  padding: { xs: '0.8rem 2rem', lg: '1.2rem 2.4rem' },
                },
              }}
            >
              <Button className="header-btn" link text_e scale href={'/menu'}>
                Menu
              </Button>
              <Button className="header-btn" link text_e scale href={'/menu'}>
                Đặt bàn
              </Button>
              <Button className="header-btn" link text_e scale href={'/contact'}>
                Liên hệ
              </Button>
            </Box>
            <MyBadge />
            <UserBox />
          </Wrapper>
        </Box>
      </AppBar>
    </>
  );
}
export default memo(Header);
