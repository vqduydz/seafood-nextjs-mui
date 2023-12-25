import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import { RegisterForm } from './RegisterForm';

export default async function RegisterPage() {
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
        <RegisterForm />
      </AuthWrapper>
    </>
  );
}
