import { ISetState, SxMui } from '@/interface/interface';
import { myColors } from '@/styles/color';
import ClearIcon from '@mui/icons-material/Clear';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase } from '@mui/material';
import { ChangeEvent } from 'react';
import Button from '../Button/Button';
import './SearchBox.css';

interface ISearchBox {
  searchValue: string;
  setSearchValue: ISetState<string>;
  loading: boolean;
  placeholder: string;
  sx?: SxMui;
  handleCreate: ISetState<boolean>;
  handleImport: ISetState<boolean>;
  search?: boolean;
  create?: boolean;
  _import?: boolean;
}

function SearchBox({
  searchValue,
  setSearchValue,
  loading = false,
  placeholder = '',
  sx,
  handleCreate,
  handleImport,
  search = true,
  create = true,
  _import = true,
}: ISearchBox) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const searchValue = event.target.value.replace(/ + /g, ' ');
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    } else {
      setSearchValue('');
    }
    if (!searchValue.trim()) {
      setSearchValue('');
    }
  };
  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <>
      {search && (
        <Box
          sx={{
            borderRadius: '4px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'start',
            border: `1px solid ${myColors.primary}`,
            width: '100%',
            maxWidth: '768px',
            ...sx,
          }}
        >
          <Box
            sx={{
              background: myColors.primary,
              color: '#fff',
              outline: 'none',
              padding: '2px 40px',
              position: 'relative',
              width: '100%',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                position: 'absolute',
                top: 0,
                left: 0,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <SearchIcon fontSize="medium" />
            </Box>
            <InputBase
              type="text"
              value={searchValue}
              onChange={handleChange}
              sx={{
                borderRadius: '4px',
                backgroundColor: '#fff',
                padding: '1px 10px',
                width: '100% ',
              }}
              placeholder={placeholder}
            />
            <Box
              sx={{
                width: '40px',
                height: '40px',
                position: 'absolute',
                top: 0,
                right: 0,
                color: '#333',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {!!searchValue && !loading && (
                <IconButton onClick={handleClear} type="button">
                  <ClearIcon sx={{ color: myColors.white }} fontSize="medium" />
                </IconButton>
              )}
              {!!searchValue && loading && (
                <IconButton onClick={handleClear} type="button">
                  <RotateRightIcon sx={{ color: myColors.white }} className="loading" fontSize="medium" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          '& .btn': {
            height: '40px',
            fontSize: '1.4rem',
          },
        }}
      >
        {create && (
          <Button primary onClick={() => handleCreate(true)} className="btn">
            Tạo mới
          </Button>
        )}
        {_import && (
          <Button outline onClick={() => handleImport(true)} className="btn">
            Import
          </Button>
        )}
      </Box>
    </>
  );
}

export default SearchBox;
