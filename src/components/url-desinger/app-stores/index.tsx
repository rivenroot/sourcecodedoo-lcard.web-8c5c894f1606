import React, { useState } from 'react';
import dashedButtonStyle from 'styles/buttons/dashed-button.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Typography, Button } from '@material-ui/core';
import { AppStoresDialog } from './app-stores-dialog';

export enum Store {
 GOOGLEPLAY = 'Google Play',
}

export const AppStores = () => {
 const [openDialog, setOpenDialog] = useState(false);

 return (
  <Grid item container xs={12}>
   <Grid item xs={12}>
    <Typography variant='h6' gutterBottom>
     App. Stores
    </Typography>
   </Grid>
   <Grid item xs={12}>
    <Button onClick={() => setOpenDialog(true)} classes={{ root: dashedButtonStyle.root }} fullWidth>
     <AddIcon /> Add Store
    </Button>
   </Grid>
   {openDialog && <AppStoresDialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />}
  </Grid>
 );
};
