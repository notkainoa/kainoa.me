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
  /** Optional start of the description, shown at rest; it morphs into `description` on hover. */
  shortDescription?: string;
  link?: string;
  tech?: string[];
  /** Which of the three project columns the card sits in (1 and 2 are Current, 3 is Maintained). */
  column: 1 | 2 | 3;
  status?: string;
}

export interface Social {
  name: string;
  url: string;
  handle: string;
}
