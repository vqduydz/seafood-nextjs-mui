import Button from '@/components/Button/Button';
import { useMyContext } from '@/context/context';
import { updateCartItemApi } from '@/utils/services/api/cartItemApi';
import { menuApi } from '@/utils/services/api/menuApi';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';

import { memo, useEffect, useState } from 'react';

interface IQuantity {
  sl: number;
  id: number;
}

const Quantity = ({ sl, id }: IQuantity) => {
  const [quantity, setQuantity] = useState<number>(sl);

  const { handleGetCartItems } = useMyContext();
  const [maxOrder, setMaxOrder] = useState<number>(5);

  const handleChangeQuantity = async (quantity: number) => {
    const updateData = { id, quantity };
    await updateCartItemApi(updateData);
    if (handleGetCartItems) handleGetCartItems();
  };

  useEffect(() => {
    const getMenu = async () => {
      const res = await menuApi();
      setMaxOrder(res.data.max_order || 5);
    };
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        width: '100px',
        display: 'flex',
        justifyContent: 'center',
        height: '25px',
        gap: '1px',
        mt: '2px',
        mb: '5px',
        '& .so-luong': {
          border: '1px solid #555',
        },
      }}
    >
      <Button
        disable={quantity <= 1}
        onClick={() => {
          let res = quantity - 1;
          if (res <= 1) res = 1;
          setQuantity(res);
          handleChangeQuantity(res);
        }}
        className="so-luong"
        style={{
          border: 'none',
          backgroundColor: '#0000001a',
          color: '#0000008b',
          padding: 0,
        }}
      >
        <RemoveIcon />
      </Button>
      <input
        className="so-luong"
        style={{
          width: '30px',
          textAlign: 'center',
          fontSize: '1.4rem',
          border: 'none',
          userSelect: 'none',
          cursor: 'default',
        }}
        step="1"
        min={1}
        max={maxOrder}
        value={quantity}
        autoComplete="off"
        height="100%"
        readOnly
      />
      <Button
        disable={quantity >= maxOrder}
        onClick={() => {
          let res = quantity + 1;
          if (res >= maxOrder) res = maxOrder;
          setQuantity(res);
          handleChangeQuantity(res);
        }}
        className="so-luong"
        style={{
          border: 'none',
          backgroundColor: '#0000001a',
          color: '#0000008b',
          padding: 0,
        }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default memo(Quantity);
