import { Grid, Tab, Tabs } from '@material-ui/core';
import { DialogWrapper } from 'components/shared/dialog';
import React, { useState } from 'react';
import { UploadVideoButton } from './upload-video-button';
import { AddEmbedVideo } from './add-embed-video';
import { useDispatch, useSelector } from 'react-redux';
import { GetUrlBuilderData, SetUrlBuilderData, UploadType } from 'store/url-builder';
import { postVideo, VideoType } from 'adapters';

export interface AddVideoDialogProps {
 open: boolean;
 onClose(): void;
}

export const AddVideoDialog = ({ onClose, open }: AddVideoDialogProps) => {
 const builderData = useSelector(GetUrlBuilderData);
 const [loading, setLoading] = useState(false);
 const [video, setVideo] = useState<UploadType>(builderData.video?.file);
 const [tab, setTab] = useState(0);
 const dispatch = useDispatch();

 const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setTab(newValue);

 const handleSubmit = () => {
  setLoading(true);
  postVideo({ file: video._id, actionType: VideoType.Regular })
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
    onClose();
   })
   .finally(() => setLoading(false));
 };

 return (
  <DialogWrapper title='Social Networks' onClose={onClose} open={open} onSubmit={handleSubmit} loading={loading}>
   <Grid item xs={12} className='mb-3'>
    <Tabs value={tab} indicatorColor='primary' textColor='primary' onChange={handleChange} variant='fullWidth'>
     <Tab label='Upload Video' />
     <Tab label='Embed Video' />
    </Tabs>
   </Grid>
   {tab === 0 && (
    <Grid item xs={12}>
     <UploadVideoButton video={video} setVideo={setVideo} />
    </Grid>
   )}
   {tab === 1 && (
    <Grid item xs={12}>
     <AddEmbedVideo />
    </Grid>
   )}
  </DialogWrapper>
 );
};
