import Button from '@/components/Button/Button';
import DropDown from '@/components/Dropdown/Dropdown';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { ISetState, ISubmitForm } from '@/interface/interface';
import { myColors } from '@/styles/color';
import capitalize from '@/utils/capitalize';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import { createNewUserApi } from '@/utils/services/api/userApi';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function CreateNewUser({
  load,
  setLoad,
  setAddUser,
}: {
  setAddUser: ISetState<boolean>;
  load: boolean;
  setLoad: ISetState<boolean>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [roleSelect, setRoleSelect] = useState('Customer');
  const [genderSelect, setGenderSelect] = useState('Female');
  const roleList = ['Root', 'Admin', 'Manage', 'Deliver', 'Customer'];
  const genderList = ['Female', 'Male', 'Other'];
  const { enqueueSnackbar } = useMyContext();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleSubmit = async (event: ISubmitForm) => {
    event.preventDefault();
    setError(null);
    setLoad(true);
    const data = new FormData(event.currentTarget);
    const dataUser = {
      name: capitalize(`${data.get('firstName') as string} ${data.get('lastName') as string}`),
      email: (data.get('email') as string).toLowerCase(),
      password: data.get('password') as string,
      confirmpassword: data.get('confirmPassword') as string,
      phoneNumber: data.get('phoneNumber') as string,
      address: data.get('address') as string,
      role: roleSelect,
      gender: genderSelect,
    };
    if (dataUser.password != dataUser.confirmpassword) {
      setLoad(false);
      setError('Xác nhận mật khẩu không trùng khớp !');
      return;
    }
    const respone = await createNewUserApi(dataUser);
    if (respone.data.error) return setError(respone.data.error);
    if (enqueueSnackbar) enqueueSnackbar(respone.data, { variant: 'success' });
    setLoad(false);
    setAddUser(false);
  };

  const textFields = [
    { name: 'firstName', label: 'Họ', id: 'firstName', value: firstName, onChange: setFirstName },
    { name: 'lastName', label: 'Tên', id: 'lastName', value: lastName, onChange: setLastName },
    { name: 'email', label: 'Email', id: 'email', type: 'email', autoComplete: 'email' },
    { name: 'phoneNumber', label: 'Số điện thoại', id: 'phoneNumber', type: 'number' },
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
          '& .inner': { m: 0 },
        }}
      >
        <Typography color={'gray'} fontWeight={500} fontSize={'2.4rem'}>
          Tạo mới
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px', display: 'flex', flexDirection: 'column' }}>
          <Box
            className="inner"
            sx={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: 'repeat( 2, minmax(200px, 1fr))',
            }}
          >
            {textFields.map((item) => {
              const { id, label, name, type, autoComplete, onChange, value } = item;

              return name === 'firstName' || name === 'lastName' ? (
                <MyTextField
                  key={item.id}
                  center={false}
                  props={{
                    size: 'small',
                    name,
                    label,
                    id,
                    autoComplete: autoComplete ? autoComplete : 'off',
                    type: type ? type : 'text',
                    value: value ? value : '',
                    onChange: onChange
                      ? (e) => {
                          const value = (e.target.value as string).replace(/ /g, '');
                          onChange(value);
                        }
                      : undefined,
                  }}
                />
              ) : (
                <MyTextField
                  key={item.id}
                  center={false}
                  props={{
                    size: 'small',
                    name,
                    label,
                    id,
                    autoComplete: autoComplete ? autoComplete : 'off',
                    type: type ? type : 'text',
                  }}
                />
              );
            })}
          </Box>
          <Box sx={{ mt: '15px', height: '20px', display: 'flex', alignItems: 'center', position: 'relative' }}>
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
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: 'repeat( 2, minmax(200px, 1fr))',
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
            <Button outline onClick={() => setAddUser(false)} type="button">
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
