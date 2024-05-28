import { Helmet } from 'react-helmet-async';

import { ConfirmOTPVIEW } from 'src/sections/confirm-otp';

// ----------------------------------------------------------------------

export default function ConfirmOTPPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <ConfirmOTPVIEW />
    </>
  );
}
