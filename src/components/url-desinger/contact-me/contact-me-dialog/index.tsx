import React, { FC, useState } from 'react';
import { DialogWrapper } from 'components/shared/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from 'components/shared/input';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const schema = yup.object().shape({
 email: yup.string().email().required().label('Email'),
});

const reorder = (list: Field[], startIndex: number, endIndex: number): Field[] => {
 const result = list;
 const [removed] = result.splice(startIndex, 1);
 result.splice(endIndex, 0, removed);

 return result;
};

interface Field {
 name: string;
 type: string;
 required: boolean;
 editable: boolean;
}

export interface ContactMeDialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const ContactMeDialog: FC<ContactMeDialogProps> = ({ isOpen, onClose }) => {
 const [loading, setLoading] = useState(false);
 const [fields, setFields] = useState<Field[]>([
  { name: 'Full Name', type: 'Text', required: true, editable: false },
  { name: 'Email Adress', type: 'Email', required: true, editable: false },
  { name: 'Phone Number', type: 'Number', required: true, editable: false },
  { name: 'Message', type: 'Textarea', required: true, editable: false },
 ]);

 const submit = (data: any) => {
  setLoading(true);
  console.log(data);
 };

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema) });

 const addNewField = () => {
  const nextField = fields.filter((field) => field.name.includes('Custom Field')).length + 1;

  const field: Field = {
   name: 'Custom Field ' + nextField,
   type: 'Text',
   required: false,
   editable: true,
  };

  setFields([...fields, field]);
 };

 const onDragEnd = (result: any) => {
  // dropped outside the list
  if (!result.destination) return;
  const items = reorder(fields, result.source.index, result.destination.index);
  setFields(items);
 };

 return (
  <DialogWrapper open={isOpen} onClose={onClose} title='Contact Me' loading={loading} onSubmit={handleSubmit(submit)}>
   <Grid item xs={12} className='mb-3'>
    <Input
     variant='outlined'
     label='I want to receive emails on this address'
     {...register('email')}
     error={!!errors.email}
     helperText={errors.email?.message}
     fullWidth
     disabled={loading}
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
           <Draggable key={field.name} draggableId={field.name} index={idx}>
            {(provided) => (
             <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <TableCell>
               <DragHandleIcon />
              </TableCell>
              <TableCell align='left'>{field.name}</TableCell>
              <TableCell align='left'>{field.type}</TableCell>
              <TableCell align='left'>{field.required && <CheckIcon fontSize='small' />}</TableCell>
              <TableCell align='left'>
               <Button variant='text' color='primary' disabled={!field.editable}>
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
  </DialogWrapper>
 );
};
