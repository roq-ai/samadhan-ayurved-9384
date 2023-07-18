import axios from 'axios';
import queryString from 'query-string';
import { HealthCoachInterface, HealthCoachGetQueryInterface } from 'interfaces/health-coach';
import { GetQueryInterface } from '../../interfaces';

export const getHealthCoaches = async (query?: HealthCoachGetQueryInterface) => {
  const response = await axios.get(`/api/health-coaches${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createHealthCoach = async (healthCoach: HealthCoachInterface) => {
  const response = await axios.post('/api/health-coaches', healthCoach);
  return response.data;
};

export const updateHealthCoachById = async (id: string, healthCoach: HealthCoachInterface) => {
  const response = await axios.put(`/api/health-coaches/${id}`, healthCoach);
  return response.data;
};

export const getHealthCoachById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/health-coaches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHealthCoachById = async (id: string) => {
  const response = await axios.delete(`/api/health-coaches/${id}`);
  return response.data;
};
