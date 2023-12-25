import { useAppSelector } from '@/lib/redux/store';
import capitalize from '@/utils/capitalize';
import { Avatar } from '@mui/material';
import { jwtDecode } from 'node_modules/jwt-decode/build/cjs';
import { CSSProperties, useEffect, useState } from 'react';

interface Props {
  sx?: CSSProperties;
}

interface IcurrentUser {
  id: number | null;
  email: string | null;
  name: string;
  phoneNumber: string | null;
  gender: string | null;
  address: string | null;
  location: string | null;
  avatar: string | null;
  role: string | null;
  birthday: string | null;
  createdAt: string | null;
}

function UserAvatar(sx: Props) {
  const [currentUser, setCurrentUser] = useState<IcurrentUser>();
  const currentUserToken = useAppSelector((state) => state.auth.currentUser) as string;

  useEffect(() => {
    if (currentUserToken) {
      const decodedToken = jwtDecode(currentUserToken) as IcurrentUser;
      setCurrentUser(decodedToken);
    }
  }, [currentUserToken]);

  if (!currentUser) return;
  function stringToColor(name: string) {
    let hash = 0;
    let i;

    if (name) {
      for (i = 0; i < name.length; i += 1) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';

      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      return color;
    }
  }

  function stringAvatar(name: string) {
    if (name) {
      return {
        children: name.includes(' ')
          ? `${capitalize(name.split(' ')[0][0])}${capitalize(name.split(' ')[1][0])}`
          : `${capitalize(name.split(' ')[0][0])}`,
      };
    }
  }
  if (!currentUser) return;

  return currentUser?.avatar ? (
    <Avatar alt={currentUser?.name} src={currentUser?.avatar} sx={{ ...sx }} />
  ) : (
    <Avatar
      {...stringAvatar(currentUser?.name)}
      sx={{ backgroundColor: stringToColor(currentUser?.name), color: '#fff', ...sx }}
    />
  );
}

export default UserAvatar;
