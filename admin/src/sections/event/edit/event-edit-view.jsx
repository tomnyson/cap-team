import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';


import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import handleRequest from 'src/apis/request';
import EventTableToolbar from '../event-table-toolbar';
import EventTableHead from '../event-table-head';
import EventTableRow from '../event-table-row';
import AddEventModal from '../add-event-modal';
import { stubTrue } from 'lodash';
import eventServices from "src/services/event.services";
import EventEditTab from "../event-edit-tab";
import { useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------
import {useRouter} from "../../../routes/hooks";
export default function EventEditPage() {

  const [openDialog, setOpenDialog] = useState(false);

    const location = useLocation();
    const [event, setEvent] = useState({})
    const route = useRouter();
    const [group, setGroup] = useState([]);
    useEffect(() => {
        if(location.state){
            setEvent(location.state.event)
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const userId = currentUser.id;
            handleRequest('get', `/getAllGroupByUserId?user_id=${userId}`).then((res) => {
                setGroup(res.data);
            });
        }
        else {
            setEvent({
                name: 'asd'
            })
            // route.push('/events')
        }
    }, [location]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Sự kiện</Typography>

        <Button variant="contained" color="inherit" onClick={()=> setOpenDialog(true)}>
          Công bố sự kiện
        </Button>
      </Stack>

      <Card>
          {Object.keys(event).length !== 0 && <EventEditTab event={event} groups={group}/>}
      </Card>
    </Container>
  );
}
