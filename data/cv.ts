import type { ImageMetadata } from 'astro';

import paperNNT from '../src/assets/publications/2026/nnt-nanophotonics.jpg';

// Define strict types
interface Publication {
  title: string;
  authors: string;
  venue: string;
  type: 'Conference' | 'Journal' | 'Workshop';
  year: string;
  image: ImageMetadata; // This ensures you pass a valid imported image
  links: {
    pdf?: string;
    code?: string;
    website?: string;
  };
}

export const myName = "Chunyang Tang";

export const education = [
  {
    degree: "Ph.D. in Control Science and Engineering",
    school: "Tsinghua University",
    department: "College of AI",
    departmentUrl: "https://collegeai.tsinghua.edu.cn/en/",
    year: "2025 - Present",
    details: "Focus on Optical Computing and efficient ML inference."
  },
  {
    degree: "B.S. in Automation",
    school: "Tsinghua University",
    department: "Department of Automation",
    departmentUrl: "https://www.au.tsinghua.edu.cn/en/",
    year: "2021 - 2025",
    details: "Graduated with Honors. Thesis on Photonic Crystals."
  }
];

export const publications = [
  {
    title: "Diffractive Optical Neural Networks for High-Speed Inference",
    // Note: I put your full name here to test the highlighting
    authors: "Chunyang Tang, A. Professor, B. Colleague",
    venue: "NeurIPS 2025",
    type: "Conference",
    image: paperNNT, // Add your paper teaser image here
    links: { pdf: "#", code: "#" }
  },

];

