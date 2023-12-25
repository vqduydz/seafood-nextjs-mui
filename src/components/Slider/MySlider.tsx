'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Box, SxProps, Typography } from '@mui/material';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Content from '../Home/Content';

import Link from 'next/link';
import Button from '../Button/Button';
import { Wrapper } from '../Wrapper/Wrapper';

// import './styles.css';

interface MySliderProps {
  menu?: boolean;
  sx?: SxProps;
  data: {
    items: Record<string, any>[]; // Define the type for items with dynamic fields
    imagePath: string;
  };
  headerSlider?: {
    title: string;
    headerSliderStyles?: SxProps;
    extendTitle?: {
      title: string;
      url: string;
    };
    titleStyles?: SxProps;
  };
}

export default function MySlider({ data, sx, headerSlider, menu }: MySliderProps) {
  const { items, imagePath } = data;
  const { title, headerSliderStyles = {}, extendTitle = { title: '', url: '' }, titleStyles = {} } = headerSlider || {};

  const slide122s = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6', 'Slide 7', 'Slide 8', 'Slide 9'];

  return (
    <Box
      sx={{
        paddingTop: '20px',
        paddingBottom: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottom: '3px solid #efeef5',
        '.swiper-button-prev,.swiper-button-next': {
          backgroundColor: '#ccccccc7',
          padding: '20px',
          marginTop: 'calc(-40px - (var(--swiper-navigation-size) / 2)) !important',
          borderRadius: '6px',
          '::after': {
            fontWeight: '900',
            fontSize: '20px',
          },
          ':hover': { backgroundColor: '#ccc' },
        },
        '.swiper-button-prev': { left: 0 },
        '.swiper-button-next': { right: 0 },

        ...sx,
      }}
    >
      <Wrapper sx={{ position: 'relative', marginBottom: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #337ab722',
            width: '100%',
            ...headerSliderStyles,
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontSize: '2.4rem',
              fontWeight: 'bold',
              // padding: '15px 0px 5px 0px',
              ...titleStyles,
            }}
          >
            {title}
          </Typography>
          {extendTitle && extendTitle?.title && (
            <Box
              sx={{
                position: 'absolute',
                right: '20px',
              }}
            >
              <Link href={extendTitle?.url}>
                <Button style={{ padding: '4px 8px', fontSize: 12 }} text_e>
                  {extendTitle?.title}
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Wrapper>
      <Wrapper sx={{ padding: '0 5px' }}>
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          slidesPerGroup={1}
          // slideToClickedSlide={true}
          autoplay={{
            delay: 1500,
            pauseOnMouseEnter: true,
          }}
          speed={1500}
          loop={items.length <= 2 ? false : true}
          navigation={true}
          breakpoints={{
            768: {
              slidesPerView: items.length < 4 ? 2 : 3,
            },
            1200: {
              slidesPerView: items.length < 4 ? 2 : 4,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {items.map((item, index: number) => {
            const { image, name, slug, price } = item;
            return (
              <SwiperSlide key={index}>
                <Content
                  quantity={items.length}
                  menu={menu}
                  data={{ item: { image, name, slug, price }, imagePath: imagePath }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Wrapper>
    </Box>
  );
}
