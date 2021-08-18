import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { SocialProvider, getSocialIcon } from '..';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import style from '../../social-network.module.scss';
import { DialogWrapper } from 'components/shared/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';
import { postSocialNetworks } from 'adapters';

interface AddSocialDialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const AddSocialDialog = ({ isOpen, onClose }: AddSocialDialogProps) => {
 const builderData = useSelector(GetUrlBuilderData);
 const dispatch = useDispatch();
 const [loading, setLoading] = useState(false);
 const [socials, setSocials] = useState(builderData.socialNetworks);

 const handleSubmit = () => {
  setLoading(true);

  postSocialNetworks(socials)
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
    onClose();
   })
   .finally(() => setLoading(false));
 };

 const selectProvider = (provider: SocialProvider, idx: number) => {
  const _socials = [...socials];
  _socials[idx].networkName = provider;
  setSocials(_socials);
 };

 const changeUrl = (url: string, idx: number) => {
  const _socials = [...socials];
  _socials[idx].url = url;
  setSocials(_socials);
 };

 const addNewSocial = () => setSocials([...socials, { networkName: '', url: '' }]);

 const removeSocial = (idx: number) => setSocials(socials.filter((_, index) => index !== idx));

 return (
  <DialogWrapper title='Social Networks' onClose={onClose} open={isOpen} onSubmit={handleSubmit} loading={loading}>
   {socials.map((social, idx) => (
    <Grid container item xs={12} className='mb-3'>
     <Grid xs className='mr-2'>
      <Typography variant='subtitle2'>Select Social Network</Typography>
      <FormControl fullWidth>
       <Select
        classes={{ root: style.socialSelect }}
        labelId='providers-label'
        id='providers'
        value={social.networkName}
        onChange={(e) => selectProvider(e.target.value as SocialProvider, idx)}>
        {Object.keys(SocialProvider).map((key) => {
         const sProvider = (SocialProvider as any)[key];
         return (
          <MenuItem value={sProvider}>
           <Box display='inline-flex' alignItems='center'>
            <Box marginRight='5px' display='inline-flex'>
             {getSocialIcon(sProvider, { width: 24, height: 24 })}
            </Box>
            {sProvider}
           </Box>
          </MenuItem>
         );
        })}
       </Select>
      </FormControl>
     </Grid>
     <Grid xs className='ml-2'>
      <Typography variant='subtitle2'>Enter URL</Typography>
      <TextField value={social.url} onChange={(e) => changeUrl(e.target.value, idx)} fullWidth />
     </Grid>
     <Grid item container alignItems='flex-end' xs={1}>
      <IconButton onClick={() => removeSocial(idx)} className='mb-1'>
       <HighlightOffIcon color='error' />
      </IconButton>
     </Grid>
    </Grid>
   ))}
   <Grid item container xs={12} justifyContent='center'>
    <Button onClick={addNewSocial} style={{ textTransform: 'none' }}>
     <AddIcon /> Add New Social Network
    </Button>
   </Grid>
  </DialogWrapper>
 );
};
