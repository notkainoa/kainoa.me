export interface Job {
  company: string;
  role: string;
  start: string;
  end: string;
  description?: string;
  link?: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  tech?: string[];
  category?: 'development' | 'projects' | 'oss';
}

export interface Social {
  name: string;
  url: string;
  handle: string;
}
