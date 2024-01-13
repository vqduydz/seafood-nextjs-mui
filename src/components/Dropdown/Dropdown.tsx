import { Box, Typography } from '@mui/material';
import React, { CSSProperties, useState } from 'react';

import Button from '@/components/Button/Button';
import MyTextField from '../MyTextField/MyTextField';
interface IDropDown {
  dropList: string[] | [];
  setResult: React.Dispatch<React.SetStateAction<string>> | (() => void);
  result: string;
  style?: CSSProperties;
  input?: {
    isAddress?: boolean;
    inputLabel?: string;
    placeholder?: string;
    searchValue?: string;
    setSearchValue?: React.Dispatch<React.SetStateAction<string>> | (() => void);
    name?: string;
    id?: string;
  };
}

function DropDown({
  dropList = [],
  setResult,
  result,
  style = {},
  input = {
    isAddress: false,
    inputLabel: '',
    placeholder: '',
    setSearchValue: () => {},
    searchValue: '',
    name: '',
    id: '',
  },
}: IDropDown) {
  const { isAddress, inputLabel, placeholder, setSearchValue, searchValue, name, id } = input;
  const [show, setShow] = useState(false);

  const showList = () => {
    setShow(true);
  };

  const hideList = () => {
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const handleClick = (a: string) => {
    setResult(a);
    setShow(false);
  };

  const renderDropList = () => {
    return (
      <Box sx={{ '& *': { textAlign: 'left' } }}>
        {dropList.map((item, i) => {
          return (
            <Button
              type="button"
              style={{
                width: '100%',
                padding: '5px 10px',
                lineHeight: 'normal',
                borderBottom: '1px solid #f5f5f5',
              }}
              key={i}
              onMouseUp={() => {
                handleClick(item);
                if (setSearchValue) setSearchValue(item);
                setResult(item);
              }}
            >
              <Typography width={'100%'} variant="h5" fontSize={'1.4rem'}>
                {item}
              </Typography>
            </Button>
          );
        })}
      </Box>
    );
  };

  return (
    <Box
      className="asdasdasdas"
      sx={{
        width: '100%',
        borderRadius: '3px',
        border: '1px solid transparent',
        position: 'relative',
        '& .MuiBox-root': { mt: 0 },
        ...style,
      }}
    >
      {isAddress ? (
        <>
          <MyTextField
            props={{
              onChange: (e) => {
                const searchValue = e.target.value.replace(/ + /g, ' ');
                if (!searchValue.startsWith(' ')) {
                  if (setSearchValue) setSearchValue(searchValue);
                  setResult(searchValue);
                } else {
                  if (setSearchValue) setSearchValue('');
                  setResult('');
                }
                if (!searchValue.trim()) {
                  if (setSearchValue) setSearchValue('');
                  setResult('');
                }
              },
              onBlur: () => {
                hideList();
              },
              onFocus: () => {
                showList();
              },
              size: 'small',
              value: searchValue || result,
              label: inputLabel,
              type: 'text',
              placeholder: placeholder,
              name,
              id,
            }}
          />
        </>
      ) : (
        <MyTextField
          props={{
            onBlur: () => {
              hideList();
            },
            onFocus: () => {
              showList();
            },
            size: 'small',
            label: inputLabel,
            type: 'text',
            placeholder: placeholder,
            value: result || '',
            inputProps: {
              readOnly: true,
            },
            required: true,
          }}
        />
      )}

      {show && (
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: '1vh',
            position: 'absolute',
            left: '0',
            background: '#fff',
            borderRadius: '6px',
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
          {renderDropList()}
        </Box>
      )}
    </Box>
  );
}

export default DropDown;
