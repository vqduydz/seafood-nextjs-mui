import { ISetState } from '@/interface/interface';
import { Box, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';

interface IPaginationCustom {
  total_page: number;
  page: number;
  setPage: ISetState<number>;
  limit_per_page: number;
  setlimit_per_page: ISetState<number>;
}

const PaginationCustom = ({ limit_per_page, page, setPage, setlimit_per_page, total_page }: IPaginationCustom) => {
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& *': { fontWeight: 500 },
          '& .MuiOutlinedInput-notchedOutline': { border: 'none', minWidth: '20px' },
          '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'green',
            color: '#fff',
          },
        }}
      >
        <label>Hiển thị</label>
        <Select
          onChange={(event, child) => {
            setlimit_per_page(event.target.value as number);
          }}
          required
          sx={{ minWidth: '60px' }}
          size="small"
          value={limit_per_page}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Pagination
          count={total_page}
          page={page}
          boundaryCount={2}
          onChange={(_, page: number) => {
            setPage(page as number);
          }}
        />
      </Box>
    </Box>
  );
};

export default PaginationCustom;
