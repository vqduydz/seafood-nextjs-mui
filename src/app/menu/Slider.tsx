'use client';
import Button from '@/components/Button/Button';
import { Wrapper } from '@/components/CustomComponents/CustomMui';
import { catalogApi } from '@/utils/services/api/catalogApi';
import NorthIcon from '@mui/icons-material/North';
import { Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Slider = () => {
  const [catalogsWithMenus, setCatalogsWithMenus] = useState({ menu: [], imagePath: '' });
  const { menu, imagePath } = catalogsWithMenus;

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

      const { catalogsWithMenus: menu, imagePath } = response?.data;
      menu.sort((a: any, b: any) => {
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

      setCatalogsWithMenus({ menu, imagePath });
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
        left: '0',
        right: '0',
        zIndex: 1,
        backgroundColor: '#fff',
        boxShadow: 'inset 0px 0px 13px 3px rgba(0,0,0,0.2)',
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
        }}
      >
        <Swiper
          style={{ padding: '5px 0 5px 40px' }}
          slideToClickedSlide={true}
          centerInsufficientSlides={true}
          centeredSlidesBounds={true}
          slidesPerView={'auto'}
          centeredSlides={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {menu.map((item, index: number) => {
            const { name, slug } = item;
            return (
              <SwiperSlide key={index}>
                {/* <Link href={`/menu#${slug}`}> */}
                <Button
                  text_e
                  style={{ padding: '8px 24px' }}
                  onClick={() => {
                    scroll(slug);
                  }}
                >
                  {name}
                </Button>
                {/* </Link> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Wrapper>

      <Button
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        style={{ position: 'fixed', right: '20px', bottom: '20px', padding: '10px 5px' }}
      >
        <NorthIcon />
      </Button>
    </Box>
  );
};

export default Slider;
