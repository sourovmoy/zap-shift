import axios from "axios";
import React, { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";

const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });
  const { user, signOutFunc } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const interceptor = instance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutFunc().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      instance.interceptors.request.eject(interceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, instance, navigate, signOutFunc]);
  return instance;
};

export default useAxios;
