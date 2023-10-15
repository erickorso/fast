import axios from 'axios';

const authApi = '/api/auth/';

export const singupService = (data: any) => axios.post(`${authApi}signup`, data)

export const singinService = (data: any) => axios.post(`${authApi}signin`, data)