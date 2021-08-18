import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import dashedButtonStyle from 'styles/buttons/dashed-button.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { TestimonialsDialog } from './testimonials-dialog';
import { useSelector } from 'react-redux';
import { GetUrlBuilderData } from 'store/url-builder';
import { TestimonialCarousel } from './testimonial-carousel';

export const Testimonials = () => {
 const [dialog, setDialog] = useState(false);
 const builderData = useSelector(GetUrlBuilderData);

 const openDialog = () => {
  setDialog(true);
 };

 const handleDialogClose = () => setDialog(false);
 return (
  <Grid item container xs={12}>
   <Grid item xs={12}>
    <Typography variant='h6' gutterBottom>
     Testimonials
    </Typography>
   </Grid>
   <Grid item xs={12} style={{ paddingBottom: '2em' }}>
    <TestimonialCarousel testimonials={builderData.testimonials} />
   </Grid>
   <Grid item xs={12}>
    <Button onClick={openDialog} classes={{ root: dashedButtonStyle.root }} fullWidth>
     <AddIcon /> Add Testimonial
    </Button>
   </Grid>
   {dialog && <TestimonialsDialog isOpen={dialog} onClose={handleDialogClose} />}
  </Grid>
 );
};
