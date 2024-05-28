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
// import authServices from 'src/services/auth.services';

export default function GroupsDialog({ open, onClose, onSave, initialData }) {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  // authServices.getInfoUserByEmail({ email : "thien999@gmail.com" }).then((response) => {
  //   try {
  //     console.log(response);
  //     setUserId(response.id);
  //   }
  //   catch (error) {
  //     console.error('Error fetching groups:', error);
  //     throw new Error(error.response ? error.response.data.message : error.message);
  //   }
  // })
  const validate = () => {
    const newErrors = {};
  
    if (!name) newErrors.name = 'Tên nhóm là bắt buộc';
    else if (name.length < 5) newErrors.name = 'Tên nhóm không được nhỏ hơn 5 ký tự';
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (!validate()) return;
  
    const groupData = {
      id: initialData ? initialData.id : Math.random().toString(36).substr(2, 9),
      name,
    };
  
    groupServices.createGroup(groupData).then((response) => {
      if (response.data.message === 'Người dùng đã tạo group với tên này trước đó.') {
        toast.error('Người dùng đã tạo group với tên này trước đó.');
      } else if (response.data.message === 'Tạo group thành công') {
        toast.success('Tạo nhóm thành công');
        console.log(response.data.data);
        console.log(groupData);
        onSave({
          ...groupData,
          id: response.data.data.id,
          name: response.data.data.name
        });
        onClose();
      }
    }); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Sửa nhóm' : 'Thêm nhóm'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên nhóm"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
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
