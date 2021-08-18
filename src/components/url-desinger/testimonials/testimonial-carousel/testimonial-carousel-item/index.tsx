import React from 'react';
import { Box, Grid, Card, Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Testimonial } from 'store/url-builder';
import styles from './testimonial-carousel-item.module.scss';
import { APIBASE } from 'environment';

export interface TestimonialCarouselItemProps {
 testimonial: Testimonial;
}

export const TestimonialCarouselItem = ({ testimonial }: TestimonialCarouselItemProps) => {
 return (
  <Box className='ml-2 mr-2 h-100'>
   <Grid container spacing={3}>
    <Grid item xs={12}>
     <Card variant='outlined' classes={{ root: styles.card }}>
      <Rating value={testimonial.rating} disabled className='mb-2' />
      <Typography variant='body2'>{testimonial.comment}</Typography>
     </Card>
    </Grid>
    <Grid item container xs={12} justifyContent='center' alignItems='center'>
     <Box display='flex' flexDirection='column' alignItems='center'>
      <Avatar classes={{ root: styles.avatar }} src={APIBASE + '/' + testimonial.userPhoto.filePath} />
      <Typography classes={{ root: styles.reviewerName }}>{testimonial.fullName}</Typography>
      <Typography classes={{ root: styles.reviewerTitle }}>{testimonial.title}</Typography>
     </Box>
    </Grid>
   </Grid>
  </Box>
 );
};
