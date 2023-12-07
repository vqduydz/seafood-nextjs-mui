'use client';
import capitalize from '@/utils/capitalize';
import renderPrice from '@/utils/renderPrice';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface RenderProps {
  items: {
    image_url: string;
    name: string;
    slug: string;
    unit: string;
    price: number;
  }[];
  imagePath: string;
}

const RenderContent = ({ imagePath, items }: RenderProps) => {
  return items.map((item) => (
    <Box
      key={item.slug}
      sx={{
        width: '100%',
        borderRadius: '6px',
        border: '1px solid  rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',
          '.image': {
            transform: 'scale(1.04)',
          },
        },
      }}
    >
      <Link href={`/detail?slug=${item?.slug}`} style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '6px' }}>
            <Box
              className="image"
              sx={{
                backgroundImage: `url(${imagePath}${item.image_url})`,
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
              textAlign: 'left',
              '& p': { fontWeight: 700 },
            }}
          >
            <Typography className="h3">{capitalize(item.name)}</Typography>
            <Typography sx={{ fontSize: '1.5rem', color: '#e0592a' }}>
              {item.price ? renderPrice(item.price) : item.price} / 1 {item.unit}
            </Typography>
            {/* <Box></Box> */}
          </Box>
        </Box>
      </Link>
    </Box>
  ));
};

export default RenderContent;
