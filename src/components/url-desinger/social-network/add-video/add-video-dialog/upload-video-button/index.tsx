import { Button, CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import style from '../../../social-network.module.scss';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { uploadContent } from 'adapters';
import { UploadType } from 'store/url-builder';

export interface UploadVideoButtonProps {
 onUpload(video: UploadType): void;
}

export const UploadVideoButton = ({ onUpload }: UploadVideoButtonProps) => {
 const [loading, setLoading] = useState(false);

 const handleVideoSelect = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files === null) return;

  setLoading(true);
  const videoFile = e.target.files[0];
  uploadContent(videoFile)
   .then(({ data }) => {
    if (!data.success) return;
    onUpload(data.data);
   })
   .finally(() => setLoading(false));
 };

 return (
  <>
   <input onChange={handleVideoSelect} style={{ display: 'none' }} accept='video/*' id='video-upload' type='file' disabled={loading} />
   <label htmlFor='video-upload'>
    <Button className={style.videoButton} component='span' disabled={loading}>
     {loading ? (
      <CircularProgress />
     ) : (
      <>
       <AttachFileIcon /> Attach Your Video
      </>
     )}
    </Button>
   </label>
  </>
 );
};
