export enum UrlBuilderTypes {
 SET_BUILDER_DATA = 'SET_BUILDER_DATA',
}

export interface Info {
 phoneNumber: string;
 email: string;
 calendar: string;
 location: string;
 website: string;
 links: InfoLinks[];
}

export interface InfoLinks {
 title: string;
 url: string;
}

export interface AboutMe {
 text: string;
}

export interface SocialNetworks {
 networkName: string;
 url: string;
}

export interface UploadType {
 _id: string;
 fileName: string;
 filePath: string;
 mimeType: string;
 createdAt: string;
 updatedAt: string;
 __v: number;
}

export interface Testimonial {
 rating: number;
 comment: string;
 userPhoto: UploadType;
 fullName: string;
 title: string;
}

export interface CustomCTA {
 buttonText: string;
 buttonLink: string;
}

export interface AppStores {
 storeName: string;
 storeLink: string;
}

export interface ContactFormField {
 fieldName: string;
 fieldType: string;
 isRequired: boolean;
 editable: boolean;
}
export interface ContactForm {
 contactMail: string;
 fields: ContactFormField[];
}

export interface UrlBuilderState {
 userId: string;
 info: Info;
 aboutMe: AboutMe;
 socialNetworks: SocialNetworks[];
 video: {
  file: UploadType;
 };
 images: UploadType[];
 testimonials: Testimonial[];
 customCTA: CustomCTA;
 appStores: AppStores[];
 contactForm: ContactForm;
 primaryColor: string;
}
