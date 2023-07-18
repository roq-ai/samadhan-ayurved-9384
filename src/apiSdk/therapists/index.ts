import axios from 'axios';
import queryString from 'query-string';
import { TherapistInterface, TherapistGetQueryInterface } from 'interfaces/therapist';
import { GetQueryInterface } from '../../interfaces';

export const getTherapists = async (query?: TherapistGetQueryInterface) => {
  const response = await axios.get(`/api/therapists${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTherapist = async (therapist: TherapistInterface) => {
  const response = await axios.post('/api/therapists', therapist);
  return response.data;
};

export const updateTherapistById = async (id: string, therapist: TherapistInterface) => {
  const response = await axios.put(`/api/therapists/${id}`, therapist);
  return response.data;
};

export const getTherapistById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/therapists/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTherapistById = async (id: string) => {
  const response = await axios.delete(`/api/therapists/${id}`);
  return response.data;
};
