// src/api/providers.api.js
import api from './axios';

/**
 * getProviders - fetch providers list with optional query params
 * params: { profession, status, page, limit, q }
 */
export const getProviders = async (params = {}) => {
  const res = await api.get('/providers', { params });
  return res.data; // array of providers
};

/**
 * getProviderByIdClient - backend doesn't expose /providers/:id in current API.
 * Fallback: fetch all providers and return the one matching id.
 */
export const getProviderById  = async (id) => {
  const providers = await getProviders();
  return providers.find(p => String(p._id || p.id) === String(id)) || null;
};

/**
 * createProvider - provider-only; body should include: name, profession, phone, hourlyRate, bio, calender...
 */
export const createProvider = async (body) => {
  const res = await api.post('/providers', body);
  return res.data;
};

/**
 * updateProvider
 */
export const updateProvider = async (id, body) => {
  const res = await api.put(`/providers/${id}`, body);
  return res.data;
};

/**
 * deleteProvider
 */
export const deleteProvider = async (id) => {
  const res = await api.delete(`/providers/${id}`);
  return res.data;
};
