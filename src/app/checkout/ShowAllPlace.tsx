import Button from '@/components/Button/Button';
import { IPlace } from '@/context/context';
import { myColors } from '@/styles/color';
import { Box, FormControlLabel, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';
import AddPlace from './AddPlace';
import EditPlace from './EditPlace';

export interface IPlaceUpdate {
  allPlace: IPlace[] | null;
  setPlaceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectPlace: React.Dispatch<React.SetStateAction<IPlace | null>>;
  selectPlace: IPlace | null;
}
const ShowAllPlace = ({ allPlace, setPlaceUpdate, setSelectPlace, selectPlace }: IPlaceUpdate) => {
  const [addressIdSelect, setAddressIdSelect] = useState<string>(() => {
    if (selectPlace) return selectPlace.place_id as string;
    else {
      const slPlace = allPlace ? allPlace.filter((place) => place.primary === true) : '';
      return slPlace ? (slPlace[0].place_id as string) : '';
    }
  });
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<{ stt: boolean; place: IPlace }>({ stt: false, place: {} });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressIdSelect(e.target.value);
  };

  const handleEdit = (id: string) => {
    if (!allPlace) return;
    const slPlace = allPlace.filter((place) => place.place_id === id);
    setEdit({ stt: true, place: slPlace[0] });
    return;
  };

  const changeAddress = () => {
    if (!allPlace) return;
    const selectPlace = allPlace.filter((place) => place.place_id === addressIdSelect);
    setSelectPlace(selectPlace[0]);
    setPlaceUpdate(false);
  };

  return (
    <>
      <Snackbar
        open
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
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
            boxShadow: '0 0 10px 5px #00000012',
            maxHeight: '80vh',
            minHeight: '100px',
            width: '100%',
            maxWidth: '768px',
            position: 'relative',
            minWidth: '320px',
            overflow: 'scroll',
            '.updateForm': { padding: { xs: '10px', md: '20px 30px' } },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: 2,
              p: '20px 10px',
              height: '100%',
            }}
          >
            <Box
              sx={{
                zIndex: 2,
                position: 'sticky',
                top: { xs: '10px', md: '20px' },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: myColors.white,
                pb: '10px',
                borderBottom: '1px solid #00000022',
              }}
            >
              <Typography variant="h5" color={myColors.primary} fontWeight={600}>
                Danh sách địa chỉ
              </Typography>
              <Button
                onClick={() => setAdd(true)}
                outline
                style={{ padding: '5px 10px', fontWeight: 500, width: 'fit-content', borderRadius: '0' }}
              >
                Thêm địa chỉ
              </Button>
            </Box>
            <RadioGroup
              sx={{
                display: 'flex',
                gap: '5px',
                color: '#333',
                '& label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd': {
                  margin: 0,
                  p: '5px 0',
                },
                '& .MuiRadio-root.Mui-checked': { color: '#333' },
              }}
              onChange={handleChange}
              value={addressIdSelect}
              row
              aria-labelledby="payment-methods"
              name="payment-methods"
            >
              {allPlace
                ?.sort((a, b) => {
                  if (a.primary === true) return -1;
                  if (b.primary === true) return 1;
                  return (a.place_id as unknown as number) - (b.place_id as unknown as number);
                })
                ?.map((place, i) => {
                  const { address, name, phoneNumber, primary, place_id } = place;
                  return (
                    <Box key={i} sx={{ width: '100%', display: 'flex' }}>
                      <FormControlLabel
                        label={
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                              <Box>
                                <Typography>{`${name} - ${phoneNumber}  `}</Typography>
                              </Box>
                              {primary && (
                                <Typography
                                  sx={{
                                    p: '1px 2px',
                                    width: 'fit-content',
                                    border: `1px solid ${myColors.primary}`,
                                    color: myColors.primary,
                                  }}
                                >
                                  Mặc định
                                </Typography>
                              )}
                            </Box>
                            <Typography>{`Địa chỉ : ${address}`}</Typography>
                          </>
                        }
                        sx={{
                          border: '1px solid #00000022',
                          width: '100%',
                          '& p': { fontWeight: 500 },
                          position: 'relative',
                        }}
                        value={place_id}
                        control={<Radio />}
                      />
                      <Button
                        onClick={() => handleEdit(place_id as string)}
                        style={{ height: '100%', borderRadius: '0' }}
                        primary
                      >
                        Chỉnh sửa
                      </Button>
                    </Box>
                  );
                })}
            </RadioGroup>

            <Box sx={{ m: '10px auto' }}>
              <Button
                onClick={changeAddress}
                outline
                style={{ padding: '5px 10px', fontWeight: 500, width: 'fit-content', borderRadius: '0' }}
              >
                Xác nhận
              </Button>
              <Button
                onClick={() => setPlaceUpdate(false)}
                primary
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  fontWeight: 500,
                  width: 'fit-content',
                  borderRadius: '0',
                }}
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Box>
      </Snackbar>
      {add && <AddPlace setAdd={setAdd} allPlace={allPlace} />}
      {edit?.stt && <EditPlace setEdit={setEdit} allPlace={allPlace} edit={edit} />}
    </>
  );
};

export default memo(ShowAllPlace);
