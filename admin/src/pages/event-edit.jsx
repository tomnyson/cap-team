import { Helmet } from 'react-helmet-async';

import EventEditView from 'src/sections/event/edit/event-edit-view';
// ----------------------------------------------------------------------

export default function EventEditPage() {
  return (
    <>
      <Helmet>
        <title> Event Edit</title>
      </Helmet>

      <EventEditView />
    </>
  );
}
