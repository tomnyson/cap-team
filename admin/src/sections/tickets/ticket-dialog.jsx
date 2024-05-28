import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
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
  FormHelperText,
} from '@mui/material';

import { createTicket, updateTicket } from 'src/apis/ticket';

export default function TicketDialog({ open, onClose, onSave, initialData, events }) {
  console.log('🚀 ~ TicketDialog ~ initialData:', initialData);
  const [name, setName] = useState('');
  console.log('🚀 ~ TicketDialog ~ name:', name);
  const [price, setPrice] = useState('');
  const [eventId, setEventId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');
  const [minimum, setMinimum] = useState(1);
  const [maximum, setMaximum] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setEventId(initialData.event_id);
      setQuantity(initialData.quantity);
      setOpeningDate(formatDateTimeLocal(initialData.opening_date));
      setSaleEndDate(formatDateTimeLocal(initialData.sale_end_date));
      setMinimum(initialData.minimum || 1);
      setMaximum(initialData.maximum || 1);
    }
  }, [initialData]);

  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Tên vé là bắt buộc';
    if (!price || price <= 0) newErrors.price = 'Giá phải lớn hơn 0';
    if (!eventId) newErrors.eventId = 'Sự kiện là bắt buộc';
    if (!quantity || quantity <= 0) newErrors.quantity = 'Số lượng phải lớn hơn 0';
    if (!openingDate) newErrors.openingDate = 'Ngày tạo là bắt buộc';
    if (!saleEndDate) newErrors.saleEndDate = 'Ngày kết thúc là bắt buộc';
    if (!minimum || minimum <= 0) newErrors.minimum = 'Số lượng tối thiểu phải lớn hơn 0';
    if (!maximum || maximum <= 0) newErrors.maximum = 'Số lượng tối đa phải lớn hơn 0';
    if (minimum > maximum)
      newErrors.minimum = 'Số lượng tối thiểu phải nhỏ hơn hoặc bằng số lượng tối đa';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const ticketData = {
      name,
      price: parseInt(price, 10),
      event_id: eventId,
      quantity: parseInt(quantity, 10),
      minimum: parseInt(minimum, 10),
      maximum: parseInt(maximum, 10),
      opening_date: new Date(openingDate).toISOString(),
      sale_end_date: new Date(saleEndDate).toISOString(),
      status: true,
      event: {
        name: events.find((event) => event.id === eventId).name,
      },
    };
    const { event, status, ...sendToServerData } = ticketData;

    createTicket(sendToServerData).then((response) => {
      if (response.data.message === 'Sự kiện đã có vé') {
        toast.error('Sự kiện đã có vé');
      } else {
        toast.success('Tạo vé thành công');
        onSave(ticketData);
        onClose();
      }
    });
  };

  const handleUpdate = () => {
    if (!validate()) return;

    const ticketData = {
      id: initialData.id,
      name,
      price: parseInt(price, 10),
      event_id: eventId,
      quantity: parseInt(quantity, 10),
      minimum: parseInt(minimum, 10),
      maximum: parseInt(maximum, 10),
      opening_date: new Date(openingDate).toISOString(),
      sale_end_date: new Date(saleEndDate).toISOString(),
      status: true,
      event: {
        name: events.find((event) => event.id === eventId).name,
      },
    };
    const { event, status, ...sendToServerData } = ticketData;
    updateTicket(sendToServerData).then((response) => {
      if (response.data.message !== 'Cập nhật vé thành công') {
        toast.error(response.data.message);
      } else {
        toast.success('Cập nhật vé thành công');
        onSave(initialData);
        onClose();
      }
    });
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
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Giá"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={!!errors.price}
          helperText={errors.price}
        />
        <FormControl fullWidth margin="dense" error={!!errors.eventId}>
          <InputLabel>Sự kiện</InputLabel>
          <Select value={eventId} onChange={(e) => setEventId(e.target.value)} label="Sự kiện">
            {events
              ? events.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.name}
                  </MenuItem>
                ))
              : null}
          </Select>
          {errors.eventId && <FormHelperText>{errors.eventId}</FormHelperText>}
        </FormControl>
        <TextField
          margin="dense"
          label="Số lượng"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          error={!!errors.quantity}
          helperText={errors.quantity}
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
          error={!!errors.openingDate}
          helperText={errors.openingDate}
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
          error={!!errors.saleEndDate}
          helperText={errors.saleEndDate}
        />
        <TextField
          margin="dense"
          label="Số lượng tối thiểu"
          type="number"
          fullWidth
          value={minimum}
          onChange={(e) => setMinimum(e.target.value)}
          error={!!errors.minimum}
          helperText={errors.minimum}
        />
        <TextField
          margin="dense"
          label="Số lượng tối đa"
          type="number"
          fullWidth
          value={maximum}
          onChange={(e) => setMaximum(e.target.value)}
          error={!!errors.maximum}
          helperText={errors.maximum}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        {initialData ? (
          <>
            <Button onClick={handleUpdate} color="primary">
              Lưu
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleSubmit} color="primary">
              Tạo
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

TicketDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  events: PropTypes.array.isRequired,
};
