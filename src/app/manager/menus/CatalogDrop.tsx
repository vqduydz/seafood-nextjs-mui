import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { ISetState } from '@/interface/interface';
import removeVietnameseTones from '@/utils/removeVietnameseTones';
import { Box, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface ICatalogDrop {
  cataloglist: string[];
  defaultValue?: string;
}

const CatalogDrop = ({ cataloglist, defaultValue }: ICatalogDrop) => {
  const [display, setDisplay] = useState(false);
  const [value, setValue] = useState<string>(defaultValue || '');
  const [selectList, setSelectList] = useState<string[]>(cataloglist);
  const showList = () => {
    setDisplay(true);
  };
  const hideList = () => {
    setTimeout(() => {
      setDisplay(false);
    }, 200);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    if (!value) return setSelectList(cataloglist);
    setSelectList(
      cataloglist.filter((item) =>
        (removeVietnameseTones(item) as string)
          .toLowerCase()
          .includes((removeVietnameseTones(value) as string).toLowerCase()),
      ),
    );
  };

  const renderCatalogs = () => {
    return (
      <Box
        sx={{
          '& .catalog-btn': {
            ':hover': { backgroundColor: '#f5f5f5' },
          },
        }}
      >
        {selectList.map((catalog, i) => {
          return (
            <Button
              className="catalog-btn"
              type={'button'}
              style={{
                width: '100%',
                fontSize: '1.4rem',
                padding: '5px 10px',
                lineHeight: 'normal',
                borderBottom: '1px solid #f5f5f5',
                borderRadius: '0',
              }}
              key={i}
              onClick={() => {
                setValue(catalog);
              }}
            >
              <Typography width={'100%'} textAlign={'left'} fontSize={'1.4rem'}>
                {catalog}
              </Typography>
            </Button>
          );
        })}
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid transparent',
        position: 'relative',
      }}
    >
      <MyTextField
        props={{
          size: 'small',
          label: 'Chọn catalog',
          fullWidth: true,
          id: 'catalog',
          required: true,
          type: 'text',
          value: value,
          onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e),
          onBlur: hideList,
          onFocus: showList,
          name: 'catalog',
          sx: {
            background: 'transparent',
            outline: 'none',
            border: 'none',
          },
          placeholder: 'Chọn catalog',
          // inputProps: {
          //   readOnly: true,
          // },
        }}
      />

      {display && (
        <Box
          className="asdasdas"
          sx={{
            backgroundColor: '#fff',
            // mt: '1vh',
            position: 'absolute',
            left: '0',
            border: '1px solid #ccc',
            width: '100%',
            textAlign: 'left',
            minHeight: '50px',
            maxHeight: '30vh',
            overflow: 'auto',
            zIndex: 2,
            overflowY: 'scroll',
            '& .search-list': {
              padding: '0 10px',
            },
            '*': {
              color: '#000',
            },
          }}
        >
          {renderCatalogs()}
        </Box>
      )}
    </Box>
  );
};

export default CatalogDrop;
