'use client';
import { useMyContext } from '@/context/context';
import { AddShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';
import Button from '../Button/Button';
import { myColors } from '@/styles/color';

export default function MyBadge() {
  const { cartItems, auth } = useMyContext();

  return (
    <>
      {auth?.isLogin && (
        <Badge
          sx={{ '.MuiBadge-badge': { lineHeight: 'normal', backgroundColor: myColors.primary } }}
          badgeContent={cartItems?.length}
          color="error"
        >
          <Button link href={'/cart'}>
            <AddShoppingCart fontSize="medium" />
          </Button>
        </Badge>
      )}
    </>
  );
}
