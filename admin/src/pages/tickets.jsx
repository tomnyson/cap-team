import { Helmet } from 'react-helmet-async';

import TicketView from 'src/sections/tickets/view/ticket-view';

// ----------------------------------------------------------------------

export default function TicketsPage() {
  return (
    <>
      <Helmet>
        <title> Vé </title>
      </Helmet>
      <TicketView />
    </>
  );
}
