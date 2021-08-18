import { UrlBuilderTypes } from './types';
import { Reducer } from 'redux';
import { UrlBuilderState } from '.';

const initialState: UrlBuilderState = {
 userId: '',
 info: {
  phoneNumber: '',
  email: '',
  calendar: '',
  location: '',
  website: '',
  links: [],
 },
 aboutMe: { text: '' },
 socialNetworks: [],
 video: {
  file: {
   _id: '',
   fileName: '',
   filePath: '',
   mimeType: '',
   createdAt: '',
   updatedAt: '',
   __v: 0,
  },
 },
 images: [],
 testimonials: [],
 customCTA: null,
 appStores: null,
 contactForm: null,
};

const UrlBuilderReducer: Reducer<UrlBuilderState> = (state = initialState, action: any) => {
 switch (action.type) {
  case UrlBuilderTypes.SET_BUILDER_DATA: {
   return { ...action.data };
  }
  default:
   return state;
 }
};

export default UrlBuilderReducer;
