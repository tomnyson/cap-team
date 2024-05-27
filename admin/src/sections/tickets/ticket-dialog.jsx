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

export default function TicketDialog({ open, onClose, onSave, initialData }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [eventId, setEventId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setEventId(initialData.event_id);
      setQuantity(initialData.quantity);
      setOpeningDate(initialData.opening_date);
      setSaleEndDate(initialData.sale_end_date);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const ticketData = {
      id: initialData ? initialData.id : Math.random().toString(36).substr(2, 9),
      name,
      price: parseInt(price, 10),
      event_id: eventId,
      quantity: parseInt(quantity, 10),
      minimum: 1,
      maximum: 1,
      opening_date: new Date(openingDate).toISOString(),
      sale_end_date: new Date(saleEndDate).toISOString(),
      status: true,
      event: {
        name: tickets.find((event) => event.event_id === eventId).event.name,
      },
    };
    onSave(ticketData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Sửa vé' : 'Tạo vé mới'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên vé"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Giá"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
          label="Số lượng"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
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

TicketDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
