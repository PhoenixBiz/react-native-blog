export interface PostPage {
  link: string;
  totalImages: number;
  json: JSON;
  images: string[];
  latest: Latest[];
  trending: Latest[];
  related: Latest[];
}

export interface Latest {
  src: string;
  srcset?: Srcset;
  title: string;
  link: string;
}

export interface Srcset {
  "72w"?: string;
  "128w"?: string;
  "220w"?: string;
  "400w"?: string;
  "640w"?: string;
  "800w"?: string;
  "1024w"?: string;
  "1280w"?: string;
  "1600w"?: string;
  undefined?: string;
}

export interface JSON {
  "@context": string;
  "@type": string;
  mainEntityOfPage: MainEntityOfPage;
  headline: string;
  description: string;
  datePublished: Date;
  dateModified: Date;
  image: IImage;
  publisher: Publisher;
  author: Author;
}

export interface IPost {
  "@context"?: string;
  "@type"?: PostType;
  mainEntityOfPage: MainEntityOfPage;
  headline: string;
  description?: string;
  datePublished?: Date;
  dateModified?: Date;
  image: IImage;
  publisher?: Publisher;
  author?: Author;
}

export enum PostType {
  BlogPosting = "BlogPosting",
}

export interface Author {
  "@type": AuthorType;
  name: AuthorName;
}

export enum AuthorType {
  Person = "Person",
}

export enum AuthorName {
  Spideybackup = "spideybackup",
}

export interface IImage {
  "@type"?: ImageType;
  url: string;
  height?: number;
  width?: number;
}

export enum ImageType {
  ImageObject = "ImageObject",
}

export interface MainEntityOfPage {
  "@type"?: MainEntityOfPageType;
  "@id": string;
}

export enum MainEntityOfPageType {
  WebPage = "WebPage",
}

export interface Publisher {
  "@type": PublisherType;
  name: PublisherName;
  logo: IImage;
}

export enum PublisherType {
  Organization = "Organization",
}

export enum PublisherName {
  Blogger = "Blogger",
}
