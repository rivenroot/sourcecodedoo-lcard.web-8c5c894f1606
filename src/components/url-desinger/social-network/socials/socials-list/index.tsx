import { Grid, Fab } from '@material-ui/core';
import React, { FC } from 'react';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
import { SocialNetworks } from 'store/url-builder';
import { SocialProvider } from '../add-social';

export const getSocialIcon = (provider: SocialProvider, { width, height }: { width: number; height: number }) => {
 switch (provider) {
  case SocialProvider.FACEBOOK:
   return <FaFacebook style={{ width, height }} />;
  case SocialProvider.INSTAGRAM:
   return <FaInstagram style={{ width, height }} />;
  case SocialProvider.PINTEREST:
   return <FaPinterest style={{ width, height }} />;
 }
};

export interface SocialNetworkListProps {
 socialNetworks: SocialNetworks[];
 onItemClick?(item: SocialNetworks): void;
}

export const SocialNetworkList: FC<SocialNetworkListProps> = ({ socialNetworks, onItemClick }) => {
 return (
  <Grid container>
   {socialNetworks.map((social) => {
    if (social.networkName.length === 0) return '';
    return (
     <Grid item>
      <Fab onClick={() => onItemClick && onItemClick(social)} aria-label='add'>
       {getSocialIcon(social.networkName as SocialProvider, { width: 56, height: 56 })}
      </Fab>
     </Grid>
    );
   })}
  </Grid>
 );
};
