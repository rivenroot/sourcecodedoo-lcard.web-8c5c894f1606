import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import style from '../social-network.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { AddVideoDialog } from './add-video-dialog';

export const VideoUpload = (params: any) => {
 const [openDialog, setOpenDialog] = useState(false);

 return (
  <>
   <Button onClick={() => setOpenDialog(true)} className={style.videoButton}>
    <AddIcon /> Embed Video
   </Button>
   {openDialog && <AddVideoDialog open={openDialog} onClose={() => setOpenDialog(false)} />}
  </>
 );
};
