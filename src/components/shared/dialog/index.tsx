import React, { FC } from 'react';
import { Dialog, Grid, Button, CircularProgress, DialogProps } from '@material-ui/core';
import { DialogHeader } from './dialog-header';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';

export enum DialogWrapperType {
 DEFAULT = 'Default',
 DELETE = 'Delete',
}

export interface DialogWrapperProps extends DialogProps {
 open: boolean;
 loading?: boolean;
 title: string;
 onSubmit(): void;
 type?: DialogWrapperType;
 onDelete?(): void;
}

export const DialogWrapper: FC<DialogWrapperProps> = ({
 children,
 onClose,
 title,
 loading,
 onSubmit,
 onDelete,
 type = DialogWrapperType.DEFAULT,
 ...rest
}) => {
 return (
  <Dialog onClose={onClose} {...rest} scroll='body'>
   <Grid container item xs={12} style={{ margin: 0, padding: '.5em 1em' }} spacing={3} justifyContent='center'>
    <Grid item xs={12}>
     <DialogHeader title={title} onClose={onClose} />
    </Grid>
    <Grid item container xs={12}>
     {children}
    </Grid>
    <Grid item xs={12} container>
     {type === DialogWrapperType.DELETE && (
      <Grid item xs>
       <Button
        className={roundedButtonStyle.root}
        onClick={onDelete}
        variant='contained'
        style={{ backgroundColor: '#fb3535', borderColor: '#fb3535', color: '#fff' }}>
        Delete
       </Button>
      </Grid>
     )}
     <Grid item xs>
      <Button className={roundedButtonStyle.root} onClick={onSubmit} color='primary' size='large' variant='contained' fullWidth disabled={loading}>
       {loading ? <CircularProgress size={24} /> : 'Save'}
      </Button>
     </Grid>
    </Grid>
   </Grid>
  </Dialog>
 );
};
