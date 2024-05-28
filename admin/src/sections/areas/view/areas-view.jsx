import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { getAllArea } from 'src/apis/areas';
import { getAllEventByEmail } from 'src/apis/event';

// import { areas as initialAreas } from 'src/_mock/areas';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import AreasDialog from '../areas-dialog';
import AreasTableRow from '../areas-table-row';
import TableEmptyRows from '../table-empty-rows';
import AreasTableHead from '../areas-table-head';
import AreasTableToolbar from '../areas-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import { Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';

export default function AreasView() {
  const [areas, setAreas] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvent] = useState([]);

  useEffect(() => {
    getAllEventByEmail('hptprobook@gmail.com').then((res) => {
      setEvent(res.data);
    });
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = areas.map((n) => n.name);
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

  const handleCreateareas = (newareas) => {
    setAreas([newareas, ...areas]);
  };

  const handleEditareas = (updatedareas) => {
    setAreas((prevareas) =>
      prevareas.map((areas) => (areas.id === updatedareas.id ? updatedareas : areas))
    );
  };

  const dataFiltered = applyFilter({
    inputData: areas,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  const [EventID, setEventID] = useState('');
  const handleChangeEvent = (e) => {
    setEventID(e.target.value);
  };
  const load = () => {
    getAllArea(EventID).then((res) => {
      setAreas(res.data);
    });
  };
  useEffect(() => {
    if (EventID == '') {
      return;
    }
    getAllArea(EventID).then((res) => {
      setAreas(res.data);
    });
  }, [EventID]);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Khu vực</Typography>
      </Stack>
      {/* chọn khu vực */}
      <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
        <InputLabel>Sự kiện</InputLabel>
        <Select onChange={(e) => handleChangeEvent(e)} label="Sự kiện">
          {events.length > 0 &&
            events.map((event) => (
              <MenuItem key={event.id} value={event.id}>
                {event.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {EventID != '' && (
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenDialog}
          sx={{ mb: 2 }}
        >
          Thêm khu vực
        </Button>
      )}
      {EventID == '' && 'Chọn sự kiện của bạn muốn thêm khu vực'}
      {EventID != '' && (
        <Card>
          <AreasTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          {areas.length == 0 && <span style={{ marginLeft: 20 }}>Sự kiện chưa có khu vực nào</span>}
          {areas.length > 0 && (
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <AreasTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={areas.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: 'name', label: 'Tên khu vực' },
                      { id: 'description', label: 'Mô tả' },
                      { id: 'opening_date', label: 'Ngày tạo' },
                      { id: 'sale_end_date', label: 'Ngày kết thúc' },
                      { id: '' },
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <AreasTableRow
                          key={row.id}
                          name={row.name}
                          id={row.id}
                          id_event={EventID}
                          opening_date={row.start_date}
                          sale_end_date={row.end_date}
                          description={row.description}
                          selected={selected.indexOf(row.name) !== -1}
                          handleClick={(event) => handleClick(event, row.name)}
                          onEdit={handleEditareas}
                          load={load}
                        />
                      ))}

                    <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(page, rowsPerPage, areas.length)}
                    />
                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          )}
          <TablePagination
            page={page}
            component="div"
            events={events}
            count={areas.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      )}

      <AreasDialog
        load={load}
        eventid={EventID}
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleCreateareas}
      />
    </Container>
  );
}
