'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';
import Button from '../Button/Button';
import Link from 'next/link';
import renderPrice from '@/utils/renderPrice';

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
          '.h3': {
            color: '#337ab7',
          },
          '.image': {
            transform: 'scale(1.04)',
          },
        },
      }}
    >
      <Link href={'#'} style={{ width: '100%' }}>
        <Button
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
              <Typography className="h3">{item.name}</Typography>
              <Typography sx={{ fontSize: '1.5rem', color: '#e0592a' }}>
                {item.price ? renderPrice(item.price) : item.price} / 1 {item.unit}
              </Typography>
            </Box>
          </Box>
        </Button>
      </Link>
    </Box>
  ));
};

export default RenderContent;
