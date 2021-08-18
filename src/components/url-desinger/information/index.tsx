import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import style from './information.module.scss';
import hoverStyle from 'styles/hover-overlay.module.scss';
import { EditInformationDialog } from './edit-information-dialog';

export const Information = () => {
 const [informationDialog, setInformationDialog] = useState(false);

 const openInformationDialog = () => setInformationDialog(true);
 const handleCloseInformationDialog = () => setInformationDialog(false);

 return (
  <Box className={hoverStyle.root} width='100%' display='flex'>
   <Grid item container xs={12} style={{ padding: '1.5em' }} spacing={4}>
    <Grid item container xs={12} justifyContent='space-between'>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <CallIcon color='primary' /> <b>Call</b>
     </Typography>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <MailOutlineIcon color='primary' /> <b>Email</b>
     </Typography>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <ChromeReaderModeIcon color='primary' /> <b>Card Info</b>
     </Typography>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <CropFreeIcon color='primary' /> <b>QR Code</b>
     </Typography>
    </Grid>
    <Grid item container xs={12} justifyContent='space-between'>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <DateRangeIcon color='primary' /> <b>Calendar</b>
     </Typography>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <RoomOutlinedIcon color='primary' /> <b>Navigate</b>
     </Typography>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <LanguageOutlinedIcon color='primary' /> <b>Website</b>
     </Typography>
     <Typography variant='subtitle2' color='textPrimary' className={style.wrapIcon}>
      <LinkOutlinedIcon color='primary' /> <b>Links</b>
     </Typography>
    </Grid>
   </Grid>
   <Grid onClick={openInformationDialog} item xs={12} className={hoverStyle.root_content}>
    <Typography variant='subtitle2' className='d-flex aling-items_center' color='textSecondary'>
     <EditOutlinedIcon fontSize='small' /> <b>Edit Information</b>
    </Typography>
   </Grid>
   {informationDialog && <EditInformationDialog isOpen={informationDialog} onClose={handleCloseInformationDialog} />}
  </Box>
 );
};
