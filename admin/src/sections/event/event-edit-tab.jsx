import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditEventPanel from './edit-event-panel';
import Button from '@mui/material/Button';
import UserListPanel from './user-list';
import attendanceServices from 'src/services/attendance.services';
import AddQRPanel from './add-qr-panel';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EventEditTab({ event, groups, areas }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await attendanceServices.getAttendanceByEventId(event.id);
      setUsers(response);
    };
    fetchUsers();
  }, [event]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Thông tin chung" {...a11yProps(0)} />
          <Tab label="Tạo QR" {...a11yProps(1)} />
          <Tab label="Người dùng" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <EditEventPanel groups={groups} event={event} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddQRPanel eventId={event.id} areas={areas} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UserListPanel users={users} />
      </CustomTabPanel>
    </Box>
  );
}
