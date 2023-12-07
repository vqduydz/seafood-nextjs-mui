'use client';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Button from '@/components/Button/Button';
import { Wrapper } from '@/components/CustomComponents/CustomMui';
import renderPrice from '@/utils/renderPrice';
import { feedbackApi } from '@/utils/services/api/feedbackapi';
import { menuApi } from '@/utils/services/api/menuApi';
import { Box, Rating, Typography } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dateTimeFormate from '@/utils/dateTimeFormate';
import RenderContent from '@/components/renderContent/RenderContent';
import { catalogApi } from '@/utils/services/api/catalogApi';
import capitalize from '@/utils/capitalize';

export default function ItemDetail() {
  const searchParams = useSearchParams();
  const _slug = searchParams.get('slug');

  interface Menu {
    id: number;
    name: string;
    catalog: string;
    price: number;
    unit: string;
    catalogSlug: string;
    imagePath: string;
    image_url: string;
  }
  interface Suggest {
    items: any[];
    imagePath: string;
  }
  interface RateValue {
    soluot: number;
    trunbinh: number;
  }
  interface Feedback {
    id: number;
    customer_id: number;
    menu_id: number;
    point: number;
    feedback_content: string;
    feedback_code: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }

  const [menu, setMenu] = useState<Menu>({
    id: 0,
    name: '',
    catalog: '',
    price: 0,
    unit: '',
    catalogSlug: '',
    imagePath: '',
    image_url: '',
  });

  const [feedbacks, setFeedbacks] = useState<Feedback[]>();
  const [rateValue, setRateValue] = useState<RateValue>({ soluot: 0, trunbinh: 0 });
  const [suggest, setSuggest] = useState<Suggest>({ items: [], imagePath: '' });

  const { id, name, catalog, price, unit, catalogSlug, imagePath, image_url } = menu;
  const { soluot, trunbinh } = rateValue;
  useEffect(() => {
    window.scrollTo(0, 0);

    async function getData() {
      if (_slug) {
        const menu = await menuApi({ slug: _slug });
        setMenu(menu.data);
        if (menu.data && menu.data.id) {
          const feedbacks = await feedbackApi({ menu_id: menu.data.id });
          setFeedbacks(feedbacks.data);
          setRateValue({
            soluot: parseFloat(feedbacks.data.length),
            trunbinh: parseFloat(
              (
                feedbacks.data.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.point, 0) /
                feedbacks.data.length
              ).toFixed(1),
            ),
          });
          const catalogs = await catalogApi();

          const { catalogsWithMenus, imagePath } = catalogs?.data;
          let suggest;
          catalogsWithMenus.forEach((item: any) => {
            if (item.slug === menu.data.catalogSlug) {
              suggest = item.menus.filter((item: any) => item.name !== menu.data.name);
            }
          });
          if (suggest) setSuggest({ items: suggest, imagePath });
        }
      }
    }
    getData();
  }, [_slug]);

  return (
    <>
      <Box sx={{ borderBottom: '3px solid #efeef5' }}>
        <Wrapper
          sx={{
            display: 'grid',
            paddingTop: '20px',
            paddingBottom: '30px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '10px',
            }}
          >
            <Box
              sx={{
                maxWidth: { md: '500px' },
                flex: 1,
                padding: 1,
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${imagePath}${image_url})`,
                  width: '100%',
                  paddingTop: { xs: '56.25%', md: '66.25%', xl: '56.25%' },
                  position: 'relative',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  borderRadius: '6px',
                  backgroundColor: '#eee',
                }}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                padding: 1,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                '.add-to-cart': {
                  width: { xs: '100%', md: 'fit-content' },
                  justifyContent: 'center',
                },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  gap: { xs: '10px', 992: '20px' },
                  flexDirection: 'column',
                }}
              >
                <Typography fontSize={{ xs: '2rem', md: '2.5rem', lg: '3rem' }} fontWeight={700}>
                  {capitalize(name)}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Rating name="read-only" value={trunbinh} readOnly precision={0.1} />
                  </Box>
                  <Box> {trunbinh}</Box> - <Box> {soluot} đánh giá</Box>
                </Box>

                <Typography display={'inline-flex'} fontSize={'1.6rem'} fontWeight={500}>
                  Catalog :
                  <Link href={`/menu#${catalogSlug}`} style={{ color: '#337ab7' }}>
                    &nbsp;{catalog}
                  </Link>
                </Typography>

                <Typography color={'#e0592a'} fontSize={'1.6rem'} fontWeight={500}>
                  Giá : {renderPrice(price)} / 1 {unit}
                </Typography>
              </Box>

              <Button primary className="add-to-cart">
                <AddShoppingCartSharpIcon sx={{ mr: '5px' }} /> Thêm vào giỏ hàng
              </Button>
            </Box>
          </Box>
        </Wrapper>
      </Box>

      <Box sx={{ backgroundColor: '#f5f5f5', borderBottom: '3px solid #efeef5' }}>
        <Wrapper
          sx={{
            display: 'grid',
            paddingTop: '20px',
            paddingBottom: '30px',
            padding: 1,
            gap: '20px',
          }}
        >
          <Typography fontSize="1.8rem" fontWeight={700}>
            {`Đánh giá và nhận xét về "${name}" của khách hàng`}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              borderBottom: '2px solid #efeef5',
              paddingBottom: '20px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Rating name="read-only" value={trunbinh} readOnly precision={0.1} />
            </Box>
            <Box> {trunbinh}</Box> - <Box> {soluot} đánh giá</Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
            {feedbacks?.map((item) => {
              return (
                <Box
                  key={item.feedback_code}
                  sx={{
                    borderRadius: '6px',
                    padding: '5px 10px',
                    backgroundColor: '#fae0e069',
                    border: '1px solid #0000000a',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <Rating
                        sx={{ fontSize: '1.6rem' }}
                        name="read-only"
                        value={item.point}
                        readOnly
                        precision={0.1}
                      />
                      <Image className="verifyImg" width="15" height="16" src="/images/verify.png" alt="" />
                      <Typography display={{ xs: 'none', md: 'unset' }} fontSize={'1.4rem'} color={'green'}>
                        Chứng nhận đã mua hàng
                      </Typography>
                    </Box>
                    <Typography fontSize={'1.4rem'}>{dateTimeFormate(item.createdAt)}</Typography>
                  </Box>
                  <Typography display={'inline-flex'} fontSize={'1.6rem'} fontWeight={500}>
                    Bởi :&nbsp;{`${item.firstName} ${item.lastName}`}
                  </Typography>
                  {item.feedback_content && (
                    <Typography display={'inline-flex'} fontSize={'1.6rem'} fontWeight={500}>
                      Nhận xét :&nbsp;{item.feedback_content}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </Wrapper>
      </Box>

      <Box
        sx={{
          paddingBottom: '30px',
          borderBottom: '3px solid #efeef5',
          padding: 1,
          paddingTop: '20px',
        }}
      >
        <Wrapper sx={{ flexDirection: 'column', width: '100%', alignItems: 'start' }}>
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              mb: '10px',
              textTransform: 'uppercase',
              color: 'grey',
            }}
          >
            Gợi ý cùng danh mục ({menu.catalog})
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat( auto-fill, minmax(200px, 1fr))',
                md: 'repeat( auto-fill, minmax(250px, 1fr))',
              },
              gridAutoRows: 'auto',
              gap: {
                xs: '2px',
                md: '5px',
                xl: '10px',
              },
            }}
          >
            {RenderContent(suggest)}
          </Box>
        </Wrapper>
      </Box>
    </>
  );
}
