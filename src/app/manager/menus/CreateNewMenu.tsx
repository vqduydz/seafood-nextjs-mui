import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { ISetState, ISubmitForm } from '@/interface/interface';
import capitalize from '@/utils/capitalize';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import { createNewMenugApi } from '@/utils/services/api/menuApi';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';
import CatalogDrop from './CatalogDrop';

const CreateNewMenu = ({
  cataloglist,
  setAddMenu,
  setLoad,
}: {
  cataloglist: string[];
  setAddMenu: ISetState<boolean>;
  setLoad: ISetState<boolean>;
}) => {
  const [image, setImage] = useState<any>();
  const { auth } = useMyContext();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (e: ISubmitForm) => {
    e.preventDefault();
    setLoad(true);
    if (image)
      try {
        const data = new FormData(e.currentTarget);
        const slug = (removeVietnameseTones(data.get('name') as string) as string).toLowerCase().replace(/ /g, '-');
        const imageUrl = await uploadImage(slug);
        const menuData = {
          name: capitalize(data.get('name') as string) as string,
          slug,
          catalog: capitalize(data.get('catalog') as string) as string,
          catalogSlug: (capitalize(data.get('catalog') as string) as string).toLowerCase().replace(/ /g, '-'),
          price: data.get('price') as unknown as number,
          max_order: data.get('max_order') as unknown as number,
          unit: data.get('unit') as string,
          image: imageUrl,
        };

        const res = await createNewMenugApi(menuData, auth?.token as string);
        if (res.data.error) return enqueueSnackbar(res.data.error, { variant: 'error' });
        enqueueSnackbar(res.data, { variant: 'success' });
        setAddMenu(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const uploadImage = async (slug: string) => {
    try {
      const formData = new FormData();
      formData.append('image', image, slug);
      const url = `${process.env.apiEndpoint}/upload`;
      const response = await axios.post(url, formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
        '& .inner': { display: 'flex', gap: '10px' },
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
            }}
          />
          <CatalogDrop cataloglist={cataloglist} />
        </Box>
        <Box
          sx={{
            m: '25px 0px',
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
              padding: '7px',
            }}
            htmlFor="upload-image"
          >
            <input hidden id="upload-image" name="uploadImage" required type="file" onChange={handleImageChange} />
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
          {image ? (
            <Button primary type="submit">
              Lưu
            </Button>
          ) : (
            <Button disable primary type="button">
              Lưu
            </Button>
          )}
          <Button outline type="button" onClick={() => setAddMenu(false)}>
            Hủy
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateNewMenu;
