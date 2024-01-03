import renderPrice from '@/utils/renderPrice';
import { Box, Typography } from '@mui/material';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
import Button from '../Button/Button';

interface DynamicField {
  item: {
    image: string;
    name: string;
    slug: string;
    price: number;
    id: number;
  };
  imagePath: string;
}

interface ContentProps<T> {
  data: T;
  menu?: boolean;
  quantity: number;
}

function Content({ data, menu = false, quantity }: ContentProps<DynamicField>) {
  const { item, imagePath } = data;
  const { image, name, slug, price, id } = item;

  return (
    <Box
      sx={{
        width: 'calc(100% - 4px)',
        textAlign: 'left',
        borderRadius: '6px',
        border: '2px solid  rgba(0,0,0,0.1)',
        '& button': {
          visibility: 'hidden',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          bottom: { xs: '5%', md: quantity <= 2 ? '3%' : '5%' },
        },
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',
          '.h3': {
            color: 'var( --mau-bc-16)',
          },
          '.image': {
            transform: 'scale(1.04)',
          },
          '& button': { visibility: 'visible', opacity: 0.8, ':hover': { opacity: 1 } },
        },
      }}
    >
      <Button
        link_n
        href={menu ? `/detail?slug=${slug}` : `/menu?=${slug}`}
        style={{
          padding: 0,
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '6px' }}>
            <Box
              className="image"
              sx={{
                backgroundImage: `url(${imagePath}${image})`,
                paddingTop: '56.25%',
                position: 'relative',
                width: '100%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundColor: '#eee',
                transition: 'transform 0.3s',
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              padding: '10px 10px 15px',
              flexDirection: 'column',
              gap: '5px',
              textAlign: 'left',
              '& p': { fontWeight: 700 },
            }}
          >
            <Typography sx={{ color: 'var(--mau-sam)' }} className="h3">
              {name}
            </Typography>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                gap: '5px',
                textAlign: 'left',
                '& p': { fontWeight: 700 },
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '1.5rem', color: '#e0592a' }}>
                {price ? renderPrice(price) : price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Button>
      {menu && <AddToCartBtn menu_id={id} />}
    </Box>
  );
}

export default Content;
