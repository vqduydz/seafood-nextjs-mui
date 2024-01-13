'use client';
import { Box, Typography } from '@mui/material';
// import AppOrderTimeline from './AppOrderTimeline';
// import CustomizedTables from './CustomizedTables';
import Feedback from './FeedBack';
import { ICartItem, IUser, IPlace, useMyContext } from '@/context/context';
import { useAppDispatch } from '@/lib/redux/store';
import { useSearchParams } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import renderPrice from '@/utils/renderPrice';
import Button from '@/components/Button/Button';
import loginOnly from '@/ShareLayout/loginOnly';
import { getOrderByOrderCodeApi } from '@/utils/services/api/orderApi';
import { IOrder, IOrderItems } from '@/interface/interface';
import { getFeedbackApi } from '@/utils/services/api/feedbackapi';
import Image from 'next/image';
import AppOrderTimeline from './AppOrderTimeline';
import CustomizedTables from './CustomizedTables';
import { myColors } from '@/styles/color';

const Order = () => {
  const { auth } = useMyContext();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const _order_code = searchParams.get('order-code');
  const [order, setOrder] = useState<IOrder>({});
  const {
    deliver,
    handler,
    payment_methods,
    order_code,
    status,
    payment,
    ship_fee,
    total_amount,
    total_payment,
    items,
    place,
    note,
  } = order;
  const [list, setList] = useState([]);
  const [feedback, setfeedback] = useState<{ open: boolean; orderItem?: IOrderItems }>({ open: false });
  const { open } = feedback;
  const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);

  useEffect(() => {
    const getOrderByCode = async () => {
      try {
        const res = (await getOrderByOrderCodeApi({ order_code: _order_code as string, token: auth?.token as string }))
          .data;

        const {
          deliver,
          handler,
          payment_methods,
          order_code,
          status,
          payment,
          ship_fee,
          total_amount,
          total_payment,
          items,
          history,
          place,
          createdAt,
          note,
        } = res;

        setList(JSON.parse(history));
        setOrder({
          note,
          deliver,
          handler,
          payment_methods,
          order_code,
          status,
          payment,
          ship_fee,
          total_amount,
          total_payment,
          items: JSON.parse(items),
          place: JSON.parse(place),
          createdAt,
        });
      } catch (error) {
        console.log({ error });
      }
    };
    getOrderByCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!items) return;
    (async () => {
      const promises = items.map(async (item) => {
        try {
          const getfeedback = (await getFeedbackApi({ feedback_code: `${order_code}${item.cartItemId}` })).data;
          return { ...item, feedbacked: getfeedback.feedbacked };
        } catch (error) {
          console.log(error);
          return item;
        }
      });

      const result = await Promise.all(promises);
      setOrderItems(result);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function createData(name: string, value: string | number) {
    return { name, value };
  }

  const rows = [
    createData('Tổng số lượng', total_amount as string | number),
    createData('Tổng tiền hàng', renderPrice(payment as number) as unknown as number),
    createData('Phí giao hàng', renderPrice(ship_fee as number) as unknown as number),
    createData('Tổng tiền thanh toán', renderPrice(total_payment as number) as unknown as number),
    createData('Phương thức Thanh toán', payment_methods as string | number),
  ] as { name: string; value: string | number }[];

  const handlefeedback = (item: IOrderItems) => {
    setfeedback({ open: true, orderItem: item });
  };

  return (
    <>
      <Box
        sx={{
          mt: '20px',
          mb: '20px',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
          <Box
            sx={{
              padding: '5px 10px',
              backgroundColor: '#00000005',
              border: '1px solid #0000000a',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                '& p': {
                  fontWeight: 500,
                  '& i': {
                    color: '#337ab7',
                    fontWeight: 500,
                  },
                },
              }}
            >
              <Typography>
                Mã đơn hàng : <i>{order_code}</i>
              </Typography>
              <Typography>
                Trạng thái đơn hàng : <i>{status}</i>{' '}
              </Typography>
            </Box>
            <Typography sx={{ mt: 0.5, pt: 0.5, borderTop: '1px solid #0000000a', fontWeight: 700 }}>
              <u> Người nhận</u>
            </Typography>
            <Box
              sx={{
                flexDirection: 'column',
                display: 'flex',
                '& p': {
                  fontWeight: 500,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <Typography>{place?.name}</Typography>
                <Typography> {place?.phoneNumber}</Typography>
              </Box>
              <Typography>Địa chỉ :{` ${place?.address}`}</Typography>
              {note && (
                <Typography fontStyle={'italic'} sx={{ textDecoration: 'underline', color: myColors.primary }}>
                  Ghi chú :{` ${note}`}
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                borderRadius: '6px 6px 0 0',
                padding: '15px 10px',
                backgroundColor: '#00000005',
                border: '1px solid #0000000a',
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <Box>
                <Typography fontWeight={700}>Sản phẩm</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography sx={{ width: '100px', fontWeight: 700 }}>Đơn giá</Typography>
                <Typography sx={{ width: '30px', fontWeight: 700 }}>SL</Typography>
                <Typography sx={{ width: '100px', fontWeight: 700 }}>Thành tiền</Typography>
                {status === 'Hoàn thành' && <Typography sx={{ width: '120px', fontWeight: 700 }}>Thao tác</Typography>}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '2px', flexDirection: 'column', '& p': { fontWeight: 500 } }}>
              {orderItems?.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    borderRadius: '6px',
                    padding: '10px',
                    backgroundColor: '#00000005',
                    border: '1px solid #0000000a',
                    display: 'flex',
                    textAlign: 'center',
                    gap: '10px',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',

                      fontSize: '1.4rem',
                      gap: '10px',
                    }}
                  >
                    <Image
                      style={{ border: '1px solid #00000009' }}
                      className="verifyImg"
                      width="80"
                      height="60"
                      src={item.image}
                      alt=""
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
                      <Box
                        sx={{
                          '& p': {
                            fontWeight: 700,
                            '& i': {
                              color: myColors.primary,
                              fontWeight: 500,
                              fontSize: '1.3rem',
                            },
                          },
                        }}
                      >
                        <Button
                          style={{ width: 'fit-content', fontWeight: 500 }}
                          link
                          href={`/detail?slug=${item.slug}`}
                          target="_blank"
                        >
                          {item.name}
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '10px',
                          justifyContent: 'end',
                          alignItems: 'center',
                        }}
                      >
                        <Typography sx={{ width: '100px' }} color={myColors.primary}>
                          {renderPrice(item.price)}
                        </Typography>
                        <Typography sx={{ width: '30px' }} color={myColors.primary}>
                          {item.quantity}
                        </Typography>
                        <Typography sx={{ width: '100px' }} color={myColors.primary}>
                          {renderPrice(item.price * item.quantity)}
                        </Typography>
                        {status === 'Hoàn thành' &&
                          (item?.feedbacked ? (
                            <Button style={{ width: '120px' }} primary disable>
                              Đã đánh giá
                            </Button>
                          ) : (
                            <Button
                              primary
                              style={{ width: '120px', padding: '4px' }}
                              onClick={() => handlefeedback(item)}
                            >
                              Đánh giá
                            </Button>
                          ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Box
              sx={{
                backgroundColor: '#00000005',
                border: '1px solid #0000000a',
                flex: 1,
                display: 'flex',
              }}
            >
              <AppOrderTimeline list={list} deliver={deliver} handler={handler} />
            </Box>
            <Box sx={{ backgroundColor: '#00000005' }}>
              <CustomizedTables sx={{ backgroundColor: 'transparent', minWidth: '400px' }} rows={rows} />
            </Box>
          </Box>
        </Box>
      </Box>
      {open && <Feedback feedback={feedback} setfeedback={setfeedback} order_code={order_code as string} />}
    </>
  );
};

export default loginOnly(memo(Order));
