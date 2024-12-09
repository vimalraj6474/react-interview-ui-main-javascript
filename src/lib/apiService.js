import axios from "axios";

const API_BASE_URL = "http://localhost:9000/v1/widgets";

export const getWidgets = () => axios.get(API_BASE_URL);
export const getWidgetByName = (name) => axios.get(`${API_BASE_URL}/${name}`);
export const createWidget = (widget) => axios.post(API_BASE_URL, widget);
export const updateWidget = (name, widget) => axios.put(`${API_BASE_URL}/${name}`, widget);
export const deleteWidget = (name) => axios.delete(`${API_BASE_URL}/${name}`);
