'use client';
import Button from '@/components/Button/Button';
import PaginationCustom from '@/components/PaginationCustom/PaginationCustom';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useMyContext } from '@/context/context';
import useDebounce from '@/hook/useDebounce';
import { IMenu } from '@/interface/interface';
import { myColors } from '@/styles/color';
import dateTimeFormate from '@/utils/dateTimeFormate';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import { catalogApi, deleteCatalogApi } from '@/utils/services/api/catalogApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import CreateNewCatalog from './CreateNewCatalog';
import EditMenu from './EditCatalog';
import FileUpload from '../FileUpload';

export default function CatalogManage() {
  const { auth } = useMyContext();
  const [edit, setEdit] = useState<{ stt: boolean; value?: IMenu }>({ stt: false });
  const [upload, setUpload] = useState(false);
  const [addCatalog, setAddCatalog] = useState<boolean>(false);
  const [overLay, setOverLay] = useState(false);
  const [page, setPage] = useState(1);
  const [limit_per_page, setlimit_per_page] = useState(20);
  const { enqueueSnackbar } = useSnackbar();
  const [catalogs, setCatalogs] = useState<{
    items: IMenu[];
    imagePath: string;
    totalPages: number;
    limitPerPage: number;
  }>({
    items: [],
    imagePath: '',
    totalPages: 1,
    limitPerPage: limit_per_page,
  });
  const { items, imagePath, totalPages, limitPerPage } = catalogs;
  const [searchValue, setSearchValue] = useState<string>('');
  const debounce = useDebounce(searchValue, 500);
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!addCatalog && !edit.stt) {
      setOverLay(false);
      return;
    }
    setOverLay(true);
  }, [addCatalog, edit?.stt]);

  useEffect(() => {
    const query = !debounce.trim()
      ? { page, limit_per_page }
      : { page, limit_per_page, name: (removeVietnameseTones(debounce) as string).toLowerCase().replace(/ /g, '-') };

    if (debounce.trim()) setLoading(true);
    (async () => {
      const getCatalog = await catalogApi(query);
      if (getCatalog.data.error) {
        console.log(getCatalog.data.error);
        return;
      }
      const { catalogs, imagePath, totalPages, limit_per_page } = getCatalog.data;
      setCatalogs({
        items: catalogs,
        imagePath: imagePath,
        totalPages: totalPages,
        limitPerPage: limit_per_page,
      });
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit_per_page, debounce, overLay, load]);

  useEffect(() => {
    setPage(1);
  }, [limit_per_page, debounce]);

  const handleDelete = async (id: number) => {
    if (confirm('Delete confirmation')) {
      try {
        setLoad(true);
        const res = await deleteCatalogApi(id, auth?.token as string);
        if (res.data.error) enqueueSnackbar(res.data.error, { variant: 'error' });
        enqueueSnackbar(res.data, { variant: 'success' });
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    }
  };

  const render = () =>
    items.map((item, index) => {
      const { id, name, image, createdAt } = item;
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            padding: '10px',
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
              gap: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography textAlign={'center'} sx={{ minWidth: '30px' }}>
              {page > 1 ? (page - 1) * limitPerPage + (index + 1) : index + 1}
            </Typography>
            <Box
              sx={{
                backgroundImage: `url(${imagePath}${image})`,
                minWidth: '80px',
                height: '60px',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
            <Typography color={'#337ab7'} fontSize={'1.6rem'}>
              {name}
            </Typography>
          </Box>
          <Box
            sx={{
              gap: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography textAlign={'center'} width={'200px'} fontSize={'1.6rem'}>
              {dateTimeFormate(createdAt)}
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
          placeholder="Tìm catalog ..."
          handleCreate={setAddCatalog}
          handleImport={setUpload}
        />
      </Box>

      <Box
        sx={{
          padding: '15px 10px',
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
            gap: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography textAlign={'center'} sx={{ minWidth: '30px' }}>
            STT
          </Typography>
          <Typography sx={{ minWidth: '80px' }}>Hình ảnh</Typography>
          <Typography>Tên danh mục</Typography>
        </Box>
        <Box
          sx={{
            gap: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography textAlign={'center'} width={'200px'}>
            Ngày tạo
          </Typography>
          <Typography sx={{ minWidth: '100px' }}>Hành động</Typography>
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

      {(overLay || edit.stt || addCatalog || upload) && (
        <Box sx={{ zIndex: 3, backgroundColor: '#212121', position: 'relative' }}>
          {overLay && (
            <Box
              sx={{
                // display: { 0: 'block', 768: 'none' },
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
          {edit.stt && <EditMenu setEdit={setEdit} edit={edit} load={load} setLoad={setLoad} />}
          {addCatalog && <CreateNewCatalog setLoad={setLoad} setAddCatalog={setAddCatalog} />}
          {upload && <FileUpload setUpload={setUpload} setLoad={setLoad} catalogs />}
        </Box>
      )}
    </Box>
  );
}
