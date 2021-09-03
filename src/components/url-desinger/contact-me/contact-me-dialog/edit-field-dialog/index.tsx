import React from 'react';
import { Grid, FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import { DialogWrapper, DialogWrapperType } from 'components/shared/dialog';
import { Input } from 'components/shared/input';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactFormField } from 'store/url-builder';

const schema = yup.object().shape({
 fieldType: yup.string().required().label('Button Name'),
 fieldName: yup.string().required().label('URL'),
});

enum InputType {
 Text = 'Text',
}

export interface EditFieldDialogProps {
 open: boolean;
 field: ContactFormField;
 onSubmit(field: ContactFormField): void;
 onDelete(): void;
 closeDialog(): void;
}

export const EditFieldDialog = ({ open, field, onSubmit, onDelete, closeDialog }: EditFieldDialogProps) => {
 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema), defaultValues: field });

 const saveField = ({ fieldName, fieldType }: any) => {
  onSubmit({ ...field, fieldName, fieldType });
 };

 return (
  <DialogWrapper
   type={DialogWrapperType.DELETE}
   onDelete={onDelete}
   open={open}
   title='Edit Contact Field'
   onSubmit={handleSubmit(saveField)}
   onClose={closeDialog}>
   <Grid container>
    <Grid item xs={12} className='mb-3'>
     <Controller
      control={control}
      name='fieldType'
      render={({ field: { onChange, value } }) => (
       <>
        <Typography variant='subtitle2'>Field Type</Typography>
        <FormControl fullWidth>
         <Select labelId='providers-label' id='providers' value={value} onChange={(e) => onChange(e.target.value)}>
          {Object.keys(InputType).map((key) => {
           const store = (InputType as any)[key];
           return <MenuItem value={key}>{store}</MenuItem>;
          })}
         </Select>
        </FormControl>
       </>
      )}
     />
    </Grid>
    <Grid item xs={12} className='mb-3'>
     <Controller
      control={control}
      name='fieldName'
      render={({ field: { onChange, value } }) => (
       <Input label='Field Name' onChange={onChange} value={value} error={!!errors.fieldName} helperText={errors.fieldName?.message} fullWidth />
      )}
     />
    </Grid>
   </Grid>
  </DialogWrapper>
 );
};
