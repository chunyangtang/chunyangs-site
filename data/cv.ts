interface Education {
  degree: string;
  school: string;
  department: string;
  departmentUrl?: string;
  year: string;
  details: string;
}

export const education: Education[] = [
  {
    degree: "Ph.D. in Control Science and Engineering",
    school: "Tsinghua University",
    department: "College of AI",
    departmentUrl: "https://collegeai.tsinghua.edu.cn/en/",
    year: "2025 - Present",
    details: ""
  },
  {
    degree: "B.S. in Automation",
    school: "Tsinghua University",
    department: "Department of Automation",
    departmentUrl: "https://www.au.tsinghua.edu.cn/en/",
    year: "2021 - 2025",
    details: ""
  }
];
