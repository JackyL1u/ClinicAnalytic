import axios from 'axios';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

const DEFAULT_ERROR = 'Something went wrong - Please try again later.';

const post = async (url, authToken, data = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers.Authorization = `Token ${authToken}`;

  try {
    return await fetch(`${process.env.REACT_APP_API_ROOT}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    throw new Error(DEFAULT_ERROR);
  }
};


export const login = async (data = {}) => {
  let responseData = null;
  let error = DEFAULT_ERROR;

  const response = await post('/api/auth/login/', null, data);

  responseData = await response.json();

  if (response.status !== 200) {
    try {
      error = responseData.non_field_errors[0];
    } catch (_) {
      error = DEFAULT_ERROR;
    }
    throw new Error(error);
  }

  return responseData;
};

export const register = async (data = {}) => {
  let responseData = null;
  let error = DEFAULT_ERROR;

  const response = await post('/api/auth/register/', null, data);

  responseData = await response.json();

  if (response.status !== 200) {
    try {
      error = responseData.non_field_errors[0];
    } catch (_) {
      error = DEFAULT_ERROR;
    }
    throw new Error(error);
  }

  return responseData;
};


export const verifySession = async (token) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/auth/`, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const getRecords = async (token) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/records/get/`, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const analyzeData = async (token) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/analyze/`, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};


export const addDoctor = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/doctor/add`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const analyzeDoctor = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/analyze/doctor`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const addPatient = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/records/add/patient`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const addProcedure = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/doctor/procedure`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};