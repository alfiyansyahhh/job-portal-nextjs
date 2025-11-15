/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { signOut } from 'next-auth/react';

const token = null;

const headers = {
  'Content-type': 'application/json',
  Accept: 'application/json',
};

if (token) {
  Object.assign(headers, { Authorization: `Bearer ${token}` });
}

const instances = axios.create({
  timeout: 1000000,
  headers,
});

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

function onFulfilledRequest(
  conf: AdaptAxiosRequestConfig
): AdaptAxiosRequestConfig {
  if (conf.data instanceof FormData) {
    delete conf.headers['Content-Type'];
  } else {
    conf.headers['Content-Type'] = 'application/json';
  }
  return conf;
}

function onRejectedRequest(err: any): Promise<any> {
  return Promise.reject(err);
}

function onFulFilledResponse(res: any): Promise<any> {
  return Promise.resolve(res);
}

function onRejectedResponse(err: any) {
  const response = err.response;

  if (response?.status === 401 && response?.config?.headers?.Authorization) {
    localStorage.clear();
    signOut();
    // window.location.replace("/login");

    return Promise.reject(err);
  }

  return Promise.reject(err);
}

instances.interceptors.request.use(onFulfilledRequest, onRejectedRequest);
instances.interceptors.response.use(onFulFilledResponse, onRejectedResponse);

export default instances;
