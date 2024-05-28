import PropTypes from 'prop-types';
import React, { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Popover, MenuItem } from '@mui/material';

import Iconify from 'src/components/iconify';

import TicketDialog from './ticket-dialog'; // Chuyển đổi CreateTicketDialog thành TicketDialog

export default function TicketTableRow({
  selected,
  id,
  name,
  price,
  event,
  quantity,
  opening_date,
  sale_end_date,
  status,
  handleClick,
  onEdit,
  events,
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

  const currentEvent = events?.find((e) => e.name === event) || {};

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{event}</TableCell>
        <TableCell align="center">{quantity}</TableCell>
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

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xoá
        </MenuItem>
      </Popover>

      <TicketDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={onEdit}
        initialData={{
          id,
          name,
          price,
          event_id: currentEvent.id,
          quantity,
          opening_date,
          sale_end_date,
          event,
        }}
        events={events}
      />
    </>
  );
}

TicketTableRow.propTypes = {
  selected: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  event: PropTypes.string,
  quantity: PropTypes.number,
  opening_date: PropTypes.string,
  sale_end_date: PropTypes.string,
  status: PropTypes.bool,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func,
  events: PropTypes.array.isRequired,
};
