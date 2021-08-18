import React, { FC, useState } from 'react';
import { DialogWrapper } from 'components/shared/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from 'components/shared/input';

const schema = yup.object().shape({
 buttonName: yup.string().required().label('Button Name'),
 url: yup.string().required().label('URL'),
});

export interface CustomCTADialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const CustomCTADialog: FC<CustomCTADialogProps> = ({ isOpen, onClose }) => {
 const [loading, setLoading] = useState(false);

 const submit = (data: any) => {
  setLoading(true);
  console.log(data);
 };

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema) });

 return (
  <DialogWrapper open={isOpen} onClose={onClose} title='Custom CTA Button' loading={loading} onSubmit={handleSubmit(submit)}>
   {Object.keys(schema.fields).map((key) => {
    const field = schema.fields[key] as any;
    return (
     <Grid key={key} item xs={12} className='mb-3'>
      <Input
       variant='outlined'
       label={field.spec.label}
       {...register(key)}
       error={!!errors[key]}
       helperText={errors[key]?.message}
       fullWidth
       disabled={loading}
      />
     </Grid>
    );
   })}
  </DialogWrapper>
 );
};
