'use client';
import loginOnly from '@/ShareLayout/loginOnly';
import Button from '@/components/Button/Button';
import { IPlace, useMyContext } from '@/context/context';
import { setOrderItems } from '@/lib/redux/features/orderSlice';
import { useAppDispatch } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import dateTimeFormate from '@/utils/dateTimeFormate';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import renderPrice from '@/utils/renderPrice';
import { Box, TextareaAutosize, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, memo, useEffect, useState } from 'react';
import AddFirstPlace from './AddFirstPlace';
import Pay from './Pay';
import ShowAllPlace from './ShowAllPlace';
import { createNewOrderApi } from '@/utils/services/api/orderApi';
import { deleteCartItemApi } from '@/utils/services/api/cartItemApi';

export interface IUpdateModel {
  orderer: boolean;
  receiver: boolean;
  hasNotAddress: boolean;
}

const Checkout = () => {
  const { currentUser, orderItems, auth, handleGetCartItems } = useMyContext();
  const [total, setTotal] = useState<number>(0);
  const [allPlace, setAllPlace] = useState<IPlace[] | null>(null);
  const [selectPlace, setSelectPlace] = useState<IPlace | null>(null);
  const dispatch = useAppDispatch();
  const [shipFee, setShipFee] = useState(100000);
  const router = useRouter();
  const [placeUpdate, setPlaceUpdate] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (currentUser) {
      const { place: placeJson } = currentUser;
      const allPlace = placeJson ? (JSON.parse(placeJson as unknown as string) as IPlace[]) : null;
      const selectPlace = allPlace ? allPlace.filter((place) => place.primary === true) : null;
      setAllPlace(allPlace);
      setSelectPlace(selectPlace ? selectPlace[0] : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (!orderItems || (orderItems && !orderItems.length)) return;
    if (orderItems && orderItems.length) {
      const total = orderItems.reduce((acc, c) => {
        return acc + c.quantity * c.price;
      }, 0);
      setTotal(total);
      total < 1000000 ? setShipFee(100000) : total >= 1000000 && total < 2000000 ? setShipFee(50000) : setShipFee(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderItems]);

  const handlePay = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const data = new FormData(e.currentTarget);
      e.preventDefault();
      if (!currentUser) return;
      const {} = currentUser;
      const code = `${removeVietnameseTones(dateTimeFormate(new Date())) as string}${currentUser?.id}`;
      const orderData = {
        type: 4,
        payment_methods: data.get('payment-methods') as string,
        order_code: code.replace(/ /g, ''),
        customer_id: currentUser?.id,
        items: JSON.stringify(orderItems),
        total_amount: orderItems
          ? orderItems.reduce((acc, c) => {
              return acc + c.quantity;
            }, 0)
          : 0,
        payment: total,
        ship_fee: shipFee,
        total_payment: total + shipFee,
        status: 'Chờ xác nhận',
        history: JSON.stringify([
          {
            time: null,
            status: 'Giao hàng thành công',
            stt_code: 4,
          },
          {
            time: null,
            status: 'Đã chuẩn bị hàng - Bắt đầu giao hàng',
            stt_code: 3,
          },
          {
            time: null,
            status: 'Đã xác nhận đơn hàng - Bắt đầu chuẩn bị hàng',
            stt_code: 2,
          },
          {
            time: new Date(),
            status: 'Đã đặt hàng - chờ xác nhận',
            stt_code: 1,
          },
        ]),
        place: JSON.stringify(selectPlace),
        note,
      };
      const res = await createNewOrderApi(orderData, auth?.token as string);
      if (res.data && !res.data.error && orderItems) {
        const deletePromises = orderItems.map((item) => deleteCartItemApi(item.id));
        await Promise.all(deletePromises);
        if (handleGetCartItems) handleGetCartItems();
        router.push(`/order?order-code=${orderData.order_code}`);
        dispatch(setOrderItems([]));
      }
      return;
    } catch (error) {}
  };

  const handleCancle = () => {
    dispatch(setOrderItems([]));
    router.push('/cart');
  };

  useEffect(() => {
    if (!orderItems?.length) {
      const timeoutId = setTimeout(() => {
        router.push('/cart');
      }, 10000);
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [orderItems, router]);

  return orderItems?.length ? (
    <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          padding: '15px 10px',
          backgroundColor: '#00000005',
          border: '1px solid #00000022',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '5px',
          textAlign: 'justify',
        }}
      >
        <Typography fontSize={'1.8rem'} fontWeight={700}>
          THÔNG TIN KHÁCH HÀNG
        </Typography>
        <Typography fontWeight={500}>Tên: {selectPlace?.name}</Typography>
        <Typography fontWeight={500}>Số điện thoại: {selectPlace?.phoneNumber}</Typography>
        <Typography fontWeight={500} sx={{ display: 'inline-flex' }}>
          Địa chỉ: {selectPlace?.address}
        </Typography>
        <Button
          link
          style={{ fontWeight: 700, padding: 0, fontSize: '1.4rem', width: 'fit-content' }}
          onClick={() => setPlaceUpdate(true)}
        >
          Cập nhật địa chỉ
        </Button>
        <Typography fontWeight={700} color={myColors.primary}>
          Vui lòng kiểm tra thông tin khách hàng thật cẩn thận trước khi đặt hàng.
        </Typography>
        <TextareaAutosize
          className="text-area"
          name="note"
          placeholder="Ghi chú ..."
          onChange={(e) => setNote(e.target.value)}
          style={{
            overflow: 'scroll',
            height: '80px',
            width: '100%',
            minHeight: '80px',
            minWidth: '100%',
            maxHeight: '80px',
            maxWidth: '100%',
            padding: '10px',
          }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            padding: '15px 10px',
            backgroundColor: '#00000005',
            border: '1px solid #00000022',
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
            <Typography sx={{ width: '120px' }}>Đơn giá</Typography>
            <Typography sx={{ width: '30px' }}>SL</Typography>
            <Typography sx={{ width: '120px' }}>Thành tiền</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column', mt: '1px' }}>
          {orderItems &&
            orderItems.map((item) => (
              <Box
                key={item.slug}
                sx={{
                  padding: '15px 10px',
                  backgroundColor: '#00000005',
                  border: '1px solid #00000022',
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
                    <Button
                      style={{ padding: 0, width: 'fit-content', fontWeight: 500 }}
                      href={`/detail?slug=${item.slug}`}
                      link
                      target="_blank"
                    >
                      {item.name}
                    </Button>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '1.4rem',
                        gap: '10px',
                        alignItems: 'center',
                        '& p': { fontWeight: 500, fontSize: '1.6rem', color: myColors.primary },
                      }}
                    >
                      <Typography sx={{ width: '120px' }}>{renderPrice(item.price)}</Typography>
                      <Typography sx={{ width: '30px' }}>{item.quantity}</Typography>
                      <Typography sx={{ width: '120px' }}>{renderPrice(item.price * item.quantity)}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Pay allPlace={allPlace} handleCancle={handleCancle} handlePay={handlePay} shipFee={shipFee} total={total} />
      {!allPlace && <AddFirstPlace />}
      {placeUpdate && (
        <ShowAllPlace
          allPlace={allPlace}
          setPlaceUpdate={setPlaceUpdate}
          setSelectPlace={setSelectPlace}
          selectPlace={selectPlace}
        />
      )}
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
        width: '100%',
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
          // backgroundColor: myColors.primary,
          transition: 'transform 0.3s',
          borderRadius: '50%',
        }}
      />
      <Typography fontSize={'2rem'} fontWeight={700} color={'grey'}>
        Chưa chọn mua sản phẩm
      </Typography>
      <Typography fontSize={'1.5rem'} fontWeight={700} color={'grey'}>
        Tự động chuyển đến giỏ hàng sau {countdown} giây.
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button primary href={'/'}>
          Tiếp tục mua hàng
        </Button>
        <Button style={{ width: '200px' }} outline href={'/cart'}>
          Đến giỏ hàng ({countdown}s)
        </Button>
      </Box>
    </Box>
  );
};

export default loginOnly(memo(Checkout));
