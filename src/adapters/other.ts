import { http } from '.';
import { ResponseProps } from './../types/response';

export enum OTHERAPI {
 UPLOAD = '/user-file/upload',
}

export const uploadContent = (file: File) => {
 const formData = new FormData();
 formData.append('file', file);

 return http.post<ResponseProps>(OTHERAPI.UPLOAD, formData, {
  headers: {
   'Content-Type': 'multipart/form-data',
  },
 });
};
