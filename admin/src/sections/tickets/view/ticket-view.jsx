import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import ticketServices from 'src/services/ticket.services';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import TicketDialog from '../ticket-dialog';
import TicketTableRow from '../ticket-table-row';
import TableEmptyRows from '../table-empty-rows';
import TicketTableHead from '../ticket-table-head';
import TicketTableToolbar from '../ticket-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import AddEventModal from 'src/sections/event/add-event-modal';
import { Box } from '@mui/material';
import handleRequest from 'src/apis/request';

export default function TicketView() {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvent] = useState([]);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [group, setGroup] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const fetchTickets = async () => {
    try {
      const response = await ticketServices.getAllTicket();
      setTickets(response.ticket);
    } catch (error) {
      console.error('Failed to fetch tickets:', error.message);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await ticketServices.getAllEventByEmail(currentUser.email);
      setEvent(response);
    } catch (error) {
      console.error('Failed to fetch events:', error.message);
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser.id;
    handleRequest('get', `/getAllGroupByUserId?user_id=${userId}`).then((res) => {
      setGroup(res.data);
    });
    fetchTickets();
    fetchEvents();
  }, []);

  const handleDisableTicket = (id) => {
    setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id));
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tickets.map((n) => n.name);
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateTicket = async (newTicket) => {
    await fetchTickets(); // Fetch lại danh sách tickets sau khi tạo mới
  };

  const handleEditTicket = async (updatedTicket) => {
    await fetchTickets(); // Fetch lại danh sách tickets sau khi cập nhật
  };

  const handleOpenEventDialog = () => {
    setOpenEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
    fetchEvents();
  };

  const dataFiltered = applyFilter({
    inputData: tickets,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Vé</Typography>

        <Box>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{ mr: 2 }}
            onClick={handleOpenEventDialog}
          >
            Tạo sự kiện mới
          </Button>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenDialog}
          >
            Tạo vé mới
          </Button>
        </Box>
      </Stack>

      {tickets.length === 0 ? (
        <Card>
          <Typography variant="h6" align="center" p={3}>
            Chưa có vé nào, bấm vào Tạo vé mới để tạo ngay
          </Typography>
        </Card>
      ) : (
        <Card>
          <TicketTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <TicketTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={tickets.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Tên vé' },
                    { id: 'price', label: 'Giá' },
                    { id: 'event', label: 'Sự kiện' },
                    { id: 'quantity', label: 'Số lượng', align: 'center' },
                    { id: 'opening_date', label: 'Ngày tạo' },
                    { id: 'sale_end_date', label: 'Ngày kết thúc' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TicketTableRow
                        key={row.id}
                        id={row.id}
                        name={row.name}
                        price={row.price}
                        event={row?.event?.name}
                        events={events}
                        quantity={row.quantity}
                        opening_date={row.opening_date}
                        sale_end_date={row.sale_end_date}
                        status={row.status}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                        onEdit={handleEditTicket}
                        onDisable={handleDisableTicket}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, tickets.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={tickets.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      )}

      <TicketDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleCreateTicket}
        events={events}
      />

      <AddEventModal
        open={openEventDialog}
        onClose={handleCloseEventDialog}
        onCreateEvent={() => {
          handleCloseEventDialog();
        }}
        groups={group}
      />
    </Container>
  );
}
