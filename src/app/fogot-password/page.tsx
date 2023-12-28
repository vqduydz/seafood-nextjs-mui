import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export default async function ForgotPassword() {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
