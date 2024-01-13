'use client';
import Button from '@/components/Button/Button';
import { Wrapper } from '@/components/Wrapper/Wrapper';
import { catalogApi } from '@/utils/services/api/catalogApi';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CategoriesSlider = ({ newcatalogsWithMenus }: { newcatalogsWithMenus: any[] }) => {
  // const [catalogs, setCatalogs] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const slug = `${searchParams}`.split('+')[0].replace(/\=/g, '');
    const section = document.getElementById(slug);
    if (section) {
      const windowWidth = window.innerWidth;
      const offset = windowWidth >= 992 ? section.offsetTop - 140 : section.offsetTop - 120;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 88, lg: 108 },
        left: '0',
        right: '0',
        zIndex: 1,
        backgroundColor: '#fff',
        boxShadow: 'inset 0px 0px 13px 3px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}
    >
      <Wrapper
        sx={{
          position: 'relative',
          padding: '0 5px',
          '.swiper-slide': {
            width: 'fit-content !important',
          },
          '.swiper-button-prev,.swiper-button-next': {
            zIndex: 1000,
            backgroundColor: '#ccccccc7',
            padding: '20px',
            borderRadius: '6px',
            '::after': {
              fontWeight: '900',
              fontSize: '1.6rem',
            },
            ':hover': { backgroundColor: '#ccc' },
          },
          '.swiper-button-prev': { left: 0 },
          '.swiper-button-next': { right: 0 },
          '.slider-btn': {
            '+.slider-btn': { borderLeft: '1px solid #e0592a40' },
          },
        }}
      >
        <Swiper
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          slidesPerView={'auto'}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {newcatalogsWithMenus.map((item, index: number) => {
            const { name, slug } = item;
            return (
              <SwiperSlide key={index} className={'slider-btn'}>
                <Button text scale href={`?=${slug}+${Date.now()}`} style={{ padding: '8px 24px' }}>
                  {name}
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Wrapper>
    </Box>
  );
};

export default CategoriesSlider;
