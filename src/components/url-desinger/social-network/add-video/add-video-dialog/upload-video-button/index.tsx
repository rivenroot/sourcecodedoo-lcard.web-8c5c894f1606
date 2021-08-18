import { Button, CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import style from '../../../social-network.module.scss';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { uploadContent } from 'adapters';
import ReactPlayer from 'react-player';
import { APIBASE } from 'environment';

export interface UploadVideoButtonProps {
 video: any;
 setVideo(video: any): void;
}

export const UploadVideoButton = ({ video, setVideo }: UploadVideoButtonProps) => {
 const [loading, setLoading] = useState(false);

 const handleVideoSelect = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files === null) return;

  setLoading(true);
  const videoFile = e.target.files[0];
  uploadContent(videoFile)
   .then(({ data }) => {
    if (!data.success) return;
    setVideo(data.data);
   })
   .finally(() => setLoading(false));
 };

 if (video) return <ReactPlayer url={APIBASE + '/' + video.filePath} controls width="100%" />;

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
