'use client';
import useDebounce from '@/hook/useDebounce';
import { Box } from '@mui/material';
import { GoogleMap, Libraries, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface IMyGoogleMap {
  viewOnly?: boolean;
  searchValue: string;
  location?: { lat: number; lng: number };
  addressSelect?: string;
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>> | (() => void);
  setAddressSelect: React.Dispatch<React.SetStateAction<string>>;
  setAddressList?: React.Dispatch<React.SetStateAction<string[]>>;
  setError: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function MyGoogleMap({
  searchValue,
  location,
  setLocation,
  viewOnly = false,
  setAddressList,
  setError,
}: IMyGoogleMap) {
  //

  //
  const debounce = useDebounce(searchValue as string, 500);
  const [libraries] = useState<Libraries>(['places']);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const GOONG_API_KEY = process.env.REACT_APP_GOONG_API_KEY;
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const p1 = e.latLng;
    if (p1) {
      const lat = p1.lat() as number;
      const lng = p1.lng() as number;
      setLocation({ lat, lng });
    }
  };

  useEffect(() => {
    if (!debounce || !debounce.trim()) {
      if (setAddressList) setAddressList([]);
      return;
    }

    const url = `https://rsapi.goong.io/geocode?address=${debounce}&api_key=${GOONG_API_KEY}`;
    axios
      .get(url)
      .then((res) => {
        const allAddress = res.data.results as any[];
        const allAddressInHCM = allAddress.filter((item) => item.formatted_address.includes('Hồ Chí Minh'));
        if (setAddressList) setAddressList([debounce, ...allAddressInHCM.map((item) => item.formatted_address)]);
        const location = allAddressInHCM.length ? allAddressInHCM[0]?.geometry?.location : null;
        setLocation(location);
        setError(null);
        return;
      })
      .catch(() => {
        setError(true);
        return;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  return (
    <Box>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '500px', width: '100%', border: '1px solid #00000022' }}
          center={location}
          zoom={15}
        >
          <MarkerF
            position={
              location
                ? location
                : {
                    lat: 10.78803816266225,
                    lng: 106.69775639053384,
                  }
            }
            draggable
            onDragEnd={viewOnly ? undefined : handleMarkerDragEnd}
          />
        </GoogleMap>
      )}
    </Box>
  );
}
