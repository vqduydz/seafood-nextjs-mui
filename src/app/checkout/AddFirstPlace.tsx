import Button from '@/components/Button/Button';
import { IPlace, useMyContext } from '@/context/context';
import useDebounce from '@/hook/useDebounce';
import capitalize from '@/utils/capitalize';
import { Box, Snackbar, Typography } from '@mui/material';
import { GoogleMap, Libraries, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { FormEvent, memo, useEffect, useState } from 'react';

import DropDown from '@/components/Dropdown/Dropdown';
import { login } from '@/lib/redux/features/authSlices';
import { useAppDispatch } from '@/lib/redux/store';
import { updateUserApi } from '@/utils/services/api/userApi';

const AddFirstPlace = () => {
  const dispatch = useAppDispatch();
  const { currentUser, auth } = useMyContext();
  const [libraries] = useState<Libraries>(['places']);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });
  const [searchValue, setSearchValue] = useState<string>('');
  const debounce = useDebounce(searchValue, 500);
  const [addressList, setAddressList] = useState<string[]>([]);
  const [addressSelect, setAddressSelect] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 10.78803816266225,
    lng: 106.69775639053384,
  });
  const [place, setPlace] = useState<IPlace>({
    name: currentUser ? currentUser?.name : '',
    phoneNumber: currentUser ? currentUser?.phoneNumber : '',
    primary: true,
  });

  useEffect(() => {
    setPlace({ ...place, address: addressSelect, location });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressSelect, location]);

  const GOONG_API_KEY = process.env.REACT_APP_GOONG_API_KEY;
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const p1 = e.latLng;
    if (p1) {
      const lat = p1.lat() as number;
      const lng = p1.lng() as number;
      setLocation({ lat, lng });
    }
  };
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const FPlace = { ...place, place_id: Date.now().toString() } as IPlace;
      const dataUpdate = {
        id: currentUser?.id as string | number,
        place: JSON.stringify([FPlace]),
      };
      console.log({ dataUpdate });

      const res = await updateUserApi(dataUpdate, auth?.token as string);
      if (res.data && !res.data.error) {
        dispatch(login(auth?.token as string));
        return;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  // map
  useEffect(() => {
    if (!debounce.trim()) return;
    const url = `https://rsapi.goong.io/geocode?address=${debounce}&api_key=${GOONG_API_KEY}`;
    axios.get(url).then((res) => {
      const location = res.data.results[0].geometry.location;
      const allAddress = res.data.results as any[];
      const allAddressInHCM = allAddress.filter((item) => item.formatted_address.includes('Hồ Chí Minh'));
      setAddressList([searchValue, ...allAddressInHCM.map((item) => item.formatted_address)]);
      setLocation(location);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

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
          onSubmit={handleUpdate}
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

          <DropDown
            input={{
              isAddress: true,
              inputLabel: 'Nhập địa chỉ',
              setSearchValue: setSearchValue,
              // searchValue: updateModel.receiver ? searchValue : addressSelect,
              searchValue: searchValue,
            }}
            dropList={addressList}
            result={addressSelect}
            setResult={setAddressSelect}
            style={{ marginBottom: '10px' }}
          />

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ height: '500px', width: '100%', border: '1px solid #00000022' }}
              center={location}
              zoom={15}
            >
              <MarkerF position={location} draggable onDragEnd={handleMarkerDragEnd} />
            </GoogleMap>
          )}

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
          </Box>
        </form>
      </Box>
    </Snackbar>
  );
};

export default memo(AddFirstPlace);
