import { FC, createContext, useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { http } from 'adapters';
import { toast } from 'react-toastify';

export const ErrorHandlerContext = createContext(null);

export const ErrorHandlerProvider: FC = ({ children }: any) => {
 useEffect(() => {
  http.interceptors.response.use(
   (response: AxiosResponse) => {
    const { data } = response;
    if (data.error) toast.error(data.message);
    return response;
   },
   (error: AxiosError) => {
    toast.error(error.response?.data.message || error.message);
    throw error;
   }
  );
 }, []);

 return <ErrorHandlerContext.Provider value={null}>{children}</ErrorHandlerContext.Provider>;
};
