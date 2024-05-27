import { Helmet } from 'react-helmet-async';

import AreasView from 'src/sections/areas/view/areas-view';

// ----------------------------------------------------------------------

export default function TicketsPage() {
  return (
    <>
      <Helmet>
        <title> Areas </title>
      </Helmet>
      <AreasView />
    </>
  );
}
