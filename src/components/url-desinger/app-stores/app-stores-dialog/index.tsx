import React, { FC, useState } from 'react';
import { DialogWrapper } from 'components/shared/dialog';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Divider, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { AppStore, Store } from '..';
import AddIcon from '@material-ui/icons/Add';
import { Input } from 'components/shared/input';

const schema = yup.object().shape({
 buttonName: yup.string().required().label('Button Name'),
 url: yup.string().required().label('URL'),
});

export interface AppStoresDialogProps {
 isOpen: boolean;
 onClose(): void;
 stores: AppStore[];
 setStores(stores: AppStore[]): void;
}

export const AppStoresDialog: FC<AppStoresDialogProps> = ({ isOpen, onClose, stores, setStores }) => {
 const [loading, setLoading] = useState(false);
 const [tempStores, setTempStores] = useState<AppStore[]>(stores);

 const { handleSubmit } = useForm({ resolver: yupResolver(schema) });

 const selectStore = (name: Store, idx: number) => {
  const _store = [...tempStores];
  _store[idx].name = name;
  setTempStores(_store);
 };

 const addNewStore = () => setTempStores([...tempStores, { name: '', url: '' }]);

 const submit = (data: any) => {
  setLoading(true);
  console.log(data);
 };

 return (
  <DialogWrapper title='App. Stores' onSubmit={handleSubmit(submit)} open={isOpen} onClose={onClose} loading={loading}>
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
       <Select labelId='providers-label' id='providers' value={tStore.name} onChange={(e) => selectStore(e.target.value as Store, idx)}>
        {Object.keys(Store).map((key) => {
         const store = (Store as any)[key];
         return <MenuItem value={key}>{store}</MenuItem>;
        })}
       </Select>
      </FormControl>
     </Grid>
     <Grid item xs={12} className='mb-3'>
      <Input label='URL' variant='outlined' fullWidth />
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
