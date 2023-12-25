import DoneIcon from '@mui/icons-material/Done';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Wrapper } from '../Wrapper/Wrapper';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5' }}>
      <Wrapper
        sx={{
          display: 'flex',
          padding: 1,
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            borderBottom: { xs: 'solid 1px #ccc', md: 'none' },
            paddingBottom: { xs: '10px', md: 0 },
            width: '100%',
          }}
        >
          <Box
            sx={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontSize: '2.4rem',
                fontWeight: 700,
                margin: '5px 0',
                textTransform: 'uppercase',
              }}
            >
              Seafood
            </Typography>
            <Typography>
              <PlaceIcon sx={{ fontSize: '1.5rem !important', marginRight: '5px' }} />
              <strong>VPĐD </strong>: 123 Thành Thái, P.14, Q.10, Tp.HCM.
            </Typography>
            <Typography>
              <DoneIcon sx={{ fontSize: '1.5rem !important', marginRight: '5px' }} />
              <strong>ĐKKD</strong>: 111111xxxx. Sở KHĐT HCM cấp ngày 16/03/2015
            </Typography>
          </Box>

          <Link target="_blank" href="http://online.gov.vn/Home/WebDetails/68563">
            <Image
              src="/icons/bo-cong-thuong.svg"
              width="120"
              height="60"
              data-src="/icons/bo-cong-thuong.svg"
              alt="Đã thông báo với bộ công thương"
            />
          </Link>
        </Box>
        <Box
          sx={{
            justifyContent: 'center',
            flex: 1,
            padding: '0 5px',
            paddingTop: { xs: '10px', md: 0 },
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography>
            <strong>CN1 : </strong> 123 Thành Thái, P.14, Q.10, Tp.HCM.
          </Typography>
          <Typography>
            <strong>CN2 : </strong> 123 Hồ Bá Kiện, P.15, Q.10, Tp.HCM.
          </Typography>
          <Typography>
            <strong>CN3 : </strong> 123 Hồ Đắc Di, P.Tây Thạnh, Q.Tân Phú, Tp.HCM.
          </Typography>
          <Typography>
            <strong>CN4 : </strong> 123 Bùi Xương Trạch, P.Long Trường, Tp.Thủ Đức, Tp.HCM.
          </Typography>
          <Typography>
            <strong>Tổng đài : </strong> 1800 1991
          </Typography>
          <Typography>
            <strong>Hotline : </strong> 0908.111.222
          </Typography>
          <Typography>
            <strong>Email : </strong> support.phobien@gmail.com
          </Typography>
        </Box>
      </Wrapper>
      <Box
        sx={{
          background: '#64b9e5',
          color: '#fff',
          padding: '10px',
        }}
      >
        <Wrapper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '20px' }}>
          <Box>© 2023 SEAFOOD</Box>
          <Box
            sx={{
              display: 'flex',
              '& .app-btn': { display: 'flex', padding: ' 0 5px', color: '#45c3d2' },
            }}
          >
            <Link className="app-btn" target="_blank" href="https://facebook.com/vqduydz">
              <Image width="32" height="32" src="/icons/facebook-square.svg" alt="Facebook/" />
            </Link>
            <Link className="app-btn" target="_blank" href="https://www.youtube.com/@vqduydz">
              <Image width="32" height="32" src="/icons/youtube-square.svg" alt="Youtube/" />
            </Link>
          </Box>
        </Wrapper>
      </Box>
    </Box>
  );
}

export default Footer;
