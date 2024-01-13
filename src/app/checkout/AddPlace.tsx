import Button from '@/components/Button/Button';
import { IPlace, useMyContext } from '@/context/context';
import { Box, Snackbar, Typography } from '@mui/material';
import React, { FormEvent, memo, useEffect, useState } from 'react';

import DropDown from '@/components/Dropdown/Dropdown';
import MyTextField from '@/components/MyTextField/MyTextField';
import MyGoogleMap from './MyGoogleMap';
import { myColors } from '@/styles/color';
import { updateUserApi } from '@/utils/services/api/userApi';
import { login } from '@/lib/redux/features/authSlices';
import { useAppDispatch } from '@/lib/redux/store';
import capitalize from '@/utils/capitalize';
import { ISubmitForm } from '@/interface/interface';

const AddPlace = ({
  setAdd,
  allPlace,
}: {
  setAdd: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  allPlace: IPlace[] | null;
}) => {
  const { currentUser, auth } = useMyContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [addressList, setAddressList] = useState<string[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 10.78803816266225,
    lng: 106.69775639053384,
  });
  const [place, setPlace] = useState<IPlace>({
    address: searchValue,
    location,
  });
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    setPlace({ ...place, address: searchValue, location });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, location]);

  const handleAddPlace = async (e: ISubmitForm) => {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      const place = {
        name: capitalize(data.get('name') as string),
        phoneNumber: data.get('phoneNumber') as string,
        address: searchValue,
        location,
        place_id: Date.now().toString(),
      } as IPlace;
      const allPlaceUpdate = allPlace ? [...allPlace, place] : [place];
      const dataUpdate = {
        id: currentUser?.id as string | number,
        place: JSON.stringify(allPlaceUpdate),
      };
      const res = await updateUserApi(dataUpdate, auth?.token as string);
      if (res.data && !res.data.error) {
        dispatch(login(auth?.token as string));
        return;
      }
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setAdd(false);
    }
  };

  // console.log({ addressList });

  return (
    <Snackbar
      className="nnnnnnnn"
      open={true}
      sx={{
        top: '0!important',
        left: '0!important',
        right: '0!important',
        bottom: '0!important',
        backgroundColor: '#33333399',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          boxShadow: '0 0 10px 5px #00000012',
          width: '100%',
          maxWidth: '768px',
          position: 'relative',
          minWidth: '320px',
          '.updateForm': { padding: { xs: '10px', md: '20px 30px' } },
        }}
      >
        <form
          className="updateForm"
          autoComplete="off"
          onSubmit={handleAddPlace}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '100%',
            maxWidth: '768px',

            overflow: 'scroll',
            maxHeight: '100vh',
          }}
        >
          <Typography fontSize={'2rem'} fontWeight={700}>
            CẬP NHẬT ĐỊA CHỈ GIAO HÀNG
          </Typography>

          <Typography fontWeight={500} fontSize={'1.4rem'}>
            Hiện tại chỉ giao hàng tại TP. Hồ Chí Minh.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexDirection: { 0: 'column', 768: 'row' },
            }}
          >
            <MyTextField
              props={{
                sx: { marginTop: '15px' },
                size: 'small',
                label: 'Nhập họ & tên người nhận',
                name: 'name',
                type: 'text',
                autoFocus: true,
              }}
            />
            <MyTextField
              props={{
                sx: { marginTop: '15px' },
                size: 'small',
                label: 'Nhập số điện thoại người nhận',
                name: 'phoneNumber',
                type: 'number',
                required: true,
              }}
            />
          </Box>

          <Box
            sx={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box sx={{ height: '1px', backgroundColor: error ? myColors.primary : myColors.grey, width: '100%' }} />
            {error && (
              <Typography
                sx={{
                  display: 'block',
                  position: 'absolute',
                  width: 'fit-content',
                  backgroundColor: myColors.white,
                  color: 'red',
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  padding: '2px 10px',
                  textAlign: 'center',
                }}
              >
                Hệ thống không thể tìm được địa chỉ của bạn. Vui lòng kiểm tra lại địa chỉ được nhập hoặc đánh dấu thủ
                công vị trí của bạn trên bản đồ.
              </Typography>
            )}
          </Box>

          <DropDown
            input={{
              isAddress: true,
              inputLabel: 'Nhập địa chỉ',
              setSearchValue: setSearchValue,
              // searchValue: updateModel.receiver ? searchValue : addressSelect,
              searchValue: searchValue,
            }}
            dropList={addressList}
            result={searchValue}
            setResult={setSearchValue}
            style={{ marginBottom: '10px' }}
          />

          <MyGoogleMap
            setError={setError}
            location={location}
            setLocation={setLocation}
            searchValue={searchValue}
            setAddressSelect={setSearchValue}
            setAddressList={setAddressList}
          />

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
            <Button primary className="action">
              Xác nhận
            </Button>
            <Button type="button" onClick={() => setAdd(false)} primary className="action">
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Snackbar>
  );
};

export default memo(AddPlace);
