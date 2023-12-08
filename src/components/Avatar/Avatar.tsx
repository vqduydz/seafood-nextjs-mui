import { Avatar } from '@mui/material';
import { CSSProperties } from 'react';
// import { useAuth } from '_/context/AuthContext';

interface Props {
  sx?: CSSProperties;
}

function UserAvatar({ sx }: Props) {
  // const { currentUser } = useAuth();

  let currentUser = { photoURL: '', avatarUrl: '', firstName: 'a', lastName: 'd' };

  if (!currentUser) return;
  function stringToColor(name: string) {
    let hash = 0;
    let i;

    if (name) {
      /* eslint-disable no-bitwise */
      for (i = 0; i < name.length; i += 1) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';

      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
    }
  }

  function stringAvatar(name: string) {
    if (name) {
      return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
  }

  if (!currentUser) return;
  const { photoURL, avatarUrl, firstName, lastName } = currentUser;
  const displayName = lastName
    ? firstName + ' ' + lastName
    : firstName.split(' ')[0][0] + ' ' + firstName.split(' ')[0][1];
  return photoURL || avatarUrl ? (
    <Avatar alt={displayName} src={avatarUrl ? avatarUrl : photoURL} sx={sx} />
  ) : (
    <Avatar {...stringAvatar(displayName)} sx={{ backgroundColor: stringToColor(displayName), color: '#fff', ...sx }} />
  );
}

export default UserAvatar;
