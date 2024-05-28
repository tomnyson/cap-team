import axios from 'axios';
import { API_GETALL_ATTENDANCE_BY_EVENTID } from './const.js';

const attendanceServices = {
  getAttendanceByEventId: async (eventId) => {
    try {
      const response = await axios.get(`${API_GETALL_ATTENDANCE_BY_EVENTID}?event_id=${eventId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default attendanceServices;
