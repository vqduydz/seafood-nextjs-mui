'use client';
import Button from '@/components/Button/Button';
import PaginationCustom from '@/components/PaginationCustom/PaginationCustom';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useMyContext } from '@/context/context';
import useDebounce from '@/hook/useDebounce';
import { IMenuGet } from '@/interface/interface';
import { myColors } from '@/styles/color';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import renderPrice from '@/utils/renderPrice';
import { catalogApi } from '@/utils/services/api/catalogApi';
import { deleteMenuApi, menuApi } from '@/utils/services/api/menuApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import CreateNewMenu from './CreateNewMenu';
import EditMenu from './EditMenu';
import FileUpload from '../FileUpload';

export default function MenuManage() {
  const { auth } = useMyContext();
  const [edit, setEdit] = useState<{ stt: boolean; value?: IMenuGet }>({ stt: false });
  const [addMenu, setAddMenu] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);
  const [overLay, setOverLay] = useState(false);
  const [page, setPage] = useState(1);
  const [limit_per_page, setlimit_per_page] = useState(10);
  const [menus, setMenus] = useState<{
    items: IMenuGet[];
    imagePath: string;
    totalPages: number;
    limitPerPage: number;
  }>({
    items: [],
    imagePath: '',
    totalPages: 1,
    limitPerPage: limit_per_page,
  });
  const { items, imagePath, totalPages, limitPerPage } = menus;
  const [catalogs, setCatalogs] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const debounce = useDebounce(searchValue, 500);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!addMenu && !edit.stt) {
      setOverLay(false);
      return;
    }
    setOverLay(true);
  }, [addMenu, edit?.stt]);

  useEffect(() => {
    const query = !debounce.trim()
      ? { page, limit_per_page }
      : { page, limit_per_page, name: (removeVietnameseTones(debounce) as string).toLowerCase().replace(/ /g, '-') };
    if (debounce.trim()) setLoad(true);
    (async () => {
      const res = await menuApi(query);
      if (res.data && res.data.error) {
        console.log(res.data.error);
        return;
      }
      const { menus, imagePath, totalPages, limit_per_page } = res.data;
      setMenus({
        items: menus,
        imagePath: imagePath,
        totalPages: totalPages,
        limitPerPage: limit_per_page,
      });
      setLoading(false);
    })();

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit_per_page, debounce, load]);

  useEffect(() => {
    catalogApi()
      .then((res) => {
        const catalogs = res.data.catalogsWithMenus as any[];
        const cataloglist = catalogs.map((catalog) => catalog.name);
        setCatalogs(cataloglist);
      })
      .catch((error) => {
        console.log({ error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [limit_per_page, debounce]);

  const handleDelete = async (id: number) => {
    if (confirm('Delete confirmation')) {
      try {
        setLoad(true);
        const res = await deleteMenuApi(id, auth?.token as string);
        if (res.data.error) enqueueSnackbar(res.data.error, { variant: 'error' });
        enqueueSnackbar(res.data, { variant: 'success' });
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    }
  };

  const render = () => {
    return items.map((item, index) => {
      const { id, slug, name, catalog, price, max_order, unit, image } = item;
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            padding: '5px',
            backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5',
            border: '1px solid #0000000a',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& p': {
              fontWeight: 500,
            },
          }}
        >
          <Box
            sx={{
              gap: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ minWidth: '30px' }} textAlign={'center'}>
              {page > 1 ? (page - 1) * limitPerPage + (index + 1) : index + 1}
            </Typography>
            <Box
              sx={{
                backgroundImage: `url(${imagePath}${image})`,
                minWidth: '80px',
                height: '50px',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                '& *': { wordWrap: 'break-word' },
              }}
            >
              <Typography fontSize={'1.6rem'} sx={{ textAlign: 'left', color: myColors.secondary, fontWeight: 500 }}>
                {name}
              </Typography>
              <Typography fontStyle={'italic'} fontSize={'1.2rem'} color={myColors.primary} sx={{ textAlign: 'left' }}>
                {catalog}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              gap: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ width: '80px' }} textAlign={'center'} color={myColors.primary}>
              {renderPrice(price)}
            </Typography>
            <Typography sx={{ width: '40px' }} textAlign={'center'}>
              {unit}
            </Typography>
            <Typography sx={{ width: '60px' }} textAlign={'center'}>
              {max_order}
            </Typography>
            <Box
              justifyContent={'end'}
              sx={{
                width: '100px',
                display: 'flex',
                gap: '5px',
                justifyContent: 'center',
                '& .icon': {
                  fontSize: '1.8rem !important',
                  color: myColors.white,
                },
              }}
            >
              <Button
                onClick={() => {
                  setEdit({ stt: true, value: item });
                }}
                style={{ borderRadius: '3px', padding: '5px', backgroundColor: 'orange' }}
              >
                <EditIcon className="icon" />
              </Button>
              <Button
                primary
                style={{ borderRadius: '3px', padding: '5px' }}
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <DeleteIcon className="icon" />
              </Button>
            </Box>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          position: 'sticky',
          top: '70px',
          zIndex: 1,
          mb: '1vh',
          backgroundColor: '#fff',
        }}
      >
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          loading={loading}
          placeholder="Tìm user theo email ..."
          handleCreate={setAddMenu}
          handleImport={setUpload}
        />
      </Box>

      <Box
        sx={{
          padding: '15px 5px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #0000000a',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'sticky',
          top: '110px',
          zIndex: 1,
          '& p': {
            fontWeight: 700,
          },
        }}
      >
        <Box
          sx={{
            gap: '10px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ width: '30px' }} textAlign={'center'}>
            STT
          </Typography>
          <Typography sx={{ width: '80px' }} textAlign={'center'}>
            Hình ảnh
          </Typography>
          <Typography textAlign={'center'}>Tên món ăn</Typography>
        </Box>
        <Box
          sx={{
            gap: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ width: '80px' }} textAlign={'center'}>
            Đơn giá
          </Typography>
          <Typography sx={{ width: '40px' }} textAlign={'center'}>
            ĐVT
          </Typography>{' '}
          <Typography sx={{ width: '60px' }} textAlign={'center'}>
            GH đặt
          </Typography>
          <Typography sx={{ width: '100px' }} textAlign={'center'}>
            Hành động
          </Typography>
        </Box>
      </Box>

      {render()}

      <PaginationCustom
        limit_per_page={limit_per_page}
        setlimit_per_page={setlimit_per_page}
        total_page={totalPages}
        page={page}
        setPage={setPage}
      />

      {(overLay || edit.stt || addMenu || upload) && (
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
          {edit.stt && <EditMenu cataloglist={catalogs} setEdit={setEdit} edit={edit} setLoad={setLoad} />}
          {addMenu && <CreateNewMenu cataloglist={catalogs} setAddMenu={setAddMenu} setLoad={setLoad} />}
          {upload && <FileUpload setUpload={setUpload} menus setLoad={setLoad} />}
        </Box>
      )}
    </Box>
  );
}
