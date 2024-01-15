import Box from '@mui/material/Box';
import { useState } from 'react';

import Button from '@/components/Button/Button';
import DropDown from '@/components/Dropdown/Dropdown';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { ISetState, ISubmitForm, IUser } from '@/interface/interface';
import { myColors } from '@/styles/color';
import capitalize from '@/utils/capitalize';
import { updateUserApi } from '@/utils/services/api/userApi';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

interface IEditUser {
  edit: { stt: boolean; value?: IUser };
  setEdit: ISetState<{ stt: boolean; value?: IUser }>;
  load: boolean;
  setLoad: ISetState<boolean>;
}

export default function EditUser({ edit, setEdit, load, setLoad }: IEditUser) {
  const [editPass, setEditPass] = useState<boolean>(false);
  const { auth } = useMyContext();
  const [error, setError] = useState<string | null>(null);
  const { value } = edit;
  const { id, name, phoneNumber, gender, role, email } = value as IUser;
  const [roleSelect, setRoleSelect] = useState(role);
  const [genderSelect, setGenderSelect] = useState(gender);
  const roleList = ['Root', 'Admin', 'Manage', 'Deliver', 'Customer'];
  const genderList = ['Female', 'Male', 'Other'];

  const handleSubmit = async (event: ISubmitForm) => {
    event.preventDefault();
    setError(null);
    setLoad(true);
    const data = new FormData(event.currentTarget);
    const dataUpdate = editPass
      ? {
          id,
          name: capitalize(`${data.get('firstName') as string} ${data.get('lastName') as string}`),
          password: data.get('password') as string,
          confirmpassword: data.get('confirmPassword') as string,
          phoneNumber: data.get('phoneNumber') as string,
          address: data.get('address') as string,
          role: roleSelect,
          gender: genderSelect,
        }
      : {
          id,
          name: capitalize(`${data.get('firstName') as string} ${data.get('lastName') as string}`),
          phoneNumber: data.get('phoneNumber') as string,
          address: data.get('address') as string,
          role: roleSelect,
          gender: genderSelect,
        };

    if (dataUpdate.password != dataUpdate.confirmpassword) {
      setLoad(false);
      setError('Xác nhận mật khẩu không trùng khớp !');
      return;
    }

    const res = await updateUserApi(dataUpdate, auth?.token as string);

    if (res.data && res.data.error) {
      setLoad(false);
      setError(res.data.error);
      return;
    }
    setLoad(false);
    setEdit({ stt: false });
  };

  // const checkCurrentRole = (roles = []) => roles.includes(currentUser?.role);
  // const checkRole = (roles = []) => roles.includes(role);

  const textFields = [
    { name: 'firstName', label: 'Họ', id: 'firstName', defaultValue: `${capitalize(name.split(' ')[0])}` },
    { name: 'lastName', label: 'Tên', id: 'lastName', type: '', defaultValue: `${capitalize(name.split(' ')[1])}` },
    { name: 'phoneNumber', label: 'Số điện thoại', id: 'phoneNumber', type: 'number', defaultValue: phoneNumber },
  ];
  const passTextFields = [
    { name: 'password', label: 'Mật khẩu', id: 'password', type: 'password' },
    { name: 'confirmPassword', label: 'Xác nhận lại mật khẩu', id: 'confirmPassword', type: 'password' },
  ];
  return (
    <Box>
      <Box
        sx={{
          borderRadius: '6px',
          padding: '20px',
          width: '680px',
          margin: '0 auto',
          backgroundColor: '#fff',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          '& .inner': {},
        }}
      >
        <Typography color={'gray'} fontWeight={500} fontSize={'2.4rem'}>
          {`Chỉnh sửa "${value?.email}"`}
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            className="inner"
            sx={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: 'repeat( 3, minmax(200px, 1fr))',
            }}
          >
            {textFields.map((item) => {
              const { id, label, name, type, defaultValue } = item;
              return (
                <MyTextField
                  key={item.id}
                  center={false}
                  props={{
                    size: 'small',
                    name,
                    label,
                    id,
                    type: type ? type : 'text',
                    defaultValue: defaultValue ? defaultValue : '',
                  }}
                />
              );
            })}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: 'repeat( 2, minmax(200px, 1fr))',
              mb: '15px',
            }}
          >
            <DropDown
              dropList={genderList}
              result={genderSelect}
              setResult={setGenderSelect}
              input={{ inputLabel: 'Gender' }}
            />
            <DropDown
              dropList={roleList}
              result={roleSelect}
              setResult={setRoleSelect}
              input={{ inputLabel: 'Role' }}
            />
          </Box>
          <FormControlLabel
            sx={{
              p: '0!important',
              m: '0!important',
              '*': { p: '0!important', display: 'flex', justifyContent: 'center' },
            }}
            label="Cập nhật mật khẩu"
            control={<Checkbox sx={{ m: '0 5px 0 0' }} onChange={(e, checked) => setEditPass(checked)} />}
          />

          {editPass && (
            <Box
              className="inner"
              sx={{
                display: 'grid',
                gap: '10px',
                gridTemplateColumns: 'repeat( 2, minmax(200px, 1fr))',
              }}
            >
              {passTextFields.map((item) => {
                const { id, label, name, type } = item;
                return (
                  <MyTextField
                    key={item.id}
                    center={false}
                    props={{
                      size: 'small',
                      name,
                      label,
                      id,
                      type: type ? type : 'text',
                    }}
                  />
                );
              })}
            </Box>
          )}
          <Box sx={{ mt: '5px', height: '20px', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Box
              sx={{ height: '1px', backgroundColor: error ? myColors.primary : myColors.secondary, width: '100%' }}
            />
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
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              mt: '15px',
              display: 'flex',
              justifyContent: 'end',
              gap: '10px',
            }}
          >
            <Button primary type="submit">
              Xác nhận
            </Button>
            <Button outline onClick={() => setEdit({ stt: false })} type="button">
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
