import Button from '@/components/Button/Button';
import { useMyContext } from '@/context/context';
import { ISetState, IUser } from '@/interface/interface';
import dateTimeFormate from '@/utils/dateTimeFormate';
import { deleteUserApi } from '@/utils/services/api/userApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';

interface IRow {
  user: IUser;
  STT: number;
  setEdit: ISetState<{ stt: boolean; value?: IUser }>;
}

export default function Row({ user, STT, setEdit }: IRow) {
  const { id, phoneNumber, gender, place, name, role, email, createdAt } = user;
  const { currentUser } = useMyContext();
  const [open, setOpen] = useState(false);
  const { auth, setLoading, emitEvent } = useMyContext();

  const handleDelete = async () => {
    if (setLoading) setLoading({ loading: true });
    try {
      if (confirm('Delete confirmation')) {
        const deleteUser = await deleteUserApi(id, auth?.token as string);
        if (!deleteUser.data.error) {
          if (emitEvent) emitEvent('deleteUser', id);
        }
        //     const userId = id;
        //     socket.emit('deleteUser', userId);
        //     let message, status;
        //     if (result.error) {
        //       message = result.error;
        //       status = 'error';
        //     } else {
        //       message = result.message;
        //       status = 'success';
        //     }
        //     setLoading(false);
        //     // enqueueSnackbar(message, { status });
        //     setSnackbar({ open: true, message, status });
        //   })
        //   .catch((e) => {
        //     setLoading(false);
        //     setSnackbar({ open: true, message: 'unknow error', status: 'error' });
        //   });
      }
    } catch (error) {
    } finally {
      if (setLoading) setLoading({ loading: false });
    }

    // eslint-disable-next-line no-restricted-globals
  };

  return (
    <>
      <TableRow
        onClick={() => {
          setOpen(!open);
        }}
        sx={{
          cursor: 'pointer',
          backgroundImage: 'linear-gradient(#dfdfdf 0%, #fff 28%)',
          borderBottom: '1px solid #0000000a',
          '& > *': { borderBottom: 'unset' },
        }}
      >
        <TableCell sx={{ width: '35px' }} align="center">
          {STT}
        </TableCell>
        <TableCell component="th" scope="row">
          {email}
        </TableCell>
        <TableCell align="center">{`${name}`}</TableCell>
        <TableCell align="center">{role}</TableCell>
        <TableCell align="center">{dateTimeFormate(createdAt)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingLeft: '5vh' }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ width: '130px' }}>
                      Phone number
                    </TableCell>
                    <TableCell align="center" sx={{ width: '80px' }}>
                      Gender
                    </TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell sx={{ width: '100px' }} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" sx={{ paddingLeft: '1vh' }} component="th" scope="row">
                      {phoneNumber}
                    </TableCell>
                    <TableCell align="center">{gender}</TableCell>
                    <TableCell align="right">
                      {(() => {
                        if (place) {
                          const address = JSON.parse(place);
                          return `${address?.address}, ${address?.ward}, ${address?.district}, ${address?.province}`;
                        } else {
                          return ``;
                        }
                      })()}
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        justifyContent={'center'}
                        sx={{
                          display: 'flex',
                          '& .icon': {
                            fontSize: '1.8rem !important',
                          },
                          gap: '5px',
                        }}
                      >
                        {(role === 'Root' && currentUser?.id !== id) ||
                        (role === 'Admin' && currentUser?.id !== id && currentUser?.role === 'Admin') ? (
                          <Button primary style={{ borderRadius: '3px', padding: '5px', backgroundColor: 'orange' }}>
                            <EditIcon className="icon" />
                          </Button>
                        ) : (
                          <Button
                            primary
                            style={{ borderRadius: '3px', padding: '5px', backgroundColor: 'orange' }}
                            onClick={() => {
                              setEdit({ stt: true, value: user });
                            }}
                          >
                            <EditIcon className="icon" />
                          </Button>
                        )}
                        {role === 'Root' || (role === 'Admin' && currentUser?.role !== 'Root') ? (
                          <Button primary style={{ borderRadius: '3px', padding: '5px' }} disable>
                            <DeleteIcon className="icon" />
                          </Button>
                        ) : (
                          <Button primary style={{ borderRadius: '3px', padding: '5px' }} onClick={handleDelete}>
                            <DeleteIcon className="icon" />
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
