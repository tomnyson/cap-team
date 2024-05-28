import { Helmet } from 'react-helmet-async';

import { VerifyEmailView } from 'src/sections/verify-email';

// ----------------------------------------------------------------------

export default function VerifyEmailPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <VerifyEmailView />
    </>
  );
}
