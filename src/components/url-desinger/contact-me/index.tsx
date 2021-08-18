import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import hoverStyle from 'styles/hover-overlay.module.scss';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Input } from 'components/shared/input';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';
import { ContactMeDialog } from './contact-me-dialog';

export const ContactMe = () => {
 const [contactMeDialog, setContactMeDialog] = useState(false);

 const handleClose = () => setContactMeDialog(false);

 return (
  <Box className={hoverStyle.root}>
   <Grid item xs={12}>
    <Typography variant='h6' gutterBottom>
     Contact Me
    </Typography>
   </Grid>
   <Box style={{ margin: '0 1.5em' }}>
    <Grid container spacing={2}>
     <Grid item xs={12}>
      <Input label='Full Name' fullWidth disabled />
     </Grid>
     <Grid item xs={12}>
      <Input label='Email Address' fullWidth disabled />
     </Grid>
     <Grid item xs={12}>
      <Input label='Phone Number' fullWidth disabled />
     </Grid>
     <Grid item xs={12}>
      <Input label='Message' fullWidth disabled />
     </Grid>
     <Grid item xs={12}>
      <Button className={roundedButtonStyle.root} size='large' variant='contained' color='primary' fullWidth disabled>
       Send Message
      </Button>
     </Grid>
    </Grid>
   </Box>
   <Box onClick={() => setContactMeDialog(true)} className={hoverStyle.root_content}>
    <Typography variant='subtitle2' className='d-flex aling-items_center' color='textSecondary'>
     <EditOutlinedIcon fontSize='small' /> <b>Edit Contact Information</b>
    </Typography>
   </Box>
   <ContactMeDialog isOpen={contactMeDialog} onClose={handleClose} />
  </Box>
 );
};
