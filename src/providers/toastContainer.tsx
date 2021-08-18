import { FC, createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainerContext = createContext(null);

export const ToastContainerProvider: FC = ({ children }: any) => (
 <ToastContainerContext.Provider value={null}>
  {children}
  <ToastContainer />
 </ToastContainerContext.Provider>
);
