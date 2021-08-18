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
 customCTA: any;
 appStores: any;
 contactForm: any;
}
