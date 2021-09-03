import { Grid, Typography, Button } from '@material-ui/core';
import dashedButtonStyle from 'styles/buttons/dashed-button.module.scss';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { CustomCTADialog } from './custom-cta-dialog';

export const CustomCTA = () => {
 const [openDialog, setOpenDialog] = useState(false);

 return (
  <Grid item container xs={12}>
   <Grid item xs={12}>
    <Typography variant='h6' gutterBottom>
     Custom CTA Button
    </Typography>
   </Grid>
   <Grid item xs={12}>
    <Button onClick={() => setOpenDialog(true)} classes={{ root: dashedButtonStyle.root }} fullWidth>
     <AddIcon /> Custom CTA Button
    </Button>
   </Grid>
   {openDialog && <CustomCTADialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />}
  </Grid>
 );
};
