import { Helmet } from 'react-helmet-async';

import { ForgotView } from 'src/sections/forgot';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Quên mật khẩu</title>
      </Helmet>

      <ForgotView />
    </>
  );
}
