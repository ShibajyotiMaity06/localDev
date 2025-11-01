import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}${url}`, { headers })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, deps);

  return { data, loading };
}
