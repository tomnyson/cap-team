import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Popover, MenuItem } from '@mui/material';

import Iconify from 'src/components/iconify';

import AreasDialog from './areas-dialog';
import { deleteArea } from 'src/apis/areas';

export default function AreasTableRow({
  selected,
  load,
  name,
  id,
  id_event,
  opening_date,
  sale_end_date,
  description,
  handleClick,
  onEdit,
}) {
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenMenu = (e) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDeleArea = async () => {
    setOpen(null);
    console.log(id);
    const del = await deleteArea(id);
    console.log(del);
    // load();
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{name}</TableCell>
        {/* <TableCell>{event}</TableCell> */}
        <TableCell>{description}</TableCell>
        <TableCell>{new Date(opening_date).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(sale_end_date).toLocaleDateString()}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenDialog}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Sửa
        </MenuItem>

        <MenuItem onClick={handleDeleArea} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xoá
        </MenuItem>
      </Popover>

      <AreasDialog
        load={load}
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={onEdit}
        initialData={{
          id,
          event_id: id_event,
          name,
          description: description,
          opening_date,
          sale_end_date,
        }}
      />
    </>
  );
}

AreasTableRow.propTypes = {
  selected: PropTypes.bool,
  name: PropTypes.string,
  event: PropTypes.string,
  description: PropTypes.string,
  opening_date: PropTypes.string,
  sale_end_date: PropTypes.string,
  status: PropTypes.bool,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func,
};
