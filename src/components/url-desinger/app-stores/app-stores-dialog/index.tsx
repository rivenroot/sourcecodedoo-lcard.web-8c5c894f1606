import React, { FC, useState } from 'react';
import { DialogWrapper } from 'components/shared/dialog';
import { Button, Divider, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { Store } from '..';
import AddIcon from '@material-ui/icons/Add';
import { Input } from 'components/shared/input';
import { useDispatch, useSelector } from 'react-redux';
import { GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';
import { postAppStores } from 'adapters';

export interface AppStoresDialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const AppStoresDialog: FC<AppStoresDialogProps> = ({ isOpen, onClose }) => {
 const dispatch = useDispatch();
 const builderData = useSelector(GetUrlBuilderData);
 const [loading, setLoading] = useState(false);
 const [tempStores, setTempStores] = useState(builderData.appStores);

 const setStoreName = (name: Store, idx: number) => {
  const _store = [...tempStores];
  _store[idx].storeName = name;
  setTempStores(_store);
 };

 const setStoreUrl = (value: string, idx: number) => {
  const _store = [...tempStores];
  _store[idx].storeLink = value;
  setTempStores(_store);
 };

 const addNewStore = () => setTempStores([...tempStores, { storeName: '', storeLink: '' }]);

 const submit = () => {
  setLoading(true);
  postAppStores(tempStores)
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
    onClose();
   })
   .finally(() => setLoading(false));
 };

 return (
  <DialogWrapper title='App. Stores' onSubmit={submit} open={isOpen} onClose={onClose} loading={loading}>
   {tempStores.map((tStore, idx) => (
    <>
     {idx > 0 && (
      <Grid item xs={12} className='mb-4 mt-3'>
       <Divider />
      </Grid>
     )}
     <Grid item xs={12} className='mb-3'>
      <Typography variant='subtitle2'>App. Store</Typography>
      <FormControl fullWidth>
       <Select labelId='providers-label' id='providers' value={tStore.storeName} onChange={(e) => setStoreName(e.target.value as Store, idx)}>
        {Object.keys(Store).map((key) => {
         const store = (Store as any)[key];
         return <MenuItem value={key}>{store}</MenuItem>;
        })}
       </Select>
      </FormControl>
     </Grid>
     <Grid item xs={12} className='mb-3'>
      <Input value={tStore.storeLink} onChange={(e: any) => setStoreUrl(e.target.value, idx)} label='URL' variant='outlined' fullWidth />
     </Grid>
    </>
   ))}
   <Grid item container xs={12} justifyContent='center'>
    <Button onClick={addNewStore}>
     <AddIcon /> Add Another App. Store
    </Button>
   </Grid>
  </DialogWrapper>
 );
};
