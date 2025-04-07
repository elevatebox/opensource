import axios from 'axios';

const API_URL = 'http://localhost:5000/api/attendance';

export const addAttendance = (data) => axios.post(API_URL, data);
export const getAttendance = () => axios.get(API_URL);
export const updateAttendance = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteAttendance = (id) => axios.delete(`${API_URL}/${id}`);
