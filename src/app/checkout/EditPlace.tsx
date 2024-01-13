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

const EditPlace = ({
  edit = { stt: false, place: {} },
  setEdit,
  allPlace,
}: {
  edit: { stt: boolean; place: IPlace };
  setEdit: React.Dispatch<React.SetStateAction<{ stt: boolean; place: IPlace }>>;
  allPlace: IPlace[] | null;
}) => {
  const { currentUser, auth } = useMyContext();
  const [searchValue, setSearchValue] = useState<string>(edit.place.address as string);
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

  const handleEditPlace = async (e: ISubmitForm) => {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      const slPlaceUpdate = {
        ...edit.place,
        ...place,
        name: capitalize(data.get('name') as string),
        phoneNumber: data.get('phoneNumber') as string,
      } as IPlace;
      const allPlaceUpdate = allPlace?.filter((item) => item.place_id !== slPlaceUpdate.place_id).concat(slPlaceUpdate);

      // console.log({ slPlaceUpdate, allPlaceUpdate, allPlace });

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
      setEdit({ stt: false, place: {} });
    }
  };

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
          onSubmit={handleEditPlace}
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
          {edit.place.primary && (
            <Box
              sx={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box sx={{ height: '1px', backgroundColor: myColors.secondary, width: '100%' }} />
              <Typography
                sx={{
                  display: 'block',
                  position: 'absolute',
                  width: 'fit-content',
                  backgroundColor: myColors.white,
                  color: myColors.secondary,
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  padding: '2px 10px',
                  textAlign: 'center',
                }}
              >
                Chỉ thay đổi Tên vào số điện thoại với địa chỉ mặc định trong cài đặt tài khoản
              </Typography>
            </Box>
          )}
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
                label: edit.place.primary ? 'Họ & tên người nhận' : 'Nhập họ & tên người nhận',
                name: 'name',
                type: 'text',
                defaultValue: edit.place.name,
                autoFocus: true,
                required: true,
                inputProps: edit.place.primary
                  ? {
                      readOnly: true,
                      style: { opacity: 0.5, cursor: 'default', userSelect: 'none' },
                    }
                  : {},
              }}
            />
            <MyTextField
              props={{
                sx: { marginTop: '15px' },
                size: 'small',
                label: edit.place.primary ? 'Số điện thoại người nhận' : 'Nhập số điện thoại người nhận',
                name: 'phoneNumber',
                defaultValue: edit.place.phoneNumber,
                type: 'number',
                required: true,
                inputProps: edit.place.primary
                  ? {
                      readOnly: true,
                      style: { opacity: 0.5, cursor: 'default', userSelect: 'none' },
                    }
                  : {},
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
            <Button type="button" onClick={() => setEdit({ stt: false, place: {} })} primary className="action">
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Snackbar>
  );
};

export default memo(EditPlace);
