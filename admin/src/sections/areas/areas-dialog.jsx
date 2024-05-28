import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { createArea, updateArea } from 'src/apis/areas';

export default function AreasDialog({ open, onClose, onSave, initialData, eventid, load }) {
  const [name, setName] = useState('');
  const [eventId, setEventId] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [description, setDescription] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEventId(initialData.event_id);
      setDescription(initialData.description);
      setOpeningDate(formatDateTimeLocal(initialData.opening_date));
      setSaleEndDate(formatDateTimeLocal(initialData.sale_end_date));
    }
  }, [initialData]);
  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };
  const handleSubmit = async () => {
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
        console.log('Sửa khu vực thành công');
        load();
        onClose();
      } else {
        console.log('Có lỗi xảy ra thử lại sau');
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
      console.log('Thêm khu vực thành công');
      load();
      onClose();
    } else {
      console.log('Có lỗi xảy ra thử lại sau');
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
        <TextField
          margin="dense"
          label="Mô tả..."
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
