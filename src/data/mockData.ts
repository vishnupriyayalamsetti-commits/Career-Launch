import { Job, Company } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'c1',
    name: 'Google',
    logo: 'G',
    industry: 'Technology & Cloud Solutions',
    employees: '150,000+',
    rating: 4.8,
    openings: 12,
    description: 'Our mission is to organize the world’s information and make it universally accessible and useful.'
  },
  {
    id: 'c2',
    name: 'Microsoft',
    logo: 'M',
    industry: 'Enterprise Software & Cloud',
    employees: '220,000+',
    rating: 4.6,
    openings: 8,
    description: 'Empowering every person and every organization on the planet to achieve more.'
  },
  {
    id: 'c3',
    name: 'Atlassian',
    logo: 'A',
    industry: 'Collaborative Developer Tools',
    employees: '10,000+',
    rating: 4.5,
    openings: 5,
    description: 'Unleashing the potential of every team with Jira, Confluence, and Trello.'
  },
  {
    id: 'c4',
    name: 'Stripe',
    logo: 'S',
    industry: 'Fintech & Payment Infrastructure',
    employees: '8,000+',
    rating: 4.7,
    openings: 4,
    description: 'Financial infrastructure for the internet. Millions of companies of all sizes use Stripe.'
  },
  {
    id: 'c5',
    name: 'Netflix',
    logo: 'N',
    industry: 'Digital Streaming & Entertainment',
    employees: '12,000+',
    rating: 4.4,
    openings: 6,
    description: 'Let\'s entertain the world. We are one of the world\'s leading entertainment services.'
  },
  {
    id: 'c6',
    name: 'Meta',
    logo: '∞',
    industry: 'Social Media & VR Technologies',
    employees: '85,000+',
    rating: 4.3,
    openings: 7,
    description: 'Giving people the power to build community and bring the world closer together.'
  }
];

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Associate Software Engineer (Java/Python)',
    companyName: 'Atlassian',
    companyId: 'c3',
    logo: 'A',
    location: 'Bangalore, India (Hybrid)',
    salary: '₹12,00,000 - ₹16,00,000 / year',
    type: 'fresher',
    skills: ['Java', 'Python', 'Data Structures', 'Git', 'REST APIs'],
    description: 'We are seeking motivated Graduate Software Engineers to join our core collaborative engineering teams. In this role, you will contribute directly to products like Jira or Confluence, participate in active code reviews, write test suites, and learn from Senior principal engineers.',
    requirements: [
      'B.Tech / B.E / M.Tech / MCA in Computer Science or related engineering stream',
      'Strong knowledge of Object-Oriented Programming (OOP) principles and Algorithms',
      'Excellent troubleshooting and debugging skills',
      'Familiarity with standard relational databases like PostgreSQL/MySQL',
      'Great verbal and written communication skills'
    ],
    postedDate: '1 day ago',
    category: 'Software Development',
    experienceRequired: '0 - 1 years'
  },
  {
    id: 'job-2',
    title: 'Frontend Developer Associate (React/TS)',
    companyName: 'Stripe',
    companyId: 'c4',
    logo: 'S',
    location: 'Remote (APAC)',
    salary: '₹14,00,000 - ₹18,00,000 / year',
    type: 'fresher',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5'],
    description: 'Join Stripe’s Developer Dashboard UX group. You will help build polished, highly accessible user interfaces supporting millions of active merchants globally. You will work within our React-TypeScript ecosystem with elegant state systems and precise custom UI libraries.',
    requirements: [
      'Prior internship experiences or substantial personal front-end portfolio websites',
      'Solid command over JavaScript, ES6 features, HTML5 APIs, and CSS3 layouts (Flexbox/Grid)',
      'Basic knowledge of React rendering patterns, hooks, and local state flows',
      'A keen eye for design alignment, padding, and subtle animations'
    ],
    postedDate: '2 days ago',
    category: 'Frontend Engineering',
    experienceRequired: 'Fresher / Entry level'
  },
  {
    id: 'job-3',
    title: 'Data Analyst Graduate Intern',
    companyName: 'Google',
    companyId: 'c1',
    logo: 'G',
    location: 'Hyderabad, India',
    salary: '₹8,00,000 - ₹11,00,000 / year',
    type: 'fresher',
    skills: ['SQL', 'Python', 'Excel', 'Tableau', 'Statistics'],
    description: 'As a Data Analyst Intern, you will partner alongside regional Google Cloud account management and performance teams. Cleanse raw interaction datasets, formulate structured dashboard widgets, and communicate action-enabling business reports to key project stake owners.',
    requirements: [
      'Recent graduate or final year student in Mathematics, Statistics, Economics, CS or similar fields',
      'Proficient in writing relational database queries (SQL)',
      'Working knowledge of statistical modules and cleaning raw records in Python (Pandas/NumPy)',
      'Ability to articulate findings cleanly with visual graphs and slide decks'
    ],
    postedDate: 'Today',
    category: 'Data Science & Analytics',
    experienceRequired: '0 years (Internship / Fresher)'
  },
  {
    id: 'job-4',
    title: 'Senior Full Stack Software Architect',
    companyName: 'Microsoft',
    companyId: 'c2',
    logo: 'M',
    location: 'Redmond, WA (Hybrid)',
    salary: '₹1,30,00,000 - ' + '₹1,70,00,050 / year',
    type: 'experienced',
    skills: ['C#', '.NET Core', 'Azure', 'React', 'Kubernetes'],
    description: 'Lead engineering operations for our next-generation Windows Admin portal dashboards. Coordinate product architectures, configure secure backend Microservices deployed on Microsoft Azure, and build highly performant client-side state engines in TypeScript.',
    requirements: [
      'Bachelor’s or Master’s in Computer Science or similar field',
      '5+ years of production software engineering experience using C# and modern React',
      'Demonstrated expertise in architectural patterns, distributed systems, and heavy API design',
      'Experience with Azure Services, DevOps pipelines, Docker, and Kubernetes orchestration'
    ],
    postedDate: '3 days ago',
    category: 'Software Development',
    experienceRequired: '5+ years'
  },
  {
    id: 'job-5',
    title: 'Cloud Security Systems Engineer',
    companyName: 'Netflix',
    companyId: 'c5',
    logo: 'N',
    location: 'Los Gatos, CA',
    salary: '₹1,50,00,000 - ' + '₹2,00,00,000 / year',
    type: 'experienced',
    skills: ['AWS', 'Network Security', 'Linux', 'Python', 'IAM'],
    description: 'We are seeking an experienced Systems Security expert to safeguard Netflix Infrastructure groups. Author cloud network guardrails, deploy IAM configuration validators at scale, and architect automation systems to prevent zero-day privilege expansions.',
    requirements: [
      '3+ years focusing on automated cloud-based security configurations at scale (AWS favored)',
      'Substantial programming expertise in Python or Go for infrastructure automation',
      'In-depth knowledge of Linux container kernels, namespaces, and security contexts',
      'Pragmatic approach to risk balancing for developer speed vs absolute security protocols'
    ],
    postedDate: 'Just now',
    category: 'Cybersecurity & DevOps',
    experienceRequired: '3 - 6 years'
  },
  {
    id: 'job-6',
    title: 'Developer Advocate (Junior / Mid)',
    companyName: 'Meta',
    companyId: 'c6',
    logo: '∞',
    location: 'London, UK (Hybrid)',
    salary: '₹68,00,000 - ' + '₹89,00,000 / year',
    type: 'experienced',
    skills: ['Public Speaking', 'React Native', 'API Integration', 'Content Creation'],
    description: 'Act as the crucial bridge between Meta’s open source developer communities and our internal API engineering groups. Create robust boilerplate integrations, author educational technical documentations, and give presentations at developers seminars globally.',
    requirements: [
      '1 - 3 years of software engineering experience or active technical community blogging',
      'A true passion for assisting other developers, writing code samples, and building SDK wrappers',
      'Outstanding public speaking skills or proven portfolio of written developer walkthrough guides',
      'Familiarity with open-source ecosystems (React Native, PyTorch or GraphQL is highly plus)'
    ],
    postedDate: '5 days ago',
    category: 'Developer Advocacy',
    experienceRequired: '1 - 3 years'
  },
  {
    id: 'job-7',
    title: 'UI/UX Design Specialist',
    companyName: 'Atlassian',
    companyId: 'c3',
    logo: 'A',
    location: 'Sydney, Australia',
    salary: '₹80,00,000 - ' + '₹95,00,000 / year',
    type: 'experienced',
    skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
    description: 'Refine user journeys in premium cloud ticketing dashboards. Establish consistent typographic hierarchies, design functional layout structures using Atlassian Design System guidelines, and coordinate extensive user testing interviews.',
    requirements: [
      '2+ years of design experience at a fast-growing digital software business',
      'Stellar portfolio illustrating clean layouts, data alignment, typography, and interactive screen states',
      'Advanced Figma expertise including auto-layout paradigms, component variables, and wireframing font sizes'
    ],
    postedDate: '1 week ago',
    category: 'Creative & UI/UX Design',
    experienceRequired: '2+ years'
  },
  {
    id: 'job-8',
    title: 'Graduate Quality Assurance Engineer',
    companyName: 'Microsoft',
    companyId: 'c2',
    logo: 'M',
    location: 'Noida, India',
    salary: '₹7,50,000 - ₹10,00,000 / year',
    type: 'fresher',
    skills: ['Selenium', 'Manual Testing', 'Java', 'API Testing', 'SQL'],
    description: 'Perfect for fresh computer graduates with strong logical instincts who appreciate quality bug reporting. Execute diagnostic testing scenarios, configure Selenium browser automations, and track core diagnostic bug logs inside Azure Boards.',
    requirements: [
      'BCA, BSc (CS), MCA, or B.Tech graduates seeking to specialize in Software Quality practices',
      'Familiarity with functional lifecycle testing, integration check-ups, and regress validation runs',
      'Basic capabilities writing Selenium or Cypress UI automation flows',
      'Meticulous documentation standards with extreme eye for detail'
    ],
    postedDate: '4 days ago',
    category: 'Quality Assurance',
    experienceRequired: '0 - 1 years (Fresher)'
  }
];

export const mockBenefits = [
  {
    id: 'b1',
    title: 'Curated Fresher Roles',
    description: 'Say goodbye to "5+ years experienced required" for entry positions. Find filtered jobs built explicitly for fresh graduates.',
    icon: 'GraduationCap',
    color: 'from-blue-500/10 to-blue-500/20 text-blue-600'
  },
  {
    id: 'b2',
    title: 'Resume Direct Apply',
    description: 'Post your qualifications and skills once, and apply to multiple leading companies with a simple 1-click apply process.',
    icon: 'FileCheck',
    color: 'from-emerald-500/10 to-emerald-500/20 text-emerald-600'
  },
  {
    id: 'b3',
    title: 'Interactive Progress Logs',
    description: 'Never guess where your application is. Monitor real-time progress updates inside your student dashboard.',
    icon: 'Radio',
    color: 'from-purple-500/10 to-purple-500/20 text-purple-600'
  },
  {
    id: 'b4',
    title: 'Direct Skill Matching',
    description: 'Our system compares your listed skills directly with matching requirements on the fly for better hiring chances.',
    icon: 'Cpu',
    color: 'from-amber-500/10 to-amber-500/20 text-amber-600'
  }
];
