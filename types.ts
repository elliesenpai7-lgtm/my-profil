export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  iconStyle: string;
  backgroundStyle: string;
  borderStyle: string;
}

export interface Background {
  type: 'theme' | 'image' | 'video';
  value: string; // theme ID or URL
  mimeType?: string;
}

export interface ProfileState {
  profilePicture: string | null;
  name: string;
  bio: string;
  background: Background;
  font: string;
  fontStyle: string;
  profileBorderStyle: string;
  links: Link[];
  musicUrl: string;
}

export interface Theme {
  id: string;
  name: string;
  classes: string;
}

export interface Font {
  id: string;
  name: string;
  class: string;
}

export interface StyleOption {
  id: string;
  name:string;
  class: string;
  preview: string;
}
