'use client';
import Button from '@/components/Button/Button';
import { ICartItem, useMyContext } from '@/context/context';
import { setOrderItems } from '@/lib/redux/features/orderSlice';
import { useAppDispatch } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import renderPrice from '@/utils/renderPrice';
import { deleteCartItemApi } from '@/utils/services/api/cartItemApi';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Box, Slide, SlideProps, Snackbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useMemo, useState } from 'react';
import Quantity from './Quantity';
import loginOnly from '@/ShareLayout/loginOnly';

const Cart = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cartItems, handleGetCartItems } = useMyContext();
  const [selectedFoods, setSelectedFoods] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cartItemDelete, setCartItemDelete] = useState<{
    openDelete?: boolean;
    idCartItemDelete?: number;
    nameCartItemDelete?: string;
  }>({ openDelete: false });

  const { openDelete, idCartItemDelete, nameCartItemDelete } = cartItemDelete;
  const selectedFoodsMemo = useMemo(() => selectedFoods, [selectedFoods]);

  useEffect(() => {
    if (cartItems) {
      const selectedFoods = selectedFoodsMemo.filter((itemB) =>
        cartItems.some((itemA) => itemA.menu_id === itemB.menu_id),
      );

      let newSelectFoods: ICartItem[] = [];
      selectedFoods.forEach((itemA) => {
        const itemB = cartItems.find((item) => item.menu_id === itemA.menu_id);
        if (itemB) {
          newSelectFoods.push({ ...itemA, ...itemB });
        } else {
          newSelectFoods.push({ ...itemA });
        }
      });
      setSelectedFoods(newSelectFoods);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  useEffect(() => {
    const total = selectedFoodsMemo.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    setTotal(total);
  }, [selectedFoodsMemo]);

  const delCartItem = (id: number, name: string) => {
    setCartItemDelete({ openDelete: true, idCartItemDelete: id, nameCartItemDelete: name });
  };

  const handleDeleteCartItem = async (id: number) => {
    await deleteCartItemApi(id);
    if (handleGetCartItems) handleGetCartItems();
  };

  const handleOrder = () => {
    const orderItems = selectedFoodsMemo.map((item) => ({
      catalog: item.catalog,
      catalog_slug: item.catalogSlug,
      menu_id: item.menu_id,
      cartItemId: item.id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
      total: item.quantity * item.price,
      max_order: item.max_order,
      catalogSlug: item.catalogSlug,
      customer_id: item.customer_id,
      id: item.id,
      unit: item.unit,
    })) as ICartItem[];

    dispatch(setOrderItems(orderItems));
    router.push('/checkout');
  };

  // handle select

  const TransitionDown = (props: SlideProps) => {
    return <Slide {...props} direction="down" />;
  };

  return (
    <>
      {openDelete && (
        <Box
          className="abc123"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#cccccc50',
            zIndex: 101,
            '& .MuiSnackbar-anchorOriginTopCenter': {
              position: 'fixed',
              top: '30%',
              left: '50%',
              width: 'fit-content',
              transform: 'translate(-50%,-30%)',
              '& .MuiAlert-root': {
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '2rem',
                '& .MuiSvgIcon-root': { fontSize: '2.5rem' },
                '& .MuiAlert-action': { display: 'none' },
              },
            },
          }}
        >
          <Snackbar
            TransitionComponent={TransitionDown}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openDelete}
            onClose={() => {
              setCartItemDelete({ openDelete: false });
            }}
          >
            <Alert
              variant="outlined"
              onClose={() => {
                setCartItemDelete({ openDelete: false });
              }}
              severity={'warning'}
              sx={{
                backgroundColor: '#fff',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Typography fontStyle={'italic'} fontWeight={700} color={myColors.primary} textAlign={'center'}>
                  Xác nhận xóa <span style={{ color: myColors.secondary }}>{nameCartItemDelete} </span>khỏi giỏ hàng ?
                </Typography>
                <Box
                  sx={{
                    mt: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    '& .action': {
                      padding: '5px 15px',
                    },
                  }}
                >
                  <Button
                    outline
                    className="action"
                    onClick={() => {
                      handleDeleteCartItem(idCartItemDelete as number);
                      setCartItemDelete({
                        openDelete: false,
                        nameCartItemDelete: nameCartItemDelete,
                      });
                    }}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    primary
                    className="action"
                    onClick={() => {
                      setCartItemDelete({
                        openDelete: false,
                        nameCartItemDelete: nameCartItemDelete,
                      });
                    }}
                  >
                    Hủy
                  </Button>
                </Box>
              </Box>
            </Alert>
          </Snackbar>
        </Box>
      )}

      {cartItems?.length ? (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              position: 'sticky',
              top: { xs: '88px', lg: '108px' },
              padding: '15px 10px',
              backgroundColor: myColors.grey,
              border: '1px solid #0000000a',
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'center',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <Box sx={{ gap: '10px', display: 'flex', flexDirection: 'row' }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFoodsMemo.length === cartItems.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFoods(cartItems);
                    } else {
                      setSelectedFoods([]);
                    }
                  }}
                />
              </label>
              <Typography fontWeight={700}>Sản phẩm</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <Typography sx={{ display: 'block', width: '100px', fontWeight: 700 }}>Đơn giá</Typography>

              <Typography sx={{ display: 'block', width: '140px', fontWeight: 700 }}>Thao tác</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
            {cartItems.map((item) => {
              const { id, image, name, price, slug, menu_id, quantity } = item;

              return (
                <Box
                  key={id}
                  sx={{
                    padding: '15px 10px',
                    backgroundColor: '#00000005',
                    border: '1px solid #0000000a',
                    display: 'flex',
                    textAlign: 'center',
                    gap: '10px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFoodsMemo.some((food) => food.menu_id === menu_id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFoods([...selectedFoods, item]);
                      } else {
                        setSelectedFoods(selectedFoods.filter((f) => f.menu_id !== menu_id));
                      }
                    }}
                  />
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      fontSize: '1.4rem',
                      gap: '10px',
                    }}
                  >
                    <Box
                      style={{
                        width: '80px',
                        height: '60px',
                        backgroundImage: `url(${image})`,
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '90% 90%',
                      }}
                    />
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        fontSize: '1.4rem',
                        gap: '10px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Button href={`/detail?slug=${slug}`} target="_blank">
                        <Typography color={'#337ab7'} textAlign={'left'} fontSize={'1.6rem'} fontWeight={500}>
                          {name}
                        </Typography>
                      </Button>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          fontSize: '1.4rem',
                          gap: '10px',
                          justifyContent: 'end',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{ display: 'block', width: '100px' }}
                          mt={2}
                          fontSize={'1.6rem'}
                          fontWeight={500}
                          color={myColors.primary}
                        >
                          {renderPrice(price)}
                        </Typography>

                        <Quantity sl={quantity} id={id} />

                        <Box
                          sx={{
                            width: '30px',
                            '& .delete-btn': {
                              margin: '0 auto',
                              '& span': { textAlign: 'center' },
                            },
                          }}
                        >
                          <Button
                            onClick={() => {
                              delCartItem(item.id, name);
                            }}
                            className="delete-btn"
                            style={{ padding: 0 }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}

            <Box sx={{ position: 'sticky', bottom: '0', backgroundColor: myColors.white, mb: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  fontSize: '1.8rem',
                  gap: '30px',
                  justifyContent: 'end',
                  alignItems: 'center',
                  margin: '20px 0',
                  color: myColors.primary,
                }}
              >
                <Typography fontWeight={700} fontSize={'1.6rem'}>
                  Tổng tiền
                </Typography>
                <Typography fontWeight={700} fontSize={'1.6rem'}>
                  {renderPrice(total)}
                </Typography>
                {!selectedFoodsMemo || selectedFoodsMemo.length <= 0 ? (
                  <Button primary disable={!selectedFoodsMemo || selectedFoodsMemo.length <= 0}>
                    Mua hàng
                  </Button>
                ) : (
                  <Button primary onClick={handleOrder}>
                    Mua hàng
                  </Button>
                )}
              </Box>

              <Box sx={{ '& *': { fontWeight: 500 } }}>
                <Typography sx={{ textAlign: 'right' }}>
                  Đơn hàng trên <span style={{ fontWeight: 700, color: myColors.primary }}>{renderPrice(2000000)}</span>{' '}
                  được miễn phí giao hàng
                </Typography>
                <Typography sx={{ textAlign: 'right' }}>
                  Đơn hàng trên <span style={{ fontWeight: 700, color: myColors.primary }}>{renderPrice(1000000)}</span>{' '}
                  phí giao hàng là{' '}
                  <span style={{ fontWeight: 700, color: myColors.primary }}>{renderPrice(50000)}</span>
                </Typography>
                <Typography sx={{ textAlign: 'right' }}>
                  Đơn hàng dưới <span style={{ fontWeight: 700, color: myColors.primary }}>{renderPrice(1000000)}</span>{' '}
                  phí giao hàng là{' '}
                  <span style={{ fontWeight: 700, color: myColors.primary }}>{renderPrice(100000)}</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            padding: '40px 0 60px 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(/images/empty-cart.png)`,
              position: 'relative',
              width: '140px',
              height: '140px',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundColor: myColors.primary,
              transition: 'transform 0.3s',
              borderRadius: '50%',
            }}
          />
          <Typography fontSize={'2rem'} fontWeight={700} color={'grey'}>
            Giỏ hàng của bạn còn trống
          </Typography>
          <Button primary href={'/'}>
            Mua hàng
          </Button>
        </Box>
      )}
    </>
  );
};

export default loginOnly(memo(Cart));
