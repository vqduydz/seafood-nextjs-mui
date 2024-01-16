import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { IMenuGet, ISetState, ISubmitForm } from '@/interface/interface';
import capitalize from '@/utils/capitalize';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import { updateMenuApi } from '@/utils/services/api/menuApi';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';
import CatalogDrop from './CatalogDrop';

interface IEditMenu {
  edit: { stt: boolean; value?: IMenuGet };
  setEdit: ISetState<{ stt: boolean; value?: IMenuGet }>;
  setLoad: ISetState<boolean>;
  cataloglist: string[];
}

const EditMenu = ({ edit, setEdit, cataloglist, setLoad }: IEditMenu) => {
  const { value } = edit;
  const [image, setImage] = useState<any>();
  const { auth } = useMyContext();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (e: ISubmitForm) => {
    e.preventDefault();
    setLoad(true);
    if (value)
      try {
        const { id } = value;
        const data = new FormData(e.currentTarget);
        const slug = (removeVietnameseTones(data.get('name') as string) as string).toLowerCase().replace(/ /g, '-');
        const imageUrl = image ? await uploadImage(slug) : null;

        const menuData = (
          imageUrl
            ? {
                id: id as number,
                name: capitalize(data.get('name') as string) as string,
                slug,
                catalog: capitalize(data.get('catalog') as string) as string,
                catalogSlug: (removeVietnameseTones(data.get('catalog') as string) as string)
                  .toLowerCase()
                  .replace(/ /g, '-'),
                price: data.get('price') as unknown as number,
                max_order: data.get('max_order') as unknown as number,
                unit: capitalize(data.get('unit') as string) as string,
                image: imageUrl as string,
              }
            : {
                id: id as number,
                name: capitalize(data.get('name') as string) as string,
                slug,
                catalog: capitalize(data.get('catalog') as string) as string,
                catalogSlug: (removeVietnameseTones(data.get('catalog') as string) as string)
                  .toLowerCase()
                  .replace(/ /g, '-'),
                price: data.get('price') as unknown as number,
                max_order: data.get('max_order') as unknown as number,
                unit: capitalize(data.get('unit') as string) as string,
              }
        ) as IMenuGet;

        const res = await updateMenuApi(menuData, auth?.token as string);
        if (res.data && res.data.error) return enqueueSnackbar(res.data.error, { variant: 'error' });
        enqueueSnackbar(res.data, { variant: 'success' });
        setEdit({ stt: false });
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const uploadImage = async (name: string) => {
    if (image)
      try {
        const formData = new FormData();
        formData.append('image', image, name);
        const url = `${process.env.apiEndpoint}/upload`;
        const response = await axios.post(url, formData);
        return response.data;
      } catch (error) {
        console.error(error);
      }
  };

  const handleCancle = () => {
    setEdit({ stt: false });
    // setMenu({ ...menu });
  };

  return (
    <Box
      sx={{
        borderRadius: { 768: '10px' },
        padding: '20px',
        maxWidth: '768px',
        width: '100%',
        minWidth: '480px',
        margin: '0 auto',
        backgroundColor: '#fff',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        boxShadow: '0 0 10px 5px #00000012',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            mb: '15px',
            mt: '15px',
          }}
        >
          <MyTextField
            props={{
              size: 'small',
              label: 'Tên món ăn',
              id: 'name',
              name: 'name',
              fullWidth: true,
              autoFocus: true,
              required: true,
              defaultValue: value?.name,
            }}
          />
          <CatalogDrop cataloglist={cataloglist} defaultValue={value?.catalog} />
        </Box>
        <Box
          sx={{
            mb: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <MyTextField
            props={{
              size: 'small',
              label: 'Đơn giá',
              fullWidth: true,
              id: 'price',
              name: 'price',
              type: 'number',
              required: true,
              defaultValue: value?.price,
              sx: { m: 0 },
            }}
          />
          <MyTextField
            props={{
              size: 'small',
              label: 'Đơn vị tính',
              fullWidth: true,
              id: 'unit',
              name: 'unit',
              required: true,
              type: '',
              defaultValue: value?.unit,
              sx: { m: 0 },
            }}
          />
          <MyTextField
            props={{
              size: 'small',
              label: 'SL đặt tối đa',
              fullWidth: true,
              id: 'max_order',
              name: 'max_order',
              required: true,
              type: 'number',
              defaultValue: value?.max_order,
              sx: { m: 0 },
            }}
          />

          <label
            style={{
              border: '1px solid #0000003b',
              borderRadius: '3px',
              cursor: 'pointer',
              minWidth: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              padding: '5px',
            }}
            htmlFor="upload-image"
          >
            <input hidden id="upload-image" type="file" accept="image/*" onChange={handleImageChange} />
            {image ? (
              <Typography
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {image?.name}
              </Typography>
            ) : (
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <AddPhotoAlternateIcon fontSize="medium" sx={{ mr: '5px' }} /> Chọn ảnh
              </Typography>
            )}
          </label>
        </Box>
        <Box sx={{ margin: '15px 0', display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <Box sx={{ mt: '15px', display: 'flex', gap: '10px', justifyContent: 'end' }}>
            <Button primary type="submit">
              Lưu
            </Button>
            <Button outline type="button" onClick={handleCancle}>
              Hủy
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EditMenu;
