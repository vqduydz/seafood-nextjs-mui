'use client';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// import { Button, PaginationCustom, SearchBox } from '_/components/common';
// import { useThemMui } from '_/context/ThemeMuiContext';
// import useDebounce from '_/hook/useDebounce';
// import { getUser } from '_/redux/slices';
// import { gmailFiller } from '_/utills';
// import FileUpload from '../FileUpload';
// import CreateNewUser from './CreateNewUser';
import Button from '@/components/Button/Button';
import PaginationCustom from '@/components/PaginationCustom/PaginationCustom';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useMyContext } from '@/context/context';
import useDebounce from '@/hook/useDebounce';
import { IUser } from '@/interface/interface';
import gmailFiller from '@/utils/gmailFiller';
import { getUserApi } from '@/utils/services/api/userApi';
import Row from './Row';
import CreateNewUser from './CreateNewUser';
import EditUser from './EditUser';
import Loading from '@/components/Loading/Loading';
import FileUpload from '../FileUpload';

export default function UserManage() {
  const [edit, setEdit] = useState<{ stt: boolean; value?: IUser }>({ stt: false });
  const [addUser, setAddUser] = useState<boolean>(false);
  const [overLay, setOverLay] = useState(false);
  const { auth, loading } = useMyContext();
  const [upload, setUpload] = useState<boolean>(false);
  const [tab, setTab] = useState({ index: 0, role: '', content: '' });
  const { index, role, content } = tab;
  const [searchValue, setSearchValue] = useState('');
  const debounce = useDebounce(searchValue, 500);
  const [page, setPage] = useState(1);
  const [limit_per_page, setlimit_per_page] = useState(20);
  const [allUser, setAllUser] = useState({ items: [], totalPages: 1, limitPerPage: limit_per_page });
  const { items, totalPages, limitPerPage } = allUser;
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (!addUser && !edit.stt) {
      setOverLay(false);
      return;
    }
    setOverLay(true);
  }, [addUser, edit.stt]);

  useEffect(() => {
    const query = !debounce.trim()
      ? { page, limit_per_page, role }
      : { page, limit_per_page, role, email: gmailFiller(debounce) };
    if (debounce.trim()) {
      setLoad(true);
    }

    (async () => {
      const getUser = (await getUserApi(query, auth?.token as string)).data;
      if (getUser) setLoad(false);
      setAllUser({
        items: getUser.users,
        totalPages: getUser.totalPages,
        limitPerPage: getUser.limit_per_page,
      });
    })();

    console.log(load);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, page, limit_per_page, content, load]);

  useEffect(() => {
    setPage(1);
  }, [limit_per_page, index, debounce]);

  const btnContent = [
    { index: 0, role: '', content: 'Tất cả', color: 'green' },
    { index: 1, role: 'Root', content: 'Root', color: '#ed6c02' },
    { index: 2, role: 'Admin', content: 'Admin', color: '#0288d1' },
    { index: 3, role: 'Manage', content: 'Quản lý', color: '#0a66b7' },
    { index: 4, role: 'Deliver', content: 'Người giao hàng', color: 'green' },
    { index: 5, role: 'Customer', content: 'Khách hàng', color: '#fe2c55' },
  ];

  const render = () => {
    return items.length > 0 ? (
      <Table
        sx={{
          width: '100%',
          '& th': {
            '& +th': { borderLeft: '1px solid #00000024' },
            '& +td': { borderLeft: '1px solid #00000024' },
          },
          '& td': {
            '& +td': { borderLeft: '1px solid #00000024' },
            '& +th': { borderLeft: '1px solid #00000024' },
          },

          '& span.Mui-checked , span.MuiCheckbox-indeterminate': {
            color: '#333 !important ',
          },
          '& *': {
            '& .MuiTableCell-root': {
              padding: '10px 5px',
              borderBottomColor: '#00000024',
            },
          },
        }}
        aria-label="collapsible table"
      >
        <TableHead
          sx={{
            backgroundColor: '#f9f9f9',
            '& *': { fontWeight: '700 !important' },
            position: 'sticky',
            top: '137px',
            zIndex: 1,
          }}
        >
          <TableRow>
            <TableCell align="center" sx={{ width: '45px' }}>
              STT
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell sx={{ width: '200px' }} align="center">
              Tên
            </TableCell>
            <TableCell sx={{ width: '100px' }} align="center">
              Quyền
            </TableCell>
            <TableCell sx={{ width: '160px' }} align="center">
              Ngày tạo
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((user, index) => {
            return (
              <Row
                setEdit={setEdit}
                key={index}
                user={user}
                STT={page > 1 ? (page - 1) * limitPerPage + (index + 1) : index + 1}
              />
            );
          })}
        </TableBody>
      </Table>
    ) : searchValue ? (
      <Box
        sx={{
          padding: '40px 0 60px 0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Typography fontSize={'2rem'} fontWeight={700} color={'grey'}>
          {`Không có email trùng khớp với "${searchValue}"`}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          padding: '40px 0 60px 0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Typography fontSize={'2rem'} fontWeight={700} color={'grey'}>
          {`Hiện tại không có "${content.toLowerCase()}"`}
        </Typography>
      </Box>
    );
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          position: 'sticky',
          top: '56px',
          zIndex: 1,
          mb: '1vh',
          backgroundColor: '#fff',
        }}
      >
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          loading={load}
          placeholder="Tìm user theo email ..."
          handleCreate={setAddUser}
          handleImport={setUpload}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '5px',
          justifyContent: 'start',
          padding: '5px 10px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #eee',
          position: 'sticky',
          top: '96px',
          zIndex: 1,
          mb: '1vh',
        }}
      >
        {btnContent.map((btn) => (
          <Button
            key={btn.index}
            text
            style={{
              padding: '5px',
              color: btn.color,
              borderBottom: btn.index === index ? `2px solid ${btn.color}` : '2px solid transparent',
            }}
            onClick={() => setTab({ index: btn.index, role: btn.role, content: btn.content })}
          >
            {btn.content}
          </Button>
        ))}
      </Box>

      {render()}

      <PaginationCustom
        limit_per_page={limit_per_page}
        setlimit_per_page={setlimit_per_page}
        total_page={totalPages}
        page={page}
        setPage={setPage}
      />

      {(overLay || edit.stt || addUser || upload) && (
        <Box sx={{ zIndex: 3, backgroundColor: '#212121', position: 'relative' }}>
          {overLay && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                opacity: 0.6,
                transition: 'bottom 0.3s linear 0s',
                backgroundColor: '#212121',
              }}
            />
          )}
          {edit.stt && <EditUser load={load} setLoad={setLoad} setEdit={setEdit} edit={edit} />}
          {addUser && <CreateNewUser load={load} setLoad={setLoad} setAddUser={setAddUser} />}
          {upload && <FileUpload setLoad={setLoad} setUpload={setUpload} users />}
        </Box>
      )}
      {load && <Loading />}
    </Box>
  );
}
