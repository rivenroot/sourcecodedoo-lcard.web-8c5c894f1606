import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import hoverStyle from 'styles/hover-overlay.module.scss';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { ContactMeDialog } from './contact-me-dialog';
import { ContactMeForm } from 'components/shared/contact-me-form';
import { useSelector } from 'react-redux';
import { GetUrlBuilderData } from 'store/url-builder';

export const ContactMe = () => {
 const urlBuilder = useSelector(GetUrlBuilderData);
 const [contactMeDialog, setContactMeDialog] = useState(false);
 const handleClose = () => setContactMeDialog(false);

 return (
  <Box className={hoverStyle.root}>
   <Typography variant='h6' gutterBottom>
    Contact Me
   </Typography>
   <ContactMeForm color={urlBuilder.primaryColor} />
   <Box onClick={() => setContactMeDialog(true)} className={hoverStyle.root_content}>
    <Typography variant='subtitle2' className='d-flex aling-items_center' color='textSecondary'>
     <EditOutlinedIcon fontSize='small' /> <b>Edit Contact Information</b>
    </Typography>
   </Box>
   {contactMeDialog && <ContactMeDialog isOpen={contactMeDialog} onClose={handleClose} />}
  </Box>
 );
};
