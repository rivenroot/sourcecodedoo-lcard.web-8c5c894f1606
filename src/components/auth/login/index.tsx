import React, { useState } from 'react';
import { LcardBadge } from 'components/shared/lcard-badge';
import style from './login.module.scss';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';
import { Button, Card, Checkbox, FormControlLabel, Link, TextField, Typography } from '@material-ui/core';
import { CopyRights } from 'components/shared/copyright';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { RoutesProps } from 'routes';
import { UserAPI } from 'adapters/user';
import { http } from 'adapters';
import * as yup from 'yup';
import useLocalStorage from 'react-use-localstorage';

const schema = yup.object().shape({
 email: yup.string().email().required(),
 password: yup.string().min(4).max(25).required(),
});

export default function Login() {
 const [rememberMe, setRememberMe] = useState(false);
 const [, setToken] = useLocalStorage('token');
 const history = useHistory();
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema) });

 const login = async (data: any) => {
  const response = await http.post(UserAPI.LOGIN, data);
  if (response.data.success) {
   setToken(response.data.accessToken);
   history.replace(RoutesProps.URLDESIGNER);
  }
 };

 return (
  <div className={style.container}>
   <div className='d-flex justify-content_center'>
    <LcardBadge />
   </div>
   <div className={style.card_container}>
    <Card>
     <form className={style.card_container__card} onSubmit={handleSubmit(login)}>
      <Typography className='text-align_center mb-4' variant='h4' gutterBottom>
       Login
      </Typography>
      <div className={style.card_container__card__inputs}>
       <TextField className='mb-4' {...register('email')} label='Email address' error={!!errors.email} helperText={errors.email?.message} />
       <TextField
        className='mb-4'
        {...register('password')}
        label='Password'
        type='password'
        error={!!errors.email}
        helperText={errors.password?.message}
       />
       <div className='d-flex justify-content_space-between aling-items_center mb-4'>
        <FormControlLabel
         control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} name='checkedB' color='primary' />}
         label='Remember me'
        />
        <Link href='#' color='inherit'>
         Forgot password?
        </Link>
       </div>
      </div>
      <Button className={roundedButtonStyle.root} size='large' variant='contained' color='primary' type='submit' fullWidth>
       Login
      </Button>
     </form>
    </Card>
    <div className='d-flex aling-items_center mt-4'>
     <Typography className='mr-1' variant='caption'>
      Don’t have an account yet?
     </Typography>
     <Link href='#' variant='subtitle1' onClick={() => history.push(RoutesProps.SIGNUP)}>
      Create account
     </Link>
    </div>
   </div>
   <div className='d-flex justify-content_center'>
    <CopyRights />
   </div>
  </div>
 );
}
