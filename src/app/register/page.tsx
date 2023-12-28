import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import { RegisterForm } from './RegisterForm';

export default async function RegisterPage() {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  );
}
