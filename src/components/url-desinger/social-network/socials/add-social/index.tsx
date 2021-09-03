import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import style from 'components/url-desinger/social-network/social-network.module.scss';
import { AddSocialDialog } from './add-social-dialog';
import { useSelector } from 'react-redux';
import { GetUrlBuilderData } from 'store/url-builder';
import { SocialNetworkList } from '../socials-list';

export enum SocialProvider {
 FACEBOOK = 'Facebook',
 INSTAGRAM = 'Instagram',
 PINTEREST = 'Pinerest',
}

export const AddSocial = () => {
 const builderData = useSelector(GetUrlBuilderData);
 const [openDialog, setOpenDialog] = useState(false);
 const handleDialogClose = () => setOpenDialog(false);

 return (
  <Grid container spacing={1}>
   <Grid item>
    <SocialNetworkList socialNetworks={builderData.socialNetworks} onItemClick={() => setOpenDialog(true)} />
   </Grid>
   <Grid item>
    <Fab onClick={() => setOpenDialog(true)} classes={{ root: style.networksButton }} color='primary' aria-label='add'>
     <AddIcon />
    </Fab>
   </Grid>
   {openDialog && <AddSocialDialog isOpen={openDialog} onClose={handleDialogClose} />}
  </Grid>
 );
};
