'use client';
import { myColors } from '@/styles/color';
import capitalize from '@/utils/capitalize';
import renderPrice from '@/utils/renderPrice';
import { Box, Typography } from '@mui/material';
import AddToCart from '../AddToCartBtn/AddToCartBtn';
import Button from '../Button/Button';

interface RenderProps {
  items: {
    image: string;
    name: string;
    slug: string;
    unit: string;
    price: number;
    id: number;
  }[];
  imagePath: string;
}

const RenderContent = ({ imagePath, items }: RenderProps) => {
  return items.map((item) => (
    <Box
      key={item.slug}
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: '6px',
        border: '1px solid  rgba(0,0,0,0.1)',
        '& button': { visibility: 'hidden', opacity: 0, transition: 'opacity 0.3s ease', bottom: '5%' },
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',
          '.image': {
            transform: 'scale(1.04)',
          },
          '& button': { visibility: 'visible', opacity: 0.8, ':hover': { opacity: 1 } },
        },
      }}
    >
      <Button link_n href={`/detail?slug=${item?.slug}`} style={{ width: '100%', padding: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', ':hover': {} }}>
          <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '6px' }}>
            <Box
              className="image"
              sx={{
                backgroundImage: `url(${imagePath}${item.image})`,
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
              display: 'flex',
              padding: '10px 10px 15px',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'start',
            }}
          >
            <Typography width={'100%'} display={'block'} fontWeight={700}>
              {capitalize(item.name)}
            </Typography>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                gap: '5px',

                '& p': { fontWeight: 700 },
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '1.5rem', color: myColors.primary }}>
                {item.price ? renderPrice(item.price) : item.price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Button>
      <AddToCart menu_id={item.id} />
    </Box>
  ));
};

export default RenderContent;
