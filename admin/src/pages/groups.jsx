import { Helmet } from 'react-helmet-async';

import { GroupsView, GroupsListView ,GroupsAddMember } from '../sections/groups/view';
// ----------------------------------------------------------------------

export default function GroupsPage() {
  return (
    <>
      <Helmet>
        <title> Group | Minimal UI </title>
      </Helmet>

        <GroupsView />
        <GroupsAddMember />
        <GroupsListView />
    </>
  );
}
