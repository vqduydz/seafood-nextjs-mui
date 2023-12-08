import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import Button from '@/components/Button/Button';
import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthWrapper>
      <form>
        <TextField
          sx={{ marginTop: '15px' }}
          size="small"
          label="Nhập email"
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          autoFocus
        />
        <TextField
          sx={{ margin: '15px 0' }}
          size="small"
          label="Nhập password"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button>Đăng nhập</Button>
      </form>
      <Box sx={{ mt: '10px', '& *': { fontSize: '1.4rem' } }}>
        <Link
          href={'#'}
          style={{
            padding: 0,
          }}
        >
          Quên mật khẩu
        </Link>

        <Box sx={{ display: 'inline-flex' }}>
          <Typography sx={{ margin: '0 5px', display: 'flex', alignItems: 'center' }}>Chưa có tài khoản ?</Typography>
          <Link href={'#'}>Đăng ký</Link>
        </Box>
      </Box>
    </AuthWrapper>
  );
}
