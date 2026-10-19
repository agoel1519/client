// Base API URL configuration
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '::1'
);

const PRODUCTION_API_URL = 'https://server-1unt.onrender.com';

const rawEnvUrl = import.meta.env.VITE_API_BASE_URL;

// Determine clean API host:
// If on a public domain (e.g. aevoraclinics.com), NEVER attempt to connect to localhost/127.0.0.1.
// Calling localhost from a public domain triggers Chrome's "Access other apps and services on this device" (Private Network Access) prompt.
export const API_BASE_URL = (() => {
  if (rawEnvUrl) {
    if (!isLocalhost && (rawEnvUrl.includes('localhost') || rawEnvUrl.includes('127.0.0.1'))) {
      return PRODUCTION_API_URL;
    }
    return rawEnvUrl.replace(/\/+$/, '');
  }
  if (isLocalhost) {
    return 'http://localhost:5001';
  }
  return PRODUCTION_API_URL;
})();

export const getApiBase = () => {
  const base = API_BASE_URL.replace(/\/+$/, '');
  return base.endsWith('/api') ? base : `${base}/api`;
};

export const API_BASE = getApiBase();

export default API_BASE_URL;

