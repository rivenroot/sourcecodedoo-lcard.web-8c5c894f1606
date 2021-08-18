import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import style from '../social-network.module.scss';
import { AddSocialDialog } from './add-social-dialog';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { GetUrlBuilderData } from 'store/url-builder';

export enum SocialProvider {
 FACEBOOK = 'Facebook',
 INSTAGRAM = 'Instagram',
 PINTEREST = 'Pinerest',
}

export const getSocialIcon = (provider: SocialProvider, { width, height }: { width: number; height: number }) => {
 switch (provider) {
  case SocialProvider.FACEBOOK:
   return <FaFacebook style={{ width, height }} />;
  case SocialProvider.INSTAGRAM:
   return <FaInstagram style={{ width, height }} />;
  case SocialProvider.PINTEREST:
   return <FaPinterest style={{ width, height }} />;
 }
};

export const AddSocial = () => {
 const builderData = useSelector(GetUrlBuilderData);
 const [openDialog, setOpenDialog] = useState(false);
 const handleDialogClose = () => setOpenDialog(false);

 return (
  <Grid container spacing={1}>
   {builderData.socialNetworks.map((social) => {
    if (social.networkName.length === 0) return '';
    return (
     <Grid item>
      <Fab onClick={() => setOpenDialog(true)} aria-label='add'>
       {getSocialIcon(social.networkName as SocialProvider, { width: 56, height: 56 })}
      </Fab>
     </Grid>
    );
   })}
   <Grid item>
    <Fab onClick={() => setOpenDialog(true)} classes={{ root: style.networksButton }} color='primary' aria-label='add'>
     <AddIcon />
    </Fab>
   </Grid>
   {openDialog && <AddSocialDialog isOpen={openDialog} onClose={handleDialogClose} />}
  </Grid>
 );
};
