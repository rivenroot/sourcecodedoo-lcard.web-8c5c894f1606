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
 customCTA: { buttonLink: '', buttonText: '' },
 appStores: [],
 contactForm: {
  contactMail: '',
  fields: [
   { fieldName: 'Full Name', fieldType: 'Text', isRequired: true, editable: false },
   { fieldName: 'Email Adress', fieldType: 'Email', isRequired: true, editable: false },
   { fieldName: 'Phone Number', fieldType: 'Number', isRequired: true, editable: false },
   { fieldName: 'Message', fieldType: 'Textarea', isRequired: true, editable: false },
  ],
 },
 primaryColor: '#F4A300',
};

const UrlBuilderReducer: Reducer<UrlBuilderState> = (state = initialState, action: any) => {
 switch (action.type) {
  case UrlBuilderTypes.SET_BUILDER_DATA: {
   return { ...state, ...action.data };
  }
  default:
   return state;
 }
};

export default UrlBuilderReducer;
