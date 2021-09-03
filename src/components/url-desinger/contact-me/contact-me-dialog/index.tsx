import React, { FC, useState } from 'react';
import { DialogWrapper } from 'components/shared/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from 'components/shared/input';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import { EditFieldDialog } from './edit-field-dialog';
import { postContactForm } from 'adapters';
import { ContactFormField, GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';
import { useDispatch, useSelector } from 'react-redux';

const schema = yup.object().shape({
 contactMail: yup.string().email().required().label('Email'),
});

const reorder = (list: ContactFormField[], startIndex: number, endIndex: number): ContactFormField[] => {
 const result = list;
 const [removed] = result.splice(startIndex, 1);
 result.splice(endIndex, 0, removed);
 return result;
};

export interface ContactMeDialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const ContactMeDialog: FC<ContactMeDialogProps> = ({ isOpen, onClose }) => {
 const dispatch = useDispatch();
 const builderData = useSelector(GetUrlBuilderData);
 const [loading, setLoading] = useState(false);
 const [fields, setFields] = useState<ContactFormField[]>(builderData.contactForm.fields);
 const [fieldToEdit, setFieldToEdit] = useState<ContactFormField | null>();

 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema), defaultValues: builderData.contactForm });

 const submit = ({ contactMail }: any) => {
  postContactForm({
   contactMail,
   fields: fields,
  })
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
    onClose();
   })
   .finally(() => setLoading(false));
  setLoading(true);
 };

 const openEditFieldDialog = (field: ContactFormField) => setFieldToEdit(field);

 const addNewField = () => {
  const nextField = fields.filter((field) => field.fieldName.includes('Custom Field')).length + 1;

  const field: ContactFormField = {
   fieldName: 'Custom Field ' + nextField,
   fieldType: 'Text',
   isRequired: false,
   editable: true,
  };

  setFields([...fields, field]);
 };

 const updateField = (field: ContactFormField) => {
  const updatedFields = fields.map((f) => (fieldToEdit === f ? field : f));
  setFieldToEdit(null);
  setFields(updatedFields);
 };

 const deleteField = () => {
  const updatedFields = fields.filter((f) => fieldToEdit !== f);
  setFieldToEdit(null);
  setFields(updatedFields);
 };

 const onDragEnd = (result: any) => {
  // dropped outside the list
  if (!result.destination) return;
  const items = reorder(fields, result.source.index, result.destination.index);
  setFields(items);
 };

 return (
  <DialogWrapper open={isOpen} onClose={onClose} title='Contact Me' loading={loading} onSubmit={handleSubmit(submit)} onDelete={deleteField}>
   <Grid item xs={12} className='mb-3'>
    <Controller
     control={control}
     name='contactMail'
     render={({ field: { onChange, value } }) => (
      <Input
       label='I want to receive emails on this address'
       onChange={onChange}
       value={value}
       error={!!errors.contactMail}
       helperText={errors.contactMail?.message}
       fullWidth
       disabled={loading}
      />
     )}
    />
   </Grid>
   <Grid item xs={12}>
    <Typography color='textPrimary' variant='h6'>
     Fields
    </Typography>
   </Grid>
   <Grid item xs={12} className='mb-4'>
    <DragDropContext onDragEnd={onDragEnd}>
     {/* TODO: Fix drag&drop container height on drag */}
     <TableContainer style={{ overflow: 'hidden' }}>
      <Table size='small'>
       <TableHead>
        <TableRow>
         <TableCell></TableCell>
         <TableCell align='left'>Name</TableCell>
         <TableCell align='left'>Type</TableCell>
         <TableCell align='left'>Required</TableCell>
         <TableCell></TableCell>
        </TableRow>
       </TableHead>
       <Droppable droppableId='droppable'>
        {(provided) => (
         <TableBody {...provided.droppableProps} ref={provided.innerRef}>
          {fields.map((field, idx) => (
           <Draggable key={field.fieldName} draggableId={field.fieldName} index={idx}>
            {(provided) => (
             <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <TableCell>
               <DragHandleIcon />
              </TableCell>
              <TableCell align='left'>{field.fieldName}</TableCell>
              <TableCell align='left'>{field.fieldType}</TableCell>
              <TableCell align='left'>{field.isRequired && <CheckIcon fontSize='small' />}</TableCell>
              <TableCell align='left'>
               <Button onClick={() => openEditFieldDialog(field)} variant='text' color='primary' disabled={!field.editable}>
                Edit
               </Button>
              </TableCell>
             </TableRow>
            )}
           </Draggable>
          ))}
         </TableBody>
        )}
       </Droppable>
      </Table>
     </TableContainer>
    </DragDropContext>
   </Grid>
   <Grid justifyContent='center' item container xs={12}>
    <Button variant='text' onClick={addNewField}>
     <AddIcon />
     Add New Field
    </Button>
   </Grid>
   <EditFieldDialog
    onDelete={deleteField}
    open={!!fieldToEdit}
    closeDialog={() => setFieldToEdit(null)}
    field={fieldToEdit as ContactFormField}
    onSubmit={updateField}
   />
  </DialogWrapper>
 );
};
