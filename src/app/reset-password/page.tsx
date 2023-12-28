import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import { ResetPasswordForm } from './ResetPasswordForm';

export default async function ResetPassword() {
  return (
    <AuthWrapper>
      <ResetPasswordForm />
    </AuthWrapper>
  );
}
