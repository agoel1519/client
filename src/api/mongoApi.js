/**
 * Aevora MongoDB Atlas API Service
 * Connects the React client to Express + MongoDB Atlas backend
 */

const API_BASE = 'http://localhost:5001/api';

export const checkMongoHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      database: { connected: false, status: 'offline', host: 'Unavailable' }
    };
  }
};

export const getDbTreatments = async () => {
  try {
    const res = await fetch(`${API_BASE}/treatments`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('Failed to fetch treatments');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('MongoDB fetch notice, using local catalog:', err.message);
    return null;
  }
};

export const getDbTreatmentBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/treatments/${slug}`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    return null;
  }
};

export const saveDbTreatment = async (treatmentData) => {
  try {
    const res = await fetch(`${API_BASE}/treatments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(treatmentData)
    });
    return await res.json();
  } catch (err) {
    console.warn('MongoDB save notice:', err.message);
    return { success: false, error: err.message };
  }
};

export const deleteDbTreatment = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/treatments/${slug}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    console.warn('MongoDB delete notice:', err.message);
    return { success: false, error: err.message };
  }
};

export const submitAppointmentBooking = async (appointmentData) => {
  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });
    return await res.json();
  } catch (err) {
    console.warn('MongoDB appointment booking notice:', err.message);
    return { success: false, error: err.message };
  }
};

export const getDbAppointments = async () => {
  try {
    const res = await fetch(`${API_BASE}/appointments`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    return [];
  }
};

export const updateAppointmentStatus = async (id, status) => {
  try {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};
