import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { tickets } from 'src/_mock/tickets';

export default function AreasDialog({ open, onClose, onSave, initialData }) {
  const [name, setName] = useState('');
  const [eventId, setEventId] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [description, setDescription] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEventId(initialData.event_id);
      setDescription(initialData.description)
      setOpeningDate(initialData.opening_date);
      setSaleEndDate(initialData.sale_end_date);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const areasData = {
      id: initialData ? initialData.id : Math.random().toString(36).substr(2, 9),
      name,
      event_id: eventId,
      opening_date: new Date(openingDate).toISOString(),
      sale_end_date: new Date(saleEndDate).toISOString(),
      description:description,
      event: {
        name: tickets.find((event) => event.event_id === eventId).event.name,
      },
    };
    onSave(areasData);
    onClose();
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
      
        <FormControl fullWidth margin="dense">
          <InputLabel>Sự kiện</InputLabel>
          <Select value={eventId} onChange={(e) => setEventId(e.target.value)} label="Sự kiện">
            {tickets.map((event) => (
              <MenuItem key={event.event_id} value={event.event_id}>
                {event.event.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          margin='dense'
          label='Mô tả...'
          multiline
          rows={4} // Số dòng mặc định bạn muốn hiển thị
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
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
