import { myColors } from '@/styles/color';
import { AppBar, Box } from '@mui/material';
import { memo, useState } from 'react';
import Button from '../Button/Button';
import { Wrapper } from '../Wrapper/Wrapper';
import ManagerHeaderUserBox from './ManagerHeaderUserBox';
function ManagerHeader() {
  const [tab, setTab] = useState<number>(0);
  const btnContent = [
    { tab: 0, content: 'Users', link: '/manager/users' },
    { tab: 1, content: 'Menus', link: '/manager/menus' },
    { tab: 2, content: 'Catalogs', link: '/manager/catalogs' },
    { tab: 4, content: 'Booking', link: '/manager/booking' },
    { tab: 3, content: 'Orders', link: '/manager/orders' },
  ];

  return (
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
              // minHeight: { xs: '60px', lg: '80px' },
            },
          }}
        >
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              '.header-btn': {
                textTransform: 'uppercase',
                fontWeight: '700',
                // fontSize: { xs: '1.6rem', lg: '1.8rem' },
                // padding: { xs: '0.8rem 2rem', lg: '1.2rem 2.4rem' },
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
          </Box> */}

          <Box
            className="inner"
            sx={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'start',
              width: '100%',
            }}
          >
            {btnContent.map((btn) => (
              <Button
                href={btn.link}
                key={btn.tab}
                text
                style={{
                  borderBottom: btn.tab === tab ? `2px solid ${myColors.primary}` : '2px solid transparent',
                  padding: '5px 10px',
                }}
                onClick={() => setTab(btn.tab)}
              >
                {btn.content}
              </Button>
            ))}
          </Box>
          <ManagerHeaderUserBox />
        </Wrapper>
      </Box>
    </AppBar>
  );
}
export default memo(ManagerHeader);
