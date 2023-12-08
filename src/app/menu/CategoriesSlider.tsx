'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '@/components/Button/Button';
import { Wrapper } from '@/components/CustomComponents/CustomMui';
import { catalogApi } from '@/utils/services/api/catalogApi';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CategoriesSlider = () => {
  const [catalogs, setCatalogs] = useState([]);

  const scroll = (id: string) => {
    let targetElement = document.getElementById(id);
    var targetOffsetTop = targetElement?.offsetTop;
    if (!targetOffsetTop) return;
    var scrollTo = targetOffsetTop - 150;
    window.scrollTo(0, scrollTo);
  };

  useEffect(() => {
    async function getData() {
      const response = await catalogApi();
      const catalogs = response?.data?.catalogsWithMenus;

      catalogs.sort((a: any, b: any) => {
        if (a.slug === 'mon-dac-biet') return -1;
        if (b.slug === 'mon-dac-biet') return 1;
        if (a.slug === 'cac-mon-moi') return -1;
        if (b.slug === 'cac-mon-moi') return 1;
        if (a.room === 'nuoc-ngot') return 1;
        if (b.room === 'nuoc-ngot') return -1;
        if (a.room === 'bia') return 1;
        if (b.room === 'bia') return -1;
        if (a.room === 'ruou') return -1;
        if (b.room === 'ruou') return 1;
        return 0;
      });
      setCatalogs(catalogs);
    }
    getData();
  }, []);

  useEffect(() => {
    const slug = window.location.hash.substr(1);
    if (!slug) return;
    let targetElement = document.getElementById(slug);
    if (!targetElement) return;
    var targetOffsetTop = targetElement.offsetTop;
    var scrollTo = targetOffsetTop - 150;
    window.scrollTo(0, scrollTo);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 112,
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
          {catalogs.map((item, index: number) => {
            const { name, slug } = item;
            return (
              <SwiperSlide key={index} className={'slider-btn'}>
                <Button
                  scale
                  // text_e
                  text
                  style={{ padding: '8px 24px' }}
                  onClick={() => {
                    scroll(slug);
                  }}
                >
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
