import * as React from 'react';
import { PropTypes } from 'prop-types';

import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import TextareaAuto from 'src/components/textarea/TextArea';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from "@mui/material/Button";
import eventServices from "../../services/event.services";
import { getCoordinates } from 'src/utils/const'
import { handleToast } from 'src/utils/toast';

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
export default function EditEventPanel({ onCreateEvent, groups, event }) {
  EditEventPanel.propTypes = {
    onClose: PropTypes.func,
    onCreateEvent: PropTypes.func,
    groups: PropTypes.array,
    event: PropTypes.any
  };
  const formik = useFormik({
    initialValues: {
      name: event.name,
      status: event.status,
      group_id: event.groups,
      event_type: event.event_type,
      start_date: event.start_date,
      end_date: event.end_date,
      location: event.location,
      description: event.description,
    },
    validationSchema: eventShcema,
    onSubmit: async (values) => {
      const curentUser = JSON.parse(localStorage.getItem('currentUser'))
      values.user_id = curentUser.id;
      values.id = event.id;
      values.location = await getCoordinates(values.location)
      console.log(values)
      eventServices.update({ data: values }).then((res) => {
        handleToast('success', res.message);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
            disabled
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
                groups.map((group) => (
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
      <Button autoFocus type="submit" variant="contained">
        Lưu
      </Button>
    </form>
  );
}
