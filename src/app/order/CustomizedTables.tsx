import { SxMui } from '@/interface/interface';
import { myColors } from '@/styles/color';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

export default function CustomizedTables({
  rows,
  sx,
}: {
  rows: { name: string; value: string | number }[];
  sx?: SxMui;
}) {
  return (
    <Table aria-label="customized table">
      <TableBody
        sx={{
          border: '1px solid #0000000a',
          '& td': { borderColor: '#0000000a', fontWeight: 500, fontSize: '1.6rem', padding: '13px' },
          ...sx,
        }}
      >
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell
              sx={{
                color: myColors.primary,
                borderRight: '1px solid #0000000a',
              }}
              align="right"
              scope="row"
            >
              {row.name}
            </TableCell>
            <TableCell sx={{ color: myColors.primary }} align="right">
              {row.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
