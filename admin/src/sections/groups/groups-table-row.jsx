import PropTypes from 'prop-types';
import React, { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Popover, MenuItem } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';

import GroupsDialog from './groups-dialog';

export default function GroupsTableRow({
  selected,
  name,
  id,
  handleClick,
  onDelete,
  onEdit,
}) {
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{name}</TableCell>
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
          sx: { width: 200 },
        }}
      >
        <MenuItem onClick={() => {
          router.push(`/group/${id}`)
          handleCloseMenu()
        }}>
          <Iconify icon="eva:people-fill" sx={{ mr: 2 }} />
          quản lý thành viên
        </MenuItem>
        <MenuItem onClick={handleOpenDialog}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Sửa
        </MenuItem>

        <MenuItem onClick={() => {
          onDelete(id)
          handleCloseMenu()
        }} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xoá
        </MenuItem>
      </Popover>

      <GroupsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={onEdit}
        initialData={{
          id: name,
          name,
        }}
      />
    </>
  );
}

GroupsTableRow.propTypes = {
  selected: PropTypes.bool,
  name: PropTypes.string,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func,
};
