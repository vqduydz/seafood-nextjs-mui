import Button from '@/components/Button/Button';
import { useMyContext } from '@/context/context';
import { ISetState, ISubmitForm } from '@/interface/interface';
import { importCatalogsApi } from '@/utils/services/api/catalogApi';
import { importMenusApi } from '@/utils/services/api/menuApi';
import { importUsersApi } from '@/utils/services/api/userApi';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, memo, useState } from 'react';

interface IFileUpload {
  setUpload: ISetState<boolean>;
  menus?: boolean;
  catalogs?: boolean;
  users?: boolean;
  setLoad: ISetState<boolean>;
}

const FileUpload = ({ setUpload, menus = false, catalogs = false, users = false, setLoad }: IFileUpload) => {
  const [file, setFile] = useState<any>();
  const { auth } = useMyContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (e: ISubmitForm) => {
    setLoad(true);
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      if (users) {
        try {
          const response = await importUsersApi(formData, auth?.token as string);
          if (response.data.error) {
            enqueueSnackbar(response.data.error as string, { variant: 'error' });
            setLoad(false);
            return;
          }
          enqueueSnackbar(response.data, { variant: 'success' });
          setUpload(false);
          setLoad(false);
        } catch (error) {
          console.error(error);
          setLoad(false);
        }
        return;
      }
      if (catalogs) {
        try {
          const response = await importCatalogsApi(formData, auth?.token as string);
          if (response.data.error) {
            enqueueSnackbar(response.data.error as string, { variant: 'error' });
            setLoad(false);
            return;
          }
          enqueueSnackbar(response.data, { variant: 'success' });
          setUpload(false);
          setLoad(false);
        } catch (error) {
          console.error(error);
          setLoad(false);
        }
        return;
      }

      if (menus) {
        try {
          const response = await importMenusApi(formData, auth?.token as string);
          if (response.data.error) {
            enqueueSnackbar(response.data.error as string, { variant: 'error' });
            setLoad(false);
            return;
          }
          enqueueSnackbar(response.data, { variant: 'success' });
          setUpload(false);
          setLoad(false);
        } catch (error) {
          console.error(error);
          setLoad(false);
        }
        return;
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '10pxp',
          justifyItems: 'center',
          alignContent: 'center',
          backgroundColor: '#555',
          opacity: 0.5,
        }}
      />
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyItems: 'center',
            alignContent: 'center',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '6px',
            maxWidth: '300px',
          }}
        >
          <label
            style={{
              border: '1px solid #0000003b',
              borderRadius: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              padding: '5px',
            }}
            htmlFor="upload-file"
          >
            <input
              hidden
              id="upload-file"
              type="file"
              // multiple={false}
              required
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
            />
            {file ? (
              <Typography
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {file?.name}
              </Typography>
            ) : (
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachFileIcon fontSize="medium" sx={{ mr: '5px' }} /> Chọn file
              </Typography>
            )}
          </label>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {file ? (
              <Button primary type="submit">
                Import
              </Button>
            ) : (
              <Button primary disable type="submit">
                Import
              </Button>
            )}
            <Button outline type="button" onClick={() => setUpload(false)}>
              Hủy
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default memo(FileUpload);
