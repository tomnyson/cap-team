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


import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import GroupsDialog from '../groups-dialog';
import GroupsTableRow from '../groups-table-row';
import TableEmptyRows from '../groups-empty-rows';
import GroupsTableHead from '../groups-table-head';
import GroupsTableToolbar from '../groups-table-toolbar';
import groupServices from 'src/services/group.services';
import { emptyRows, applyFilter, getComparator } from '../utils';
import groupService from 'src/services/group.services';
import { useAuth } from 'src/context/AuthContext';
import { useToast } from 'src/context/ToastContext';
export default function AreasView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const { user, logout, getUserInfo } = useAuth();
  const currentUser = getUserInfo()
  const [groups, setGroups] = useState([])
  const { showToast } = useToast();


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        console.log(currentUser);
        const response = await groupService.getGroupByUserId({ user_id: currentUser.id });
        console.log(response);
        setGroups(response);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    if (currentUser && currentUser.id) {
      fetchGroups();
    }
  }, [currentUser]);


  useEffect(() => {
    const fetchgroups = async () => {
      try {
        const response = await groupServices.getAllGroupByUserId({ user_id: currentUser.id });
        setGroups(response);
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
      }
    };


    fetchgroups();
  })

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = groups.map((n) => n.name);
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

  const handleCreategroups = async (newareas) => {
    const create = await groupService.createGroup({
      name: newareas.name,
      user_id: currentUser.id
    })
    if (create) {
      showToast('Tạo group thành công', 'success');
      setGroups([create.data, ...groups]);
    }


  };

  const handleEditgroups = (updatedgroups) => {
    setGroups((prevareas) =>
      prevareas.map((groups) => (groups.id === updatedgroups.id ? updatedgroups : groups))
    );
  };

  const handleDelete = async (id) => {
    console.log('group id: ' + id);
    const create = await groupService.deleteGroup({
      group_id: id
    })
    if (create) {
      showToast('xóa group thành công', 'success');
      setGroups((prevareas) =>
        prevareas.map((groups) => (groups.id !== id))
      );
    }
  };



  const dataFiltered = applyFilter({
    inputData: groups,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Nhóm</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenDialog}
        >
          Thêm nhóm
        </Button>
      </Stack>

      <Card>
        <GroupsTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <GroupsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={groups.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Tên Nhóm' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <GroupsTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onEdit={handleEditgroups}
                      onDelete={handleDelete}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, groups.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={groups.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <GroupsDialog open={openDialog} onClose={handleCloseDialog} onSave={handleCreategroups} />
    </Container>
  );
}
