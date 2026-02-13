import type { ImageMetadata } from 'astro';

import paperNNT from '../src/assets/publications/2026/nnt-nanophotonics.jpg';

// Define strict types
interface Publication {
  title: string;
  authors: string;
  venue: string;
  type: 'Conference' | 'Journal' | 'Workshop';
  year: string;
  image: ImageMetadata;
  links: {
    pdf?: string;
    code?: string;
    website?: string;
  };
}

interface Education {
  degree: string;
  school: string;
  department: string;
  departmentUrl?: string;
  year: string;
  details: string;
}

export const myName = "Chunyang Tang";

export const education: Education[] = [
  {
    degree: "Ph.D. in Control Science and Engineering",
    school: "Tsinghua University",
    department: "College of AI",
    departmentUrl: "https://collegeai.tsinghua.edu.cn/en/",
    year: "2025 - Present",
    details: ""//Focus on medical AI system and photonic computing."
  },
  {
    degree: "B.S. in Automation",
    school: "Tsinghua University",
    department: "Department of Automation",
    departmentUrl: "https://www.au.tsinghua.edu.cn/en/",
    year: "2021 - 2025",
    details: ""//Graduated with Honors. Thesis on Photonic Computing."
  }
];

export const publications: Publication[] = [
  {
    title: "Nanophotonics towards practical optical computing",
    authors: "Yitong Chen, Guoqiang Yang, Tao Yan, Chunyang Tang, Jiamin Wu, Qionghai Dai",
    venue: "Nature Nanotechnology",
    type: "Journal",
    year: "2026",
    image: paperNNT,
    links: {}
  },

];
