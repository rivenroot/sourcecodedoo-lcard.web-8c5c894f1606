import React, { useState } from 'react';
import { Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DialogWrapper } from 'components/shared/dialog';
import { Input } from 'components/shared/input';
import { postInformations } from 'adapters';
import { GetUrlBuilderData, InfoLinks, SetUrlBuilderData } from 'store/url-builder';
import { useDispatch, useSelector } from 'react-redux';

const schemaInformation = yup.object().shape({
 phoneNumber: yup.string().label('Phone Number'),
 email: yup.string().email().label('Email'),
 location: yup.string().label('Location'),
 website: yup.string().label('Website'),
});

export interface EditInformationDialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const EditInformationDialog = ({ isOpen, onClose }: EditInformationDialogProps) => {
 const dispatch = useDispatch();
 const builderData = useSelector(GetUrlBuilderData);
 const [loading, setLoading] = useState(false);
 const [links, setLinks] = useState<InfoLinks[]>(builderData.info.links);

 const {
  handleSubmit,
  control,
  formState: { errors },
 } = useForm<any>({ resolver: yupResolver(schemaInformation), defaultValues: builderData.info });

 const handleLinkChange = (link: InfoLinks, index: number) => {
  const updatedLinks = [...links];
  updatedLinks[index] = link;
  setLinks(updatedLinks);
 };

 const addLink = () => setLinks([...links, { title: '', url: '' }]);
 const removeLink = (idx: number) => setLinks(links.filter((link, index) => idx !== index));

 const submit = (formData: any) => {
  setLoading(true);
  postInformations({ ...formData, links })
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
    onClose();
   })
   .finally(() => setLoading(false));
 };

 return (
  <DialogWrapper open={isOpen} onClose={onClose} onSubmit={handleSubmit(submit)} loading={loading} title='Edit Information'>
   {Object.keys(schemaInformation.fields).map((key) => {
    const field = schemaInformation.fields[key] as any;
    return (
     <Grid key={key} item xs={12} className='mb-3'>
      <Controller
       control={control}
       name={key}
       render={({ field: { onChange, value } }) => (
        <Input
         label={field.spec.label}
         onChange={onChange}
         value={value}
         error={!!errors[key]}
         helperText={errors[key]?.message}
         fullWidth
         disabled={loading}
        />
       )}
      />
     </Grid>
    );
   })}
   <Grid item xs={12}>
    <Typography variant='h6' gutterBottom>
     Links
    </Typography>
   </Grid>
   <Grid container item xs={12} spacing={2} className='mb-3'>
    {links.map((link, idx) => (
     <>
      <Grid item>
       <Typography variant='subtitle2'>Title</Typography>
       <TextField onChange={(e) => handleLinkChange({ ...link, title: e.target.value }, idx)} value={link.title} fullWidth disabled={loading} />
      </Grid>
      <Grid item>
       <Typography variant='subtitle2'>URL</Typography>
       <TextField onChange={(e) => handleLinkChange({ ...link, url: e.target.value }, idx)} value={link.url} fullWidth disabled={loading} />
      </Grid>
      <Grid item container alignItems='flex-end' xs={1}>
       <IconButton onClick={() => removeLink(idx)} className='mb-1'>
        <HighlightOffIcon color='error' />
       </IconButton>
      </Grid>
     </>
    ))}
   </Grid>
   <Grid item container xs={12} justifyContent='center'>
    <Button onClick={addLink} style={{ textTransform: 'none' }}>
     <AddIcon /> Add New Link
    </Button>
   </Grid>
  </DialogWrapper>
 );
};
