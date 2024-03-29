import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { ICatalogGet, ISetState, ISubmitForm } from '@/interface/interface';
import capitalize from '@/utils/capitalize';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import { updateCatalogApi } from '@/utils/services/api/catalogApi';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';

interface IEditCatalog {
  edit: { stt: boolean; value?: ICatalogGet };
  setEdit: ISetState<{ stt: boolean; value?: ICatalogGet }>;
  setLoad: ISetState<boolean>;
}

const EditCatalog = ({ edit, setEdit, setLoad }: IEditCatalog) => {
  const { value } = edit;
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useMyContext();
  const [image, setImage] = useState<any>();

  const handleSubmit = async (e: ISubmitForm) => {
    e.preventDefault();
    setLoad(true);
    if (value)
      try {
        const { id } = value;
        const data = new FormData(e.currentTarget);
        const slug = (removeVietnameseTones(data.get('name') as string) as string).toLowerCase().replace(/ /g, '-');
        const imageUrl = image ? await uploadImage(slug) : null;
        const menuData = imageUrl
          ? {
              id: id as number,
              name: capitalize(data.get('name') as string) as string,
              slug: slug as string,
              image: imageUrl as string,
            }
          : {
              id: id as number,
              name: capitalize(data.get('name') as string) as string,
              slug: slug as string,
            };
        const res = await updateCatalogApi(menuData, auth?.token as string);
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

  const handleClearContent = () => {
    setEdit({ stt: false });
    // setCatalog({ ...catalog });
  };

  return (
    <Box
      sx={{
        borderRadius: { 768: '10px' },
        padding: '20px 20px 37px',
        maxWidth: '768px',
        width: '100%',
        minWidth: '768px',
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
        <Typography color={'gray'} fontWeight={500} fontSize={'2.4rem'}>
          {`Chỉnh sửa "${value?.name}"`}
        </Typography>
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
              label: 'Tên danh mục',
              id: 'name',
              name: 'name',
              type: '',
              fullWidth: true,
              autoFocus: true,
              required: true,
              sx: { mt: 0 },
              defaultValue: value ? value.name : '',
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
        <Box sx={{ mt: '15px', display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <Button primary type="submit">
            Lưu
          </Button>
          <Button outline type="button" onClick={handleClearContent}>
            Hủy
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditCatalog;
