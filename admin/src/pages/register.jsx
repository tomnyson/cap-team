import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';
// ----------------------------------------------------------------------

export default function registerPage() {
  return (
    <>
      <Helmet>
        <title> Đăng ký Tài khoản </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
