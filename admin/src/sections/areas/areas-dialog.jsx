import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { createArea, updateArea } from 'src/apis/areas';

export default function AreasDialog({ open, onClose, initialData, eventid, load }) {
  const [name, setName] = useState('');
  const [eventId, setEventId] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [description, setDescription] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');
  const [error, seterror] = useState({
    name: '',
    openingDate: '',
    saleEndDate: '',
    description: '',
  });
  const reset = () => {
    seterror({
      name: '',
      openingDate: '',
      saleEndDate: '',
      description: '',
    });
  };
  useEffect(() => {
    reset();
  }, [open]);

  const validateAreas = () => {
    if (name == '') {
      seterror({ ...error, name: 'Không bỏ trống' });
      return false;
    }
    if (openingDate == '') {
      seterror({ ...error, openingDate: 'Không bỏ trống' });
      return false;
    }
    if (saleEndDate == '') {
      seterror({ ...error, saleEndDate: 'Không bỏ trống' });
      return false;
    }
    if (description == '') {
      seterror({ ...error, description: 'Không bỏ trống' });
      return false;
    }
    if (openingDate > saleEndDate) {
      seterror({ ...error, saleEndDate: 'Ngày không hợp lệ' });
      return false;
    }
    reset();
    return true;
  };
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEventId(initialData.event_id);
      setDescription(initialData.description);
      setOpeningDate(formatDateTimeLocal(initialData.opening_date));
      setSaleEndDate(formatDateTimeLocal(initialData.sale_end_date));
    }
  }, [initialData]);
  // const formatDateTimeLocal = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toISOString().slice(0, 16);
  // };

  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSubmit = async () => {
    if (!validateAreas()) {
      return;
    }
    if (initialData) {
      const areasData = {
        name,
        event_id: eventId,
        start_date: new Date(openingDate).toISOString(),
        end_date: new Date(saleEndDate).toISOString(),
        description: description,
      };
      const Edit = await updateArea(initialData.id, areasData);
      if (Edit.status == 200) {
        toast.success('Sửa khu vực thành công');
        load();
        onClose();
      } else {
        toast.error('Có lỗi xảy ra thử lại sau');
        onClose();
      }
      return;
    }
    const areasData = {
      name,
      event_id: eventid,
      start_date: new Date(openingDate).toISOString(),
      end_date: new Date(saleEndDate).toISOString(),
      description: description,
    };
    const add = await createArea(areasData);
    if (add.status == 200) {
      toast.success('Thêm khu vực thành công');
      load();
      onClose();
    } else {
      toast.error('Có lỗi xảy ra thử lại sau');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Sửa khu vực' : 'Thêm khu vực'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên khu vực"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span style={{ color: 'red', fontSize: '.9rem' }}>{error.name}</span>
        <TextField
          margin="dense"
          label="Ngày tạo"
          type="datetime-local"
          fullWidth
          value={openingDate}
          onChange={(e) => setOpeningDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <span style={{ color: 'red', fontSize: '.9rem' }}>{error.openingDate}</span>
        <TextField
          margin="dense"
          label="Ngày kết thúc"
          type="datetime-local"
          fullWidth
          value={saleEndDate}
          onChange={(e) => setSaleEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <span style={{ color: 'red', fontSize: '.9rem' }}>{error.saleEndDate}</span>

        <TextField
          margin="dense"
          label="Mô tả..."
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span style={{ color: 'red', fontSize: '.9rem' }}>{error.description}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} color="primary">
          {initialData ? 'Lưu' : 'Tạo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AreasDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
