'use client';
import loginOnly from '@/ShareLayout/loginOnly';
import Button from '@/components/Button/Button';
import { useMyContext } from '@/context/context';
import { setOrderItems } from '@/lib/redux/features/orderSlice';
import { useAppDispatch } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import renderPrice from '@/utils/renderPrice';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import Receiver from './Receiver';

export interface ICustomer {
  name: string | null;
  phoneNumber: string | null;
  address: string | null;
  location: string | null;
}
export interface IUpdateModel {
  orderer?: boolean;
  receiver?: boolean;
}
export interface IReceiver {
  updateModel: IUpdateModel;
  setUpdateModel: React.Dispatch<React.SetStateAction<IUpdateModel>> | (() => void);
  receiver: ICustomer;
  setReceiver: React.Dispatch<React.SetStateAction<ICustomer>> | (() => void);
}

const Checkout = () => {
  const { currentUser, orderItems } = useMyContext();
  const [total, setTotal] = useState<number>(0);
  const [place, setPlace] = useState();
  const dispatch = useAppDispatch();
  const [shipFee, setShipFee] = useState(100000);
  const router = useRouter();
  const [updateModel, setUpdateModel] = useState<IUpdateModel>({
    orderer: false,
    receiver: false,
  });
  const [receiver, setReceiver] = useState<ICustomer>({
    name: null,
    phoneNumber: null,
    address: null,
    location: null,
  });

  useEffect(() => {
    if (currentUser)
      setReceiver({
        name: currentUser?.name,
        phoneNumber: currentUser?.phoneNumber,
        address: currentUser?.address,
        location: currentUser?.location,
      });
  }, [currentUser]);

  console.log({ receiver, currentUser });
  // useEffect(() => {
  //   if (!currentUser.place) return;
  //   const place = JSON.parse(currentUser.place);
  //   const address = `${place.address}, ${place.ward}, ${place.district}, ${place.province}`;
  //   setReceiver({ ...receiver, address });
  //   setPlace(address);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser.place]);

  useEffect(() => {
    if (orderItems && !orderItems.length) return;
    if (orderItems && orderItems.length) {
      const total = orderItems.reduce((acc, c) => {
        return acc + c.quantity * c.price;
      }, 0);
      setTotal(total);
      total < 1000000 ? setShipFee(100000) : total >= 1000000 && total < 2000000 ? setShipFee(50000) : setShipFee(0);
    }
  }, [orderItems]);

  // const handlePay = async (e) => {
  //   const data = new FormData(e.currentTarget);
  //   e.preventDefault();
  //   setLoading(true);
  //   const { name, phoneNumber, address } = receiver;
  //   const orderData = {
  //     type: 4,
  //     payment_methods: data.get('payment-methods'),
  //     order_code: `${removeVietnameseTones(dateTimeFormate(new Date())).replace(/ /g, '')}${userID}`,
  //     customer_id: userID,
  //     items: JSON.stringify(orderItems),
  //     total_amount: orderItems.reduce((acc, c) => {
  //       return acc + c.quantity;
  //     }, 0),
  //     payment: total,
  //     ship_fee: shipFee,
  //     total_payment: total + shipFee,
  //     status: 'Chờ xác nhận',
  //     history: JSON.stringify([
  //       {
  //         time: null,
  //         status: 'Giao hàng thành công',
  //         stt_code: 4,
  //       },
  //       {
  //         time: null,
  //         status: 'Đã chuẩn bị hàng - Bắt đầu giao hàng',
  //         stt_code: 3,
  //       },
  //       {
  //         time: null,
  //         status: 'Đã xác nhận đơn hàng - Bắt đầu chuẩn bị hàng',
  //         stt_code: 2,
  //       },
  //       {
  //         time: new Date(),
  //         status: 'Đã đặt hàng - chờ xác nhận',
  //         stt_code: 1,
  //       },
  //     ]),
  //     orderer: JSON.stringify({
  //       name: currentUser.firstName + ' ' + currentUser.lastName,
  //       phoneNumber: currentUser.phoneNumber,
  //     }),
  //     receiver: JSON.stringify({ name, phoneNumber, address }),
  //   };
  //   dispatch(createNewOrder(orderData))
  //     .then(unwrapResult)
  //     .then(() => {
  //       orderItems.forEach((item) => {
  //         dispatch(deleteCartItem(item.cartItemId)).then(() => {
  //           dispatch(setOrderItems([]));
  //           setLoading(false);
  //           navigate(routes.orders);
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  const handleCancle = () => {
    dispatch(setOrderItems([]));
    router.push('/cart');
  };

  return (
    <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          padding: '15px 10px',
          backgroundColor: '#00000005',
          border: '1px solid #0000000a',
          display: 'flex',
          flexDirection: 'column',
          // textAlign: 'center',
          justifyContent: 'space-between',
          gap: '5px',
        }}
      >
        <Typography fontSize={'1.8rem'} fontWeight={700}>
          THÔNG TIN KHÁCH HÀNG
        </Typography>
        <Typography fontWeight={700}>NGƯỜI ĐẶT</Typography>{' '}
        <Box sx={{ display: 'flex', gap: '30px' }}>
          <Typography fontWeight={500}>Tên: {currentUser?.name}</Typography>
          <Typography fontWeight={500}>Số điện thoại: {currentUser?.phoneNumber}</Typography>
        </Box>
        <Box sx={{ borderTop: '1px solid #0000001a', mt: '10px', pt: '10px' }}>
          <Receiver
            updateModel={updateModel}
            setUpdateModel={setUpdateModel}
            receiver={receiver}
            setReceiver={setReceiver}
          />
        </Box>
        <Typography fontWeight={700} color={myColors.primary}>
          Vui lòng kiểm tra thông tin khách hàng thật cẩn thận trước khi đặt hàng.
        </Typography>
        <Typography sx={{ display: 'flex', gap: '5px' }} fontWeight={700} color={myColors.primary}>
          Nếu người nhận là ai đó khác vui lòng
          <Button
            style={{ fontWeight: 700, padding: 0, fontSize: '1.4rem' }}
            link
            onClick={() => setUpdateModel({ receiver: true })}
          >
            cập nhật thông tin người nhận
          </Button>
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            padding: '15px 10px',
            backgroundColor: '#00000005',
            border: '1px solid #0000000a',
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Box sx={{ gap: '10px', display: 'flex', flexDirection: 'row' }}>
            <Typography fontWeight={700}>Sản phẩm</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              '& p': { display: 'block', fontWeight: 700 },
            }}
          >
            <Typography sx={{ width: '100px' }}>Đơn giá</Typography>
            <Typography sx={{ width: '30px' }}>SL</Typography>
            <Typography sx={{ width: '100px' }}>Thành tiền</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
          {orderItems &&
            orderItems.map((item) => (
              <Box
                key={item.slug}
                sx={{
                  padding: '15px 10px',
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
                    flexDirection: 'row',
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
                    <Box>
                      <Button
                        style={{ padding: 0, width: 'fit-content' }}
                        href={`/detail?slug=${item.slug}`}
                        text
                        target="_blank"
                      >
                        {item.name}
                      </Button>
                      <Button
                        style={{
                          padding: 0,
                          fontWeight: 500,
                          fontSize: '1.3rem',
                          width: 'fit-content',
                          fontStyle: 'italic',
                          marginTop: '5px',
                        }}
                        link
                        href={`/menu?=${item.catalogSlug}`}
                        text
                        target="_blank"
                      >
                        {item.catalog}
                      </Button>
                    </Box>
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
                        {renderPrice(item.price)}
                      </Typography>

                      <Typography
                        sx={{ display: 'block', width: '30px' }}
                        mt={2}
                        fontSize={'1.6rem'}
                        fontWeight={500}
                        color={myColors.primary}
                      >
                        {item.quantity}
                      </Typography>
                      <Typography
                        sx={{ display: 'block', width: '100px' }}
                        mt={2}
                        fontSize={'1.6rem'}
                        fontWeight={500}
                        color={myColors.primary}
                      >
                        {renderPrice(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <form
      //  onSubmit={handlePay}
      >
        {/* Phương thức thanh toán */}
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            padding: '15px 10px',
            backgroundColor: '#00000005',
            border: '1px solid #0000000a',
          }}
        >
          <Typography fontSize={'1.6rem'} fontWeight={700}>
            PHƯƠNG THỨC THANH TOÁN
          </Typography>

          <RadioGroup
            className="a1c2"
            sx={{
              ml: '20px',
              display: 'flex',
              gap: '20px',
              color: '#333',
              '& label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd': {
                borderRadius: '10px',
                height: '50px',
              },
              '& .MuiRadio-root.Mui-checked': { color: '#333' },
              '& span.MuiButtonBase-root.MuiRadio-root': {
                display: 'flex',
                '::after': {
                  display: 'block',
                  content: `''`,
                  height: '40px',
                  width: '80px',
                  ml: '5px',
                  position: 'relative',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundColor: 'transparent',
                },
              },
            }}
            defaultValue="zalopay"
            row
            aria-labelledby="payment-methods"
            name="payment-methods"
          >
            <FormControlLabel
              label=""
              sx={{
                border: '1px solid #333',
                padding: '5px 10px',
                position: 'relative',
                '& span.MuiButtonBase-root.MuiRadio-root': {
                  display: 'flex',
                  '::after': {
                    backgroundImage: `url(/icons/ZaloPay.png)`,
                  },
                },
              }}
              value="zalopay"
              control={<Radio />}
            />
            <FormControlLabel
              label=""
              sx={{
                border: '1px solid #333',
                padding: '5px 10px',
                position: 'relative',
                '& span.MuiButtonBase-root.MuiRadio-root': {
                  display: 'flex',
                  '::after': {
                    backgroundImage: `url(/icons/momo.png)`,
                    width: '40px',
                  },
                },
              }}
              value="momo"
              control={<Radio />}
            />
            <FormControlLabel
              label=""
              sx={{
                border: '1px solid #333',
                padding: '5px 10px',
                position: 'relative',
                '& span.MuiButtonBase-root.MuiRadio-root': {
                  display: 'flex',
                  '::after': {
                    backgroundImage: `url(/icons/banking.png)`,
                    width: '40px',
                  },
                },
              }}
              value="banking"
              control={<Radio />}
            />
          </RadioGroup>
        </Box>
        {/* Thành tiền */}
        <Box
          sx={{
            mt: '20px',
            mb: '20px',
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',

            position: 'sticky',
            bottom: '0',
            backgroundColor: myColors.white,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              fontSize: '1.8rem',
              gap: '30px',
              justifyContent: 'end',
              alignItems: 'center',
              padding: '0 20px',
              color: myColors.primary,
            }}
          >
            <Typography fontWeight={700} fontSize={'1.6rem'}>
              Tổng tiền
            </Typography>
            <Typography
              textAlign={'right'}
              fontWeight={700}
              fontSize={'1.6rem'}
              sx={{ display: 'block', width: '120px' }}
            >
              {renderPrice(total)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              fontSize: '1.8rem',
              gap: '30px',
              justifyContent: 'end',
              alignItems: 'center',
              padding: '0 20px',
              color: myColors.primary,
            }}
          >
            <Typography fontWeight={700} fontSize={'1.6rem'}>
              Phí giao hàng
            </Typography>
            <Typography
              textAlign={'right'}
              fontWeight={700}
              fontSize={'1.6rem'}
              sx={{ display: 'block', width: '120px' }}
            >
              {renderPrice(shipFee)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              fontSize: '1.8rem',
              gap: '30px',
              justifyContent: 'end',
              alignItems: 'center',
              padding: '0 20px',
              color: myColors.primary,
            }}
          >
            <Typography fontWeight={700} fontSize={'1.6rem'}>
              Tổng tiền thanh toán
            </Typography>
            <Typography
              textAlign={'right'}
              fontWeight={700}
              fontSize={'1.6rem'}
              sx={{ display: 'block', width: '120px' }}
            >
              {renderPrice(total + shipFee)}
            </Typography>
          </Box>
          <Box
            sx={{
              paddingRight: '20px',
              display: 'flex',
              gap: '20px',
              justifyContent: 'end',
            }}
          >
            <Button primary onClick={handleCancle}>
              Hủy
            </Button>
            {
              // !receiver.status &&

              !currentUser?.address ? (
                <Button primary disable>
                  Đặt hàng
                </Button>
              ) : (
                <Button primary>Đặt hàng</Button>
              )
            }
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default loginOnly(memo(Checkout));
