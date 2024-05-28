import { Helmet } from 'react-helmet-async';

import { GroupsView } from '../sections/groups/view';
// ----------------------------------------------------------------------

export default function GroupsPage() {
  return (
    <>
      <Helmet>
        <title> Quản lý user </title>
      </Helmet>

      <GroupsView />
    </>
  );
}
