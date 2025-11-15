import LoginForm from '@/components/form/login-form';
import AuthLayout from '@/layout/authLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login ',
};

const Login = () => {
  return (
    <AuthLayout title='Masuk ke Rakamin'>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
