import React, { ChangeEvent, useState } from 'react';
import { Fab, FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { DialogWrapper } from 'components/shared/dialog';
import circleButton from 'styles/buttons/circle-button.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postTestimonials, uploadContent } from 'adapters';
import { useDispatch, useSelector } from 'react-redux';
import { GetUrlBuilderData, SetUrlBuilderData, Testimonial } from 'store/url-builder';

const schema = yup.object().shape({
 rating: yup.string().required(),
 comment: yup.string().required(),
 fullName: yup.string().required(),
 title: yup.string().required(),
});

export const TestimonialsDialog = ({ isOpen, onClose }: any) => {
 const [userImage, setUserImage] = useState<File>();
 const [loading, setLoading] = useState(false);
 const dispatch = useDispatch();
 const builderData = useSelector(GetUrlBuilderData);

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema) });

 const handleImageSelected = (e: ChangeEvent<HTMLInputElement>) => e.target.files !== null && setUserImage(e.target.files[0]);

 const submit = async (data: Testimonial) => {
  try {
   data.rating = Number(data.rating);

   if (userImage) {
    const { data: avatarImage, message, success } = (await uploadContent(userImage)).data;
    if (!success) throw new Error(message);

    data.userPhoto = avatarImage;
   }

   setLoading(true);
   postTestimonials([...builderData.testimonials, data])
    .then(({ data }) => {
     if (!data.success) return;
     dispatch(SetUrlBuilderData(data.data));
     onClose();
    })
    .finally(() => setLoading(false));
  } catch (er) {}
 };

 return (
  <DialogWrapper open={isOpen} onClose={onClose} title='Testimonials' onSubmit={handleSubmit(submit)} loading={loading}>
   <Grid item xs={12} className='mb-4'>
    <Typography variant='subtitle2'>Raiting</Typography>
    <Rating {...register('rating')} />
    {errors.rating && (
     <FormHelperText variant='outlined' error>
      {errors.rating?.message}
     </FormHelperText>
    )}
   </Grid>
   <Grid item xs={12} className='mb-4'>
    <Typography variant='subtitle2'>Comment</Typography>
    <TextField {...register('comment')} multiline rows={7} fullWidth error={!!errors.comment} helperText={errors.comment?.message} />
   </Grid>
   <Grid item xs={12} className='mb-4'>
    <input onChange={handleImageSelected} style={{ display: 'none' }} accept='images/*' id='image-upload' type='file' />
    <label htmlFor='image-upload'>
     <Typography variant='subtitle2'>User Photo</Typography>
     <Fab classes={{ root: circleButton.root }} color='primary' aria-label='add' component='span'>
      <AddIcon />
     </Fab>
    </label>
   </Grid>
   <Grid item xs={12} className='mb-4'>
    <Typography variant='subtitle2'>Full Name</Typography>
    <TextField {...register('fullName')} error={!!errors.fullName} helperText={errors.fullName?.message} fullWidth />
   </Grid>
   <Grid item xs={12} className='mb-4'>
    <Typography variant='subtitle2'>Title</Typography>
    <TextField {...register('title')} error={!!errors.title} helperText={errors.title?.message} fullWidth />
   </Grid>
  </DialogWrapper>
 );
};
