import React, { useEffect, useState } from 'react';
import { LcardBadge } from 'components/shared/lcard-badge';
import style from './signup.module.scss';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';
import { Button, Card, Checkbox, FormControl, FormControlLabel, Grid, Link, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { CopyRights } from 'components/shared/copyright';
import { PaymentOptions } from 'enums/paymentOptions';
import { RoutesProps } from 'routes';
import { SubscriptionType } from 'enums/subscriptionType';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { http, UserAPI } from 'adapters';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
 firstName: yup.string().required(),
 lastName: yup.string().required(),
 email: yup.string().email().required(),
 companyName: yup.string().required(),
 password: yup.string().min(4).max(25).required(),
 confirmPassword: yup.string().min(4).max(25).required(),
});

export default function SignUp() {
 const history = useHistory();
 const [acceptTerms, setAcceptTerms] = useState(false);
 const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>(SubscriptionType.BUSINESS);
 const [paymentOption, setPaymentOption] = useState<PaymentOptions>(PaymentOptions.ANNUAL);

 useEffect(() => {
  if (subscriptionType === SubscriptionType.BASIC) setPaymentOption(PaymentOptions.FREE);
  if (subscriptionType === SubscriptionType.BUSINESS) setPaymentOption(PaymentOptions.MONTHLY);
 }, [subscriptionType]);

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({ resolver: yupResolver(schema) });

 const signUp = async (data: any) => {
  const response = await http.post(UserAPI.SIGNUP, { ...data, subscriptionType, payment: paymentOption });
  if (response.data.error) return;
  toast.success(response.data.message);
  history.push(RoutesProps.VERIFYACCOUNT);
 };

 return (
  <div className={style.container}>
   <div className='d-flex justify-content_center'>
    <LcardBadge />
   </div>
   <div className={style.card_container}>
    <Card>
     <form className={style.card_container__card} onSubmit={handleSubmit(signUp)}>
      <Grid container spacing={2}>
       <Grid item xs={12}>
        <Typography className='text-align_center' variant='h4' gutterBottom>
         <b>Create Account</b>
        </Typography>
       </Grid>
       <Grid item xs={12}>
        <Typography variant='button'>
         <b>Subscription Type</b>
        </Typography>
        <RadioGroup
         row
         aria-label='SubscriptionType'
         name='SubscriptionType'
         defaultValue='Business'
         value={subscriptionType}
         onChange={(e) => setSubscriptionType(e.target.value as SubscriptionType)}>
         {Object.keys(SubscriptionType).map((key) => (
          <FormControlLabel
           value={(SubscriptionType as any)[key]}
           control={<Radio color={subscriptionType !== SubscriptionType.ENTERPRISE ? 'primary' : 'secondary'} />}
           label={(SubscriptionType as any)[key]}
           labelPlacement='end'
          />
         ))}
        </RadioGroup>
       </Grid>
       {subscriptionType !== SubscriptionType.ENTERPRISE ? (
        <Grid item xs={12}>
         <Typography variant='button'>
          <b>Payment</b>
         </Typography>
         <RadioGroup
          row
          aria-label='Payment'
          name='Payment'
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value as PaymentOptions)}>
          {subscriptionType === SubscriptionType.BASIC && (
           <FormControlLabel value={PaymentOptions.FREE} control={<Radio color='primary' />} label={PaymentOptions.FREE} labelPlacement='end' />
          )}
          {subscriptionType === SubscriptionType.BUSINESS && (
           <>
            <FormControlLabel value={PaymentOptions.ANNUAL} control={<Radio color='primary' />} label={PaymentOptions.ANNUAL} labelPlacement='end' />
            <FormControlLabel
             value={PaymentOptions.MONTHLY}
             control={<Radio color='primary' />}
             label={PaymentOptions.MONTHLY}
             labelPlacement='end'
            />
           </>
          )}
         </RadioGroup>
         {paymentOption === PaymentOptions.ANNUAL && (
          <div className={style.card_container__card__paymentOptions}>
           <b>$48</b> / year (save 20%)
          </div>
         )}
         {paymentOption === PaymentOptions.MONTHLY && (
          <div className={style.card_container__card__paymentOptions}>
           <b>$5</b> / month
          </div>
         )}
        </Grid>
       ) : (
        <Grid item xs={12}>
         <Button className={roundedButtonStyle.root} size='large' variant='contained' color='secondary' fullWidth>
          Contact Sales
         </Button>
        </Grid>
       )}
       <Grid item xs={6}>
        <TextField {...register('firstName')} label='First Name' error={!!errors.firstName} helperText={errors.firstName?.message} fullWidth />
       </Grid>
       <Grid item xs={6}>
        <TextField {...register('lastName')} label='Last Name' error={!!errors.lastName} helperText={errors.lastName?.message} fullWidth />
       </Grid>
       <Grid item xs={12}>
        <TextField fullWidth {...register('email')} label='Email address' error={!!errors.email} helperText={errors.email?.message} />
       </Grid>
       <Grid item xs={12}>
        <TextField
         fullWidth
         {...register('companyName')}
         label='Company name'
         error={!!errors.companyName}
         helperText={errors.companyName?.message}
        />
       </Grid>
       <Grid item xs={12}>
        <TextField
         fullWidth
         {...register('password')}
         label='Password'
         error={!!errors.password}
         helperText={errors.password?.message}
         type='password'
        />
       </Grid>
       <Grid item xs={12}>
        <TextField
         fullWidth
         {...register('confirmPassword')}
         label='Repeat Password'
         error={!!errors.confirmPassword}
         helperText={errors.confirmPassword?.message}
         type='password'
        />
       </Grid>
       <Grid item xs={12}>
        <FormControl required error={true}>
         <FormControlLabel
          control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} name='terms' color='primary' />}
          label='I agree Terms and Privacy Policy'
         />
        </FormControl>
       </Grid>
       <Grid item xs={12}>
        <Button
         className={roundedButtonStyle.root}
         size='large'
         variant='contained'
         color={subscriptionType !== SubscriptionType.ENTERPRISE ? 'primary' : 'secondary'}
         type='submit'
         fullWidth>
         {subscriptionType !== SubscriptionType.ENTERPRISE ? 'Start your 14-day Free Trial' : 'Create Account'}
        </Button>
       </Grid>
      </Grid>
     </form>
    </Card>
    <div className='d-flex aling-items_center mt-4'>
     <Typography className='mr-1' variant='caption'>
      Already have an account?
     </Typography>
     <Link href='#' variant='subtitle1' onClick={() => history.push(RoutesProps.LOGIN)}>
      Login
     </Link>
    </div>
   </div>
   <div className='d-flex justify-content_center'>
    <CopyRights />
   </div>
  </div>
 );
}
