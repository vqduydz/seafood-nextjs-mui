import ClearIcon from '@mui/icons-material/Clear';
import { Box, Snackbar, Typography } from '@mui/material';
import { GoogleMap, Libraries, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { unwrapResult } from '@reduxjs/toolkit';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IReceiver } from './page';
import { useMyContext } from '@/context/context';
import { tphcm } from '@/data/data';
import useDebounce from '@/hook/useDebounce';
import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';

const ReceiverUpdate = ({ updateModel, setUpdateModel, setReceiver, receiver }: IReceiver) => {
  const dispatch = useDispatch();
  const { currentUser } = useMyContext();

  const [libraries] = useState<Libraries>(['places']);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });
  // eslint-disable-next-line no-unused-vars
  const [districts, setDistricts] = useState(
    tphcm.districts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
  );

  const address = JSON.parse(currentUser?.address as string);
  const [searchValue, setSearchValue] = useState('');
  const debounce = useDebounce(searchValue, 500);
  const [districtSelect, setDistrictSelect] = useState(() =>
    updateModel.orderer && address?.district ? address.district : '---',
  );
  const [wardList, setWardList] = useState([]);
  const [wardSelect, setWardSelect] = useState(address?.ward || '');
  const [addressList, setAddressList] = useState([]);
  const [addressSelect, setAddressSelect] = useState(address?.address || '');
  const [position, setPosition] = useState(JSON.parse(currentUser?.location as string));

  const GOONG_API_KEY = process.env.REACT_APP_GOONG_API_KEY;

  // const handleMarkerDragEnd = (event) => {
  //   const lat = event.latLng.lat();
  //   const lng = event.latLng.lng();
  //   setPosition({ lat, lng });
  // };

  // useEffect(() => {
  //   if (!districtSelect || districtSelect === '---') {
  //     setWardSelect('---');
  //     setAddressSelect('');
  //     return;
  //   }
  //   const district = { ...districts.filter((district) => district.name === districtSelect)[0] };
  //   const wardList = district.wards.sort((a, b) => {
  //     if (a.name < b.name) {
  //       return -1;
  //     }
  //     if (a.name > b.name) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  //   setWardList(wardList);
  // }, [districtSelect]);

  // const handleUpdate = async (event) => {
  //   event.preventDefault();

  //   // setLoading(true);
  //   const data = new FormData(event.currentTarget);
  //   if (updateModel.orderer) {
  //     try {
  //       const dataUpdate = {
  //         id: currentUser?.id,
  //         place: JSON.stringify({
  //           address: `${addressSelect}`,
  //           ward: `${wardSelect}`,
  //           district: `${districtSelect}`,
  //           province: `${tphcm.name}`,
  //         }),
  //         position: JSON.stringify(position),
  //       };

  //       dispatch(updateUser(dataUpdate))
  //         .then(unwrapResult)
  //         .then(() => {
  //           dispatch(login(token))
  //             .then(unwrapResult)
  //             .then(() => {
  //               setLoading(false);
  //               setUpdateModel(false);
  //             })
  //             .catch((e) => {
  //               setLoading(false);
  //               const message = e.errorMessage;
  //               setSnackbar({ open: true, message: message, status: 'error' });
  //             });
  //         })
  //         .catch((e) => {
  //           setLoading(false);
  //           const message = e.errorMessage;
  //           setSnackbar({ open: true, message: message, status: 'error' });
  //         });

  //       return;
  //     } catch (error) {}
  //   }
  //   const name = capitalize(data.get('name'));
  //   const phoneNumber = data.get('phoneNumber');
  //   // setLoading(false);
  //   setReceiver({
  //     status: true,
  //     name,
  //     phoneNumber,
  //     address: `${addressSelect}, ${wardSelect}, ${districtSelect}, ${tphcm.name}`,
  //     position,
  //   });
  //   setUpdateModel(false);
  // };
  // map

  // useEffect(() => {
  //   if (!debounce.trim()) return;
  //   if (!debounce || !wardSelect) return;
  //   const address = `${debounce},${wardSelect}, ${districtSelect}, ${tphcm.name}`;
  //   const url = `https://rsapi.goong.io/geocode?address=${place}&api_key=${GOONG_API_KEY}`;
  //   axios.get(url).then((res) => {
  //     const position = res.data.results[0].geometry.location;
  //     const { address_components } = res.data.results[0];
  //     const addressComp = address_components
  //       .slice(0, 2)
  //       .map((item) => item.long_name)
  //       .join(' ');
  //     setAddressList([searchValue, addressComp]);
  //     setPosition(position);
  //   });
  // }, [debounce]);

  useEffect(() => {
    setSearchValue('');
  }, [wardSelect, districtSelect]);

  return (
    <Box
      sx={{
        '& .MuiSnackbar-anchorOriginTopCenter': {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '100%',
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
        // TransitionComponent={TransitionDown}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={updateModel.orderer || updateModel.receiver}
        // onClose={() => {
        //   setUpdateModel(false);
        // }}
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
          }}
        >
          <Button
            style={{
              borderRadius: '50%',
              padding: '0 0',
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}
            className="action"
            onClick={() => {
              setUpdateModel({});
            }}
          >
            <ClearIcon />
          </Button>
          <form
            autoComplete="off"
            // onSubmit={handleUpdate}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '100%',
              maxWidth: '768px',
              padding: '20px 30px',
            }}
          >
            <Typography fontSize={'2rem'} fontWeight={700}>
              {updateModel.receiver ? 'CẬP NHẬT THÔNG TIN NGƯỜI NHẬN' : 'CẬP NHẬT ĐỊA CHỈ GIAO HÀNG'}
            </Typography>

            {updateModel.receiver && (
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
                    id: 'name',
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
                    id: 'phoneNumber',
                    name: 'phoneNumber',
                    type: 'number',
                    autoFocus: true,
                    required: true,
                  }}
                />
              </Box>
            )}
            <Typography fontWeight={500} fontSize={'1.4rem'}>
              Hiện tại Nhà hàng Phố Biển chỉ giao hàng tại {districts.map((d) => d.name).join(', ')} trong {tphcm.name}.
            </Typography>
            <Box
              sx={{
                marginTop: '15px',
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                flexDirection: { 0: 'column', 768: 'row' },
              }}
            >
              <MyTextField
                props={{
                  required: true,
                  size: 'small',
                  label: 'Tỉnh/Thành Phố',
                  name: 'provine',
                  type: 'text',
                  id: 'provine',
                  defaultValue: 'TP. Hồ Chí Minh',
                  inputProps: { readOnly: true },
                }}
              />

              {/* <DropDown
                dropList={districts.map((district) => district.name)}
                result={districtSelect}
                setResult={setDistrictSelect}
              /> */}

              {/* <DropDown dropList={wardList.map((ward) => ward.name)} result={wardSelect} setResult={setWardSelect} /> */}
            </Box>

            {/* <DropDown
              input={{
                status: true,
                inputLabel: 'Nhập địa chỉ',
                setSearchValue: setSearchValue,
                searchValue: searchValue,
              }}
              dropList={addressList}
              result={addressSelect}
              setResult={setAddressSelect}
            /> */}

            {/* {isLoaded && (
              <GoogleMap mapContainerStyle={{ height: '500px', width: '100%' }} center={position} zoom={20}>
                <MarkerF
                  position={updateModel.receiver ? receiver.position : position}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                />
              </GoogleMap>
            )} */}

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
              <Button className="action" onClick={() => {}}>
                Xác nhận
              </Button>
            </Box>
          </form>
        </Box>
      </Snackbar>
    </Box>
  );
};

export default ReceiverUpdate;
