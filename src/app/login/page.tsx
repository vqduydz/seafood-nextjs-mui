import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';

import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
