import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';
import { Input } from 'components/shared/input';
import style from './contact-me-form.module.scss';

export interface ContactMeFormProps {
 color?: string;
}

export const ContactMeForm = ({ color }: ContactMeFormProps) => {
 return (
  <Box className={style.root} style={{ backgroundColor: color }}>
   <Grid container spacing={2}>
    <Grid item xs={12}>
     <Input label='Full Name' fullWidth />
    </Grid>
    <Grid item xs={12}>
     <Input label='Email Address' fullWidth />
    </Grid>
    <Grid item xs={12}>
     <Input label='Phone Number' fullWidth />
    </Grid>
    <Grid item xs={12}>
     <Typography variant='subtitle2'>Message</Typography>
     <TextField multiline rows={6} fullWidth  />
    </Grid>
    <Grid item xs={12}>
     <Button
      style={{ backgroundColor: color && '#fff', color: color && '#F4A300' }}
      className={roundedButtonStyle.root}
      size='large'
      variant='contained'
      color='primary'
      fullWidth>
      Send Message
     </Button>
    </Grid>
   </Grid>
  </Box>
 );
};
