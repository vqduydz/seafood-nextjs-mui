import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';

import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  return (
    <>
      <AuthWrapper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexDirection: 'column',
          pt: '15px',
        }}
      >
        <LoginForm />
      </AuthWrapper>
    </>
  );
}
