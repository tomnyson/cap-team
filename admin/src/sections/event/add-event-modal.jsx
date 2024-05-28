import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import Iconify from 'src/components/iconify';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import TextareaAuto from 'src/components/textarea/TextArea';
import * as yup from 'yup';
import { useFormik } from 'formik';
import handleRequest from 'src/apis/request';
import { handleToast } from 'src/utils/toast';
import { getCoordinates } from 'src/utils/const'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const eventShcema = yup.object().shape({
  name: yup
    .string()
    .required('Tên sự kiện không được để trống')
    .min(6, 'Tên sự kiện quá ngắn')
    .max(200, 'Tên sự kiện quá dài'),
  status: yup.boolean().required('Trạng thái không được để trống'),
  // group_id: yup.number().required('Nhóm không được để trống'),
  event_type: yup.string().required('Loại sự kiện không được để trống'),
  start_date: yup
    .date()
    .required('Ngày tạo không được để trống')
    .min(new Date(), 'Ngày tạo phải sau ngày hiện tại'),
  end_date: yup
    .date()
    .required('Ngày kết thúc không được để trống')
    .min(yup.ref('start_date'), 'Ngày kết thúc phải sau ngày bắt đầu'),
  location: yup.string().required('Vị trí không được để trống'),
  description: yup.string().required('Chi tiết không được để trống'),
});
export default function AddEventModal({ open, onClose, onCreateEvent, groups }) {
  AddEventModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onCreateEvent: PropTypes.func,
    groups: PropTypes.array,
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      status: false,
      group_id: '',
      event_type: '',
      start_date: '',
      end_date: '',
      location: '',
      description: '',
    },
    validationSchema: eventShcema,
    onSubmit: async (values) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userId = currentUser.id;
      values.user_id = userId;
      values.location = await getCoordinates(values.location)
      console.log(JSON.stringify(values))
      handleRequest('post', '/createEvent', values)
        .then((res) => {
          handleToast('success', res.data.message);
          formik.resetForm();
          onClose();
          onCreateEvent(true);
        })
        .catch((err) => {
          handleToast('error', err.response.data.message);
        });
    },
  });
  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Sự kiện
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="eva:close-fill" />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField
                label="Tên sự kiên"
                type="text"
                fullWidth
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.name}
                </p>
              )}
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="type-of-event">Loại sự kiện</InputLabel>
                <Select
                  labelId="type-of-event"
                  id="type-of-event-select"
                  name="event_type"
                  label="Loại sự kiện"
                  value={formik.values.event_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={'Trực tiếp'}>Trực tiếp</MenuItem>
                  <MenuItem value={'Trực tuyến'}>Trực tuyến</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.event_type && formik.errors.event_type && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.event_type}
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="type-of-status">Trạng thái</InputLabel>
                <Select
                  labelId="type-of-status"
                  id="type-of-status-select"
                  name="status"
                  label="Trạng thái"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={false}>Không công bố</MenuItem>
                  <MenuItem value={true}>Công bố</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.status && formik.errors.status && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.status}
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="type-of-group">Nhóm</InputLabel>
                <Select
                  labelId="type-of-group"
                  id="type-of-group-select"
                  name="group_id"
                  label="Nhóm"
                  value={formik.values.group_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {groups.length > 0 ? (
                    groups?.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={null}>Không có nhóm</MenuItem>
                  )}
                </Select>
              </FormControl>
              {formik.touched.group_id && formik.errors.group_id && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.group_id}
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Ngày tạo"
                type="datetime-local"
                name="start_date"
                fullWidth
                // value={openingDate}
                // onChange={(e) => setOpeningDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.start_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.start_date && formik.errors.start_date && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.start_date}
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Ngày kết thúc"
                type="datetime-local"
                fullWidth
                name="end_date"
                // value={openingDate}
                // onChange={(e) => setOpeningDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.end_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.end_date && formik.errors.end_date && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.end_date}
                </p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Vị trí"
                type="text"
                fullWidth
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.location}
                </p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextareaAuto
                label="Chi tiết"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {formik.errors.description}
                </p>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Hủy
          </Button>
          <Button autoFocus type="submit" variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
