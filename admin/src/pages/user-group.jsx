import { Helmet } from 'react-helmet-async';

import { UserGroupView } from 'src/sections/user-group/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserGroupView />
    </>
  );
}
