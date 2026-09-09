export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
).replace(/\/$/, '');

export const API_PATHS = {
  login: '/api/v1/auth/login',
  currentUser: '/api/v1/auth/me',
  surveyResponses: '/api/v1/survey-responses',
};
