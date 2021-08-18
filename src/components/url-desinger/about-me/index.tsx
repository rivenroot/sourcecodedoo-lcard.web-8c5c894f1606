import { Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import style from './about-me.module.scss';
import { EditAboutMeDialog } from './edit-about-me-dialog';

export const AboutMe = () => {
 const [editAboutMeDialog, setEditAboutMeDialog] = useState(false);

 const openEditAboutMeDialog = () => setEditAboutMeDialog(true);
 const handleEditAboutMeDialogClose = () => setEditAboutMeDialog(false);

 return (
  <Grid item container xs={12}>
   <Grid item xs={12}>
    <Typography variant='h6' gutterBottom>About Me</Typography>
   </Grid>
   <Grid item xs={12}>
    <Button onClick={openEditAboutMeDialog} classes={{ root: style.root }} fullWidth>
     <AddIcon /> Add Text
    </Button>
   </Grid>
   {editAboutMeDialog && <EditAboutMeDialog isOpen={editAboutMeDialog} onClose={handleEditAboutMeDialogClose} />}
  </Grid>
 );
};
