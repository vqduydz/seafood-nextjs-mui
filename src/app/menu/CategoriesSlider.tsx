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
    // const buttons = document.querySelectorAll('.slider-btn');
    // buttons.forEach((button) => button.classList.remove('active'));
    // const clickedButton = document.querySelector(`.${id}`);
    // clickedButton?.classList.add('active');
    var scrollTo = targetOffsetTop - 150;
    window.scrollTo(0, scrollTo);
  };

  // const handleScroll = () => {
  //   const targetElements = document.querySelectorAll('.scrollspy-categories');

  //   targetElements.forEach((element) => {
  //     const rect = element.getBoundingClientRect();
  //     console.log(rect);

  //     if (rect.top <= 200) {
  //       const buttons = document.querySelectorAll('.slider-btn');
  //       const sliders = document.querySelectorAll('.swiper-slide');

  //       // swiper-slide swiper-slide-active

  //       buttons.forEach((button) => {
  //         const buttonClassNames: string[] = Array.from(button.classList);
  //         const elementId: string = element.id;
  //         if (buttonClassNames.includes(elementId)) {
  //           button.classList.add('active');
  //           sliders.forEach((slider) => {
  //             if (slider.querySelector('button')?.classList.contains('active')) {
  //               slider.classList.add('swiper-slide-active');
  //               const prevSlider = slider.previousElementSibling;
  //               if (prevSlider) {
  //                 prevSlider.classList.add('swiper-slide-prev');
  //               }
  //               // Lấy phần tử div dưới nó và thêm class "next"
  //               const nextSlider = slider.nextElementSibling;
  //               if (nextSlider) {
  //                 nextSlider.classList.add('swiper-slide-next');
  //               }
  //             } else {
  //               slider.classList.remove('swiper-slide-active');
  //               slider.classList.remove('swiper-slide-prev');
  //               slider.classList.remove('swiper-slide-next');
  //             }
  //           });
  //         } else {
  //           button.classList.remove('active');
  //         }
  //       });
  //     }
  //   });
  // };

  // window.addEventListener('scroll', handleScroll);

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
          // style={{ padding: '5px 0 5px 40px' }}
          // slideToClickedSlide={true}
          // centerInsufficientSlides={true}
          // centeredSlidesBounds={true}
          // centeredSlides={true}
          // slideToClickedSlide={true}
          // navigation={true}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          // loop={true}
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
