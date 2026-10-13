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

// --- CMS Settings API ---

export const getDbSetting = async (key) => {
  try {
    const res = await fetch(`${API_BASE}/settings/${key}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const json = await res.json();
      if (json && json.value !== undefined) {
        try {
          localStorage.setItem(`aevora_setting_${key}`, JSON.stringify(json.value));
        } catch (e) {}
        return json.value;
      }
    }
  } catch (err) {
    // Server offline or network issue
  }

  // Resilient fallback to browser local storage
  try {
    const cached = localStorage.getItem(`aevora_setting_${key}`);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {}
  return null;
};

export const saveDbSetting = async (key, value) => {
  // 1. Immediately cache in localStorage so changes are never lost
  try {
    localStorage.setItem(`aevora_setting_${key}`, JSON.stringify(value));
  } catch (e) {}

  // 2. Persist to MongoDB Atlas backend
  try {
    const res = await fetch(`${API_BASE}/settings/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    if (res.ok) {
      return await res.json();
    }
    return { success: true, offline: true, warning: 'Saved locally in browser cache' };
  } catch (err) {
    console.warn(`MongoDB save setting ${key} notice (backend offline, saved locally):`, err.message);
    return { 
      success: true, 
      offline: true, 
      warning: 'Saved locally in browser cache. Start backend server (port 5001) to sync with MongoDB Atlas.' 
    };
  }
};

// --- CMS Pages API ---

export const getDbPages = async () => {
  try {
    const res = await fetch(`${API_BASE}/pages`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('Failed to fetch pages');
    return await res.json();
  } catch (err) {
    console.warn('MongoDB fetch pages notice:', err.message);
    return [];
  }
};

export const getDbPageBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const saveDbPage = async (pageData) => {
  try {
    // Determine if creating or updating based on existing page presence
    const check = await fetch(`${API_BASE}/pages/${pageData.slug}`);
    
    const method = check.ok ? 'PUT' : 'POST';
    const url = check.ok ? `${API_BASE}/pages/${pageData.slug}` : `${API_BASE}/pages`;
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageData)
    });
    return await res.json();
  } catch (err) {
    console.warn('MongoDB save page notice:', err.message);
    return { success: false, error: err.message };
  }
};

export const deleteDbPage = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    console.warn('MongoDB delete page notice:', err.message);
    return { success: false, error: err.message };
  }
};

// --- CMS Media API ---
export const getDbMedia = async () => {
  try {
    const res = await fetch(`${API_BASE}/media`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
};

export const uploadMedia = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/media`, {
      method: 'POST',
      body: formData // No Content-Type header; browser sets it automatically with boundary for FormData
    });
    if (!res.ok) {
      const errRes = await res.json();
      throw new Error(errRes.message || 'Upload failed');
    }
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const saveDbMedia = async (mediaData) => {
  try {
    const res = await fetch(`${API_BASE}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mediaData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteDbMedia = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/media/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};
