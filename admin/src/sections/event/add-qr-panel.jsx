import * as React from 'react';
import { PropTypes } from 'prop-types';

import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import TextareaAuto from 'src/components/textarea/TextArea';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import eventServices from '../../services/event.services';
import { getCoordinates } from 'src/utils/const';
import { handleToast } from 'src/utils/toast';
import Iconify from 'src/components/iconify';

export default function AddQRPanel({ areas }) {
  AddQRPanel.propTypes = {
    areas: PropTypes.any,
  };
  const [qr, setQR] = React.useState([]);
  const handleCreateQR = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    const newData = areas.find((item) => item.id === values.area);
    const dataCreate = {
      event_id: newData.event_id,
      area_id: newData.id,
    };
    eventServices.createQR({ data: dataCreate }).then((res) => {
      handleToast('success', res.message);
    });
  };
  React.useEffect(() => {
    if (areas.length > 0) {
      eventServices.getQRbyEventId({ event_id: areas[0].event_id }).then((res) => {
        setQR(res);
      });
    }
  }, [areas]);
  const findArea = (id) => {
    return areas.find((item) => item.id === id)?.name 
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <form onSubmit={handleCreateQR}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="type-of-group">Khu vực</InputLabel>
              <Select labelId="type-of-group" id="type-of-group-select" name="area" label="Khu vực">
                {areas.length > 0 ? (
                  areas.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={null}>Không có khu vực</MenuItem>
                )}
              </Select>
            </FormControl>
            <Button autoFocus type="submit" variant="contained">
              Lưu
            </Button>
          </Stack>
        </form>
      </Grid>
      <Grid item xs={8}>
        <List>
          {qr.length > 0 ? (
            qr.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <Iconify icon="material-symbols:delete" />
                  </IconButton>
                }
              >
                <ListItemText primary={item.code} secondary={findArea(item.area_id) ?? 'Trống'} />
              </ListItem>
            ))
          ) : (
            <Typography>Không có QR được tạo</Typography>
          )}
        </List>
      </Grid>
    </Grid>
  );
}
