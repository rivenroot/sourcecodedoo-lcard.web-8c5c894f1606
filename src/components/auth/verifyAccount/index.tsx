import React, { useState } from 'react';
import { Box, Button, Card, Grid, TextField, Typography } from '@material-ui/core';
import ReactCodeInput from 'react-verification-code-input';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';
import style from './verifyAccount.module.scss';
import { http, UserAPI } from 'adapters';
import { useQuery } from 'hooks/useQuery';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { RoutesProps } from 'routes';

export default function VerifyAccount() {
 const query = useQuery();
 const [verificationCode, setVerificationCode] = useState<string>();
 const [email, setEmail] = useState(query.get('email'));
 const [loading, setLoading] = useState(false);
 const history = useHistory();

 const submit = async () => {
  try {
   setLoading(true);
   const response = await http.patch(UserAPI.ACTIVATE, { email, code: Number(verificationCode) });
   if (response.data.success) {
    toast.success(response.data.message);
    history.replace(RoutesProps.LOGIN);
   }
  } catch {}
  setLoading(false);
 };

 return (
  <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
   <Card>
    <Box width='348px' padding={4}>
     <Grid container spacing={5}>
      <Grid item xs={12}>
       <Typography align='center' variant='h4'>
        Verify Account
       </Typography>
       <Typography align='center' variant='subtitle2'>
        You registered an account on LCARD, before being able to use your account you need to verify that this is your email address by coping code
        that is sent to you.
       </Typography>
      </Grid>
      <Grid item xs={12}>
       <TextField value={email} onChange={(e) => setEmail(e.target.value)} label='Email address' fullWidth />
      </Grid>
      <Grid item xs={12}>
       <ReactCodeInput className={style.codeInput} loading={loading} onChange={setVerificationCode} type='number' fields={6} />
      </Grid>
      <Grid item xs={12}>
       <Button
        onClick={submit}
        disabled={loading}
        className={roundedButtonStyle.root}
        size='large'
        variant='contained'
        color='primary'
        type='submit'
        fullWidth>
        Verify
       </Button>
      </Grid>
     </Grid>
    </Box>
   </Card>
  </Box>
 );
}
