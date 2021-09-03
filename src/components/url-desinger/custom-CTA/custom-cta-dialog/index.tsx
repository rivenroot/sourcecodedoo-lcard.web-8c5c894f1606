import React, { FC, useState } from 'react';
import { DialogWrapper } from 'components/shared/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from 'components/shared/input';
import { postCustomCTA } from 'adapters';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCTA, GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';

const schema = yup.object().shape({
 buttonText: yup.string().required().label('Button Name'),
 buttonLink: yup.string().required().label('URL'),
});

export interface CustomCTADialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const CustomCTADialog: FC<CustomCTADialogProps> = ({ isOpen, onClose }) => {
 const dispatch = useDispatch();
 const builderData = useSelector(GetUrlBuilderData);
 const [loading, setLoading] = useState(false);

 const submit = (data: any) => {
  setLoading(true);
  postCustomCTA(data)
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
    onClose();
   })
   .finally(() => setLoading(false));
 };

 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema), defaultValues: builderData.customCTA });

 return (
  <DialogWrapper open={isOpen} onClose={onClose} title='Custom CTA Button' loading={loading} onSubmit={handleSubmit(submit)}>
   {Object.keys(schema.fields).map((key) => {
    const field = schema.fields[key] as any;
    return (
     <Grid key={key} item xs={12} className='mb-3'>
      <Controller
       control={control}
       name={key as keyof CustomCTA}
       render={({ field: { onChange, value } }) => (
        <Input
         label={field.spec.label}
         onChange={onChange}
         value={value}
         error={!!errors[key as keyof CustomCTA]}
         helperText={errors[key as keyof CustomCTA]?.message}
         fullWidth
         disabled={loading}
        />
       )}
      />
     </Grid>
    );
   })}
  </DialogWrapper>
 );
};
