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
import {useRouter} from "../../../routes/hooks";
// ----------------------------------------------------------------------

export default function EventPage() {

  const [openDialog, setOpenDialog] = useState(false);

  const [page, setPage] = useState(0);

  const [event, setEvent] = useState([]);

  const [group, setGroup] = useState([]);


  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const getEvent = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const email = currentUser.email;
     eventServices.getAllByEmail({ email }).then((res) => {
       console.log(res)
         setEvent(res);
    })
  }
  useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userId = currentUser.id;
    getEvent();
    handleRequest('get', `/getAllGroupByUserId?user_id=${userId}`).then((res) => {
      setGroup(res.data);
    });
  }, []);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = event.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: event,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleCreateEvent = (data) => {
    if(data) {
      getEvent();
    }
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  const route = useRouter();

  const handleNavigate = (id) => {
    const eventDetail = event.find((item) => item.id === id);
    route.send(`/events/${id}`, {
      'event': eventDetail
    })
  }


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Sự kiện</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={()=> setOpenDialog(true)}>
          Thêm mới
        </Button>
      </Stack>

      <Card>
        <EventTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EventTableHead
                order={order}
                orderBy={orderBy}
                rowCount={event.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'start_date', label: 'Start Date' },
                  { id: 'end_date', label: 'End Date' },
                  { id: 'event_type', label: 'Event Type', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <EventTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      start_date={row.start_date}
                      status={row.status}
                      end_date={row.end_date}
                      event_type={row.event_type}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleNavigate={handleNavigate}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, event.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={event.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <AddEventModal open={openDialog} onClose={handleCloseDialog} groups={group} onCreateEvent={handleCreateEvent} />
    </Container>
  );
}
