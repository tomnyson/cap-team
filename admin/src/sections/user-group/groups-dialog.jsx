import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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

import groupServices from 'src/services/group.services';
import authServices from 'src/services/auth.services';


export default function GroupsDialog({ open, onClose, onSave, initialData, group_id }) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.name);
    }
  }, [initialData]);


  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email là bắt buộc';
    else if (email.length < 5) newErrors.email = 'Email không được nhỏ hơn 5 ký tự';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const groupData = {
      group_id: group_id ? group_id : Math.random().toString(36).substr(2, 9),
      email
    };


    groupServices.addUserToGroup(groupData).then((response) => {
      if (response.data.message === 'Người dùng đã tạo group với tên này trước đó.') {
        toast.error('Người dùng đã tạo group với tên này trước đó.');
      } else if (response.data.message === 'Tạo group thành công') {
        toast.success('Tạo nhóm thành công');
      }
    });
    onClose()
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Sửa nhóm' : 'Thêm Người dùng vào nhóm'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="email người dùng"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

GroupsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
