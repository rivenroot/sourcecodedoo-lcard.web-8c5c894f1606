import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ImportImagesCarousel } from './add-image';
import { VideoUpload } from './add-video';
import { AddSocial } from './socials/add-social';

export const SocialNetwork = () => {
 return (
  <Grid item container xs={12} spacing={3}>
   <Grid item xs={12}>
    <Typography variant='h6' gutterBottom>Social Networks</Typography>
   </Grid>
   <Grid item xs={12}>
    <AddSocial />
   </Grid>
   <Grid item xs={12}>
    <VideoUpload />
   </Grid>
   <Grid item xs={12}>
    <ImportImagesCarousel />
   </Grid>
   <Grid item xs={12}></Grid>
  </Grid>
 );
};
