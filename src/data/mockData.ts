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

const baselineJobs: Job[] = [
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
  },
  {
    id: 'job-9',
    title: 'Graduate Systems Operations Associate',
    companyName: 'Stripe',
    companyId: 'c4',
    logo: 'S',
    location: 'Hyderabad, India (Hybrid)',
    salary: '₹9,50,050 - ₹12,00,000 / year',
    type: 'fresher',
    skills: ['Linux', 'Bash', 'Networking', 'SQL', 'Python'],
    description: 'Join Stripe\'s global Operations Command Center. You will monitor high-priority financial routing transactions, configure custom alert dashboards, write automated triage scripts, and collaborate with globally distributed Site Reliability Engineers.',
    requirements: [
      'Bachelor’s degree in Computer Science, IT, Network Engineering, or comparable technical discipline',
      'Solid foundations in TCP/IP, DNS, routing protocols, and general internet transport mechanics',
      'Ability to write shell scripts (Bash/Python) to parse system metrics and log streams',
      'Comfortable cooperating in rotational shifts supporting live payment routing infrastructures'
    ],
    postedDate: '2 days ago',
    category: 'Cybersecurity & DevOps',
    experienceRequired: 'Fresher (Entry Level)'
  },
  {
    id: 'job-10',
    title: 'Junior DevOps Engineer (Graduate Stream)',
    companyName: 'Meta',
    companyId: 'c6',
    logo: '∞',
    location: 'Remote (India)',
    salary: '₹14,00,000 - ₹19,00,000 / year',
    type: 'fresher',
    skills: ['Docker', 'AWS', 'Python', 'Git', 'Linux Systems'],
    description: 'Launch your Career as a DevOps Engineer at Meta. Help deploy and optimize code-shipping integrations supporting billions of active social accounts. You will coordinate alongside release teams, write Dockerfiles, configure Jenkins/GitHub CI engines, and audit system configurations.',
    requirements: [
      'B.Tech/BE/M.Tech degree with strong system-level orientation',
      'Demonstrated experience building Docker containers and maintaining simple Linux instances',
      'Basic scripting capabilities in Python, Bash, or Go',
      'Passion for infrastructure automation and software developer productivity workflows'
    ],
    postedDate: 'Just now',
    category: 'Cybersecurity & DevOps',
    experienceRequired: '0 - 1 year'
  },
  {
    id: 'job-11',
    title: 'Full Stack Developer Trainee',
    companyName: 'Microsoft',
    companyId: 'c2',
    logo: 'M',
    location: 'Bangalore, India',
    salary: '₹15,50,000 - ₹20,00,500 / year',
    type: 'fresher',
    skills: ['React', 'Node.js', 'C#', 'TypeScript', 'SQL Server'],
    description: 'Perfect opportunity for career entrants interested in compiling enterprise-grade services. Build beautiful web features, configure scalable GraphQL servers, design SQL Server tables, and learn Microsoft cloud application design rules.',
    requirements: [
      'Exceptional performance in coding hackathons or computer projects',
      'Solid command of frontend frameworks (React/TypeScript) and database structures',
      'Exposure to object-oriented programming with C#, Java, or C++',
      'Eager to work on robust software with multi-tiered peer review architectures'
    ],
    postedDate: '1 day ago',
    category: 'Software Development',
    experienceRequired: 'Graduate / Fresher'
  },
  {
    id: 'job-12',
    title: 'AI/ML Associate Researcher',
    companyName: 'Google',
    companyId: 'c1',
    logo: 'G',
    location: 'Bangalore, India (Hybrid)',
    salary: '₹18,00,000 - ₹24,00,000 / year',
    type: 'fresher',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'linear algebra'],
    description: 'Kickstart your career in Google DeepMind and Core AI streams. Collaborate with AI Engineers to train, evaluate, and benchmark deep learning models, specialize in large language models prompt integrations, and optimize cloud model invocation speeds.',
    requirements: [
      'Academic focus or heavy coursework in AI/ML, Mathematics, Statistics or Computer Science',
      'Hands-on experience coding neural networks with PyTorch, TensorFlow, or JAX',
      'Robust knowledge of high-dimensional statistics, calculus, and matrix transformations',
      'Proven interest illustrated by Kaggle participation or published open-source weights'
    ],
    postedDate: 'Yesterday',
    category: 'Data Science & Analytics',
    experienceRequired: '0 - 2 years'
  },
  {
    id: 'job-13',
    title: 'Product Management Intern',
    companyName: 'Stripe',
    companyId: 'c4',
    logo: 'S',
    location: 'Bangalore, India',
    salary: '₹10,00,000 - ₹13,50,000 / year',
    type: 'fresher',
    skills: ['Product Strategy', 'Analytics', 'Figma', 'Technical Writing'],
    description: 'Work alongside a Lead Product Manager on Stripe’s Global Payment Methods team. Track product telemetry metrics, map merchant onboarding journeys, document competitive gaps across payment systems, and compile spec requirements.',
    requirements: [
      'Excellent business acumen paired with computational basics',
      'Superior documentation skills; ability to explain complex technical pipelines logically and clearly',
      'Familiarity with visual wireframing inside Figma and query construction in SQL is a plus',
      'An infectious energy to solve merchant growth bugs'
    ],
    postedDate: '3 days ago',
    category: 'Creative & UI/UX Design',
    experienceRequired: 'Fresher Intern'
  },
  {
    id: 'job-14',
    title: 'Graduate Customer Support Engineer',
    companyName: 'Atlassian',
    companyId: 'c3',
    logo: 'A',
    location: 'Pune, India',
    salary: '₹8,50,000 - ₹11,00,000 / year',
    type: 'fresher',
    skills: ['Customer Relations', 'APIs', 'HTML/CSS', 'Technical Troubleshooting'],
    description: 'Assist our corporate users in diagnosing technical platform errors across Jira and Confluence cloud workspaces. Analyze API response payloads, dissect frontend console exceptions, and formulate automated help modules.',
    requirements: [
      'BSc (IT), BCA, B.Tech or MCA degree with supreme communication attributes',
      'Fundamental command of Web Technologies (HTML, DOM structure, Network tab in DevTools)',
      'Natural curiosity to troubleshoot, investigate logs, and solve tricky logical puzzles',
      'Pristine written English with strong empathy towards systems final-users'
    ],
    postedDate: '5 days ago',
    category: 'Software Development',
    experienceRequired: '0 - 1 years'
  },
  {
    id: 'job-15',
    title: 'Senior Cloud Infrastructure Architect',
    companyName: 'Google',
    companyId: 'c1',
    logo: 'G',
    location: 'Bangalore, India',
    salary: '₹48,00,000 - ₹65,00,000 / year',
    type: 'experienced',
    skills: ['GCP Cloud', 'Terraform', 'Kubernetes', 'Go', 'SRE'],
    description: 'Lead engineering systems supporting Google Cloud core telemetry services. You will design next-generation infrastructure engines, coordinate load balancing strategies using Kubernetes clusters, write robust custom Terraform modules, and secure service meshes.',
    requirements: [
      '6+ years of direct cloud infrastructure planning with complex multi-region architectures',
      'Advanced automation expertise using Python, Go, or Rust',
      'Deep mastery of Google Cloud Platform (GCP) or AWS, with native Kubernetes (GKE) deployments',
      'Past experience guiding systems SRE teams during business-critical downtime outages'
    ],
    postedDate: 'Just now',
    category: 'Cybersecurity & DevOps',
    experienceRequired: '6+ years'
  },
  {
    id: 'job-16',
    title: 'Principal JVM Backend Architect',
    companyName: 'Atlassian',
    companyId: 'c3',
    logo: 'A',
    location: 'Bangalore, India',
    salary: '₹42,00,000 - ₹58,00,000 / year',
    type: 'experienced',
    skills: ['Java', 'Spring Boot', 'System Design', 'PostgreSQL', 'Kafka'],
    description: 'Own the performance and backend strategy for Jira Cloud core issue routing engines. Refine asynchronous transactional pipelines, mitigate database locking during massive concurrent queries, and design robust Event-Driven frameworks with Kafka.',
    requirements: [
      '7+ years backend development using modern Java, Spring Boot, or Kotlin microservices',
      'Pristine understanding of relational databases (PostgreSQL/Oracle) tuning and index optimization',
      'Extensive system design execution for software hosting 50,000+ concurrent users',
      'A true mentor who loves setting design guidelines and standard code-health practices'
    ],
    postedDate: 'Today',
    category: 'Software Development',
    experienceRequired: '7+ years'
  },
  {
    id: 'job-17',
    title: 'Lead UI/UX React Developer',
    companyName: 'Netflix',
    companyId: 'c5',
    logo: 'N',
    location: 'Remote (India / APAC)',
    salary: '₹55,00,000 - ₹72,00,000 / year',
    type: 'experienced',
    skills: ['React', 'TypeScript', 'Web Performance', 'Micro-Frontends', 'CSS'],
    description: 'Reconcile UI speeds across Netflix\'s TV and browser client portals. Design core design-system libraries, leverage WebAssembly or low-overhead canvases to craft interactive movie exploration rails, and orchestrate efficient server-side streaming render algorithms.',
    requirements: [
      '5+ years leading rich responsive web software building utilizing high-end React & TypeScript ecosystems',
      'Stellar achievements optimizing Web Vitals (LCP, INP, CLS) under complex network conditions',
      'Experience with custom bundler setups, lazy asset streams, and micro-frontend structures',
      'Excellent taste for CSS physics, seamless layout animations, and accessibility requirements'
    ],
    postedDate: '3 days ago',
    category: 'Frontend Engineering',
    experienceRequired: '5+ years'
  },
  {
    id: 'job-18',
    title: 'Staff Machine Learning Research Lead',
    companyName: 'Meta',
    companyId: 'c6',
    logo: '∞',
    location: 'Hyderabad, India (Hybrid)',
    salary: '₹65,00,000 - ₹85,00,000 / year',
    type: 'experienced',
    skills: ['PyTorch', 'Transformer Models', 'LLMs', 'CUDA', 'Python'],
    description: 'Champion the core recommendation neural networks powering Meta Ads Manager and Instagram Explore feeds. Train large-scale Transformer decoders, formulate custom CUDA operators to optimize GPU throughput, and coordinate multi-device distributed training iterations.',
    requirements: [
      'PhD or equivalent research focus in Deep Learning, NLP, Computer Vision or Reinforcement Learning',
      '4+ years designing massive production-tier neural models (exceeding 10B parameters)',
      'Expert level programming in PyTorch, Python, and C++ with deep hardware layout understanding',
      'Published research papers at major AI conferences (e.g. NeurIPS, ICML, CVPR) is a massive plus'
    ],
    postedDate: '2 days ago',
    category: 'Data Science & Analytics',
    experienceRequired: '4+ years'
  },
  {
    id: 'job-19',
    title: 'Lead Data Analytics Specialist',
    companyName: 'Microsoft',
    companyId: 'c2',
    logo: 'M',
    location: 'Mumbai, India',
    salary: '₹30,00,000 - ₹43,00,000 / year',
    type: 'experienced',
    skills: ['SQL Server', 'Python', 'Synapse Analytics', 'PowerBI', 'Data Prep'],
    description: 'We are seeking an Analytics Lead of commercial data streams. Build secure cloud datasets tracking Microsoft 365 licensing, construct live corporate dashboards inside PowerBI, and run econometric predictive modeling regarding corporate client churn.',
    requirements: [
      '4+ years scaling commercial datasets and executing analytical projects for corporate stakeholders',
      'Exceptional query structures using SQL with familiarity in data warehousing paradigms',
      'Advanced Python expertise modeling datasets utilizing Pandas, NumPy, Scikit-Learn',
      'Experience mentoring junior analysts, standardizing business documentation reports'
    ],
    postedDate: 'Yesterday',
    category: 'Data Science & Analytics',
    experienceRequired: '4 - 8 years'
  },
  {
    id: 'job-20',
    title: 'Senior iOS Mobile Systems Software Engineer',
    companyName: 'Stripe',
    companyId: 'c4',
    logo: 'S',
    location: 'Bangalore, India (Hybrid)',
    salary: '₹35,00,000 - ₹48,00,000 / year',
    type: 'experienced',
    skills: ['Swift', 'SwiftUI', 'CoreData', 'Mobile Security', 'REST APIs'],
    description: 'Design the core Swift SDK libraries utilized by merchants accepting payments inside native iOS mobile applications. Guarantee rock-solid transaction processing loops, architect clean cryptographic key handling, and structure fluid checkout UI workflows.',
    requirements: [
      '4+ years constructing native iOS systems using Swift, SwiftUI, and standard Apple toolkits',
      'In-depth understanding of sandboxing safety constraints, keychain management, and background network runs',
      'History of shipping developer SDKs or top-reputation apps to the iOS App Store',
      'Great focus on responsive animations, pixel-perfect alignment, and tactile custom feedback'
    ],
    postedDate: '1 week ago',
    category: 'Software Development',
    experienceRequired: '4+ years'
  },
  {
    id: 'job-21',
    title: 'Graduate Cybersecurity Incident Analyst',
    companyName: 'Meta',
    companyId: 'c6',
    logo: '∞',
    location: 'Remote (India)',
    salary: '₹11,00,000 - ₹15,00,000 / year',
    type: 'fresher',
    skills: ['Wireshark', 'Linux', 'Python', 'IDS/IPS', 'Incident Response'],
    description: 'Launch your Career as an incident analyst with Meta\'s global network operations team. Review real-time packet captures, investigate malware triggers, write custom threat signatures using Python, and defend high-volume production gateways.',
    requirements: [
      'B.Tech/BE in Cybersecurity, Information Technology, or closely related technical field',
      'Solid foundations in system architectures, networking models, and protocols',
      'Familiarity with command line environments and basic Python automation scripts',
      'Passionate about threat hunting, ethical hacking, and digital forensics'
    ],
    postedDate: 'Just now',
    category: 'Cybersecurity & DevOps',
    experienceRequired: 'Fresher (Entry Level)'
  },
  {
    id: 'job-22',
    title: 'Principal Site Reliability Architect',
    companyName: 'Atlassian',
    companyId: 'c3',
    logo: 'A',
    location: 'Bangalore, India (Hybrid)',
    salary: '₹45,00,000 - ₹60,00,000 / year',
    type: 'experienced',
    skills: ['Kubernetes', 'SRE', 'Go', 'Terraform', 'Prometheus'],
    description: 'Lead reliability engineering practices across Atlassian Cloud Core spaces. Ensure continuous availability of platforms hosting billions of monthly developer visits, build automated chaos injection tools, and manage massive self-healing cluster fleets.',
    requirements: [
      '6+ years of specialized DevOps or Site Reliability engineering at high-scale tech firms',
      'Advanced automation expertise in Go or Python with deep relational system insights',
      'Substantial history managing highly available services across AWS/Azure or GCP using Kubernetes',
      'Exceptional architectural foresight and incident troubleshooting prowess'
    ],
    postedDate: 'Yesterday',
    category: 'Cybersecurity & DevOps',
    experienceRequired: '6+ years'
  },
  {
    id: 'job-23',
    title: 'Junior UI/UX Frontend Architect',
    companyName: 'Google',
    companyId: 'c1',
    logo: 'G',
    location: 'Hyderabad, India',
    salary: '₹13,50,050 - ₹17,00,000 / year',
    type: 'fresher',
    skills: ['Figma', 'CSS3', 'JavaScript', 'React', 'A11y'],
    description: 'Perfect role for fresh design-oriented software graduates. Help implement high-accessibility web surfaces for Google Search & Maps interfaces. You will translate wireframes into structured semantic React code, and enforce strict WCAG standards.',
    requirements: [
      'BSc/B.Tech/BE in Computer Science or Creative Technologies with severe front-end orientation',
      'Superb knowledge of semantic HTML, flexible layouts (CSS Flexbox/Grid), and React hooks',
      'Familiarity with Figma translation workflows, prototyping, and design systems',
      'Deep interest in creating inclusive software usable by everyone'
    ],
    postedDate: '2 days ago',
    category: 'Creative & UI/UX Design',
    experienceRequired: '0 - 1 years'
  },
  {
    id: 'job-24',
    title: 'Lead Threat Intelligence Investigator',
    companyName: 'Microsoft',
    companyId: 'c2',
    logo: 'M',
    location: 'Bangalore, India (Hybrid)',
    salary: '₹38,00,000 - ₹52,00,000 / year',
    type: 'experienced',
    skills: ['Malware Analysis', 'Reverse Engineering', 'SIEM', 'Python', 'Networking'],
    description: 'Take charge of Advanced Threat Protection workflows within Azure Sentinel systems. Dissect critical malware vectors, investigate zero-day vulnerabilities, author predictive analytics alerts in Python/Kusto, and brief enterprise customer teams.',
    requirements: [
      '5+ years in defensive security, malware reverse engineering, or SOC threat investigation',
      'Solid mastery of registry mechanics, memory dumps, and software binary inspection',
      'Experience scripting threat classification engines using Python or Go',
      'Inherent curiosity to expose persistent adversaries'
    ],
    postedDate: '3 days ago',
    category: 'Cybersecurity & DevOps',
    experienceRequired: '5+ years'
  },
  {
    id: 'job-25',
    title: 'Associate Data Science Engineer',
    companyName: 'Stripe',
    companyId: 'c4',
    logo: 'S',
    location: 'Bangalore, India',
    salary: '₹12,00,000 - ₹16,50,000 / year',
    type: 'fresher',
    skills: ['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'A/B Testing'],
    description: 'Join Stripes growth and conversion analytic frameworks. Cleanse massive transaction logs, build regression predictors to anticipate customer sign-up drop-offs, design robust A/B testing methodologies, and communicate outcomes to lead managers.',
    requirements: [
      'B.Tech/BE/M.Sc in Physics, Economics, Mathematics, Computer Science or equivalent analytical major',
      'Excellent performance in quantitative database manipulation (advanced queries in SQL)',
      'Substantial competence in Python with mathematical and model utilities (Pandas, Numpy, Scikit-learn)',
      'Eagerness to dissect behavioral logs and convert them to actionable insights'
    ],
    postedDate: '4 days ago',
    category: 'Data Science & Analytics',
    experienceRequired: 'Fresher (Entry Level)'
  },
  {
    id: 'job-26',
    title: 'Senior Developer Advocate',
    companyName: 'Google',
    companyId: 'c1',
    logo: 'G',
    location: 'Remote (India)',
    salary: '₹42,00,000 - ₹55,00,000 / year',
    type: 'experienced',
    skills: ['Technical Writing', 'Go', 'Kubernetes', 'Public Speaking', 'API Design'],
    description: 'Own Google Cloud developer relations across regional cloud clusters. You will author comprehensive sample apps, deliver educational technical keynotes at multi-national summits, build SDK client suites, and relay developer feedback to core product teams.',
    requirements: [
      '4+ years as a backend engineer or developer relations professional with global SaaS reach',
      'Exceptional verbal and written exposition; ability to decode extremely complex APIs clearly',
      'Hands-on engineering comfort in at least one cloud-native language (Go, Python, TypeScript)',
      'Past history of active participation in open-source developer spaces'
    ],
    postedDate: '5 days ago',
    category: 'Developer Advocacy',
    experienceRequired: '4+ years'
  },
  {
    id: 'job-27',
    title: 'Android App Engineering Associate',
    companyName: 'Netflix',
    companyId: 'c5',
    logo: 'N',
    location: 'Mumbai, India',
    salary: '₹15,00,000 - ₹19,50,000 / year',
    type: 'fresher',
    skills: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Java', 'Retrofit'],
    description: 'Grow your skills inside our elite Netflix Mobile Client engineering teams. Write rich video player viewport interactions inside Jetpack Compose, build reliable offline buffering workflows, and keep core bundle files light and efficient.',
    requirements: [
      'Recent graduate with several published Kotlin projects or substantial personal Android repos',
      'Familiarity with Kotlin design conventions, coroutines, and native systems APIs',
      'Excellent written communication and debugging aptitude using Android Profiler tools',
      'Hungry to master highly available streaming layout designs'
    ],
    postedDate: 'Yesterday',
    category: 'Software Development',
    experienceRequired: 'Graduate / Fresher'
  },
  {
    id: 'job-28',
    title: 'Staff Database Optimization Architect',
    companyName: 'Microsoft',
    companyId: 'c2',
    logo: 'M',
    location: 'Bangalore, India',
    salary: '₹46,00,000 - ₹62,00,000 / year',
    type: 'experienced',
    skills: ['PostgreSQL', 'SQL Server', 'Query Tuning', 'NoSQL', 'Redis'],
    description: 'We are seeking a seasoned Specialist in relational performance tuning. You will analyze heavy locking situations in multi-tenant cloud storage structures, standardize analytical query indices, configure distributed partition guidelines, and implement high-efficiency caching.',
    requirements: [
      '6+ years of operational database administration or systems platform level development',
      'Unsurpassed master of index strategies, physical disk allocations, and query optimization tools',
      'Deep systems experience running SQL Server or PostgreSQL platforms under high write workloads',
      'Exceptional diagnostic abilities with complex log systems'
    ],
    postedDate: '3 days ago',
    category: 'Software Development',
    experienceRequired: '6+ years'
  },
  {
    id: 'job-29',
    title: 'Associate Systems Administrator (DevOps Stream)',
    companyName: 'Atlassian',
    companyId: 'c3',
    logo: 'A',
    location: 'Pune, India (Hybrid)',
    salary: '₹9,00,000 - ₹12,50,000 / year',
    type: 'fresher',
    skills: ['Linux', 'Bash', 'Docker', 'Git', 'Nginx'],
    description: 'Excellent entry spot supporting internal developer environments. Maintain continuous integration workflows, configure local proxy servers, coordinate simple Linux virtual instance backups, and standardize system scripts.',
    requirements: [
      'BSc in IT, BCA, MCA, or comparable academic certificate',
      'Sound fundamental comfort managing Linux distributions (Ubuntu/RedHat) from raw terminals',
      'Hands-on experience compiling Docker containers and general version control structures',
      'Inherent interest to pursue structured automation as a system reliability route'
    ],
    postedDate: 'Yesterday',
    category: 'Cybersecurity & DevOps',
    experienceRequired: '0 - 1 years'
  },
  {
    id: 'job-30',
    title: 'Staff Machine Learning Platforms Engineer',
    companyName: 'Meta',
    companyId: 'c6',
    logo: '∞',
    location: 'Hyderabad, India',
    salary: '₹60,00,000 - ₹80,00,000 / year',
    type: 'experienced',
    skills: ['MLOps', 'Kubeflow', 'PyTorch', 'Docker', 'SkyPilot'],
    description: 'Empower hundreds of Meta research engineers by standardizing deep learning frameworks. Design secure GPU orchestrations, implement automated pipeline models versioning using Kubeflow, and prune memory bottlenecks during cluster-wide evaluation rounds.',
    requirements: [
      '5+ years building software infrastructures, specializing in MLOps pipelines and cloud setups',
      'Deep operational expertise in Kubernetes architectures and automated container management systems',
      'Hands-on Python expertise paired with familiarity regarding PyTorch distributed parameters',
      'Passionate about simplifying workflow friction for high-performance computing groups'
    ],
    postedDate: 'Just now',
    category: 'Data Science & Analytics',
    experienceRequired: '5+ years'
  }
];

// PROGRAMMATIC EXPANSION FOR MASS TEST SCALE 
const extraJobs: Job[] = [];
const companiesForExpansion = [
  { id: 'c1', name: 'Google', logo: 'G' },
  { id: 'c2', name: 'Microsoft', logo: 'M' },
  { id: 'c3', name: 'Atlassian', logo: 'A' },
  { id: 'c4', name: 'Stripe', logo: 'S' },
  { id: 'c5', name: 'Netflix', logo: 'N' },
  { id: 'c6', name: 'Meta', logo: '∞' }
];

const categoriesForExpansion = [
  'Software Development',
  'Frontend Engineering',
  'Cybersecurity & DevOps',
  'Data Science & Analytics',
  'Creative & UI/UX Design',
  'Developer Advocacy',
  'Quality Assurance'
];

const skillsByCat: Record<string, string[][]> = {
  'Software Development': [
    ['Java', 'Spring Boot', 'SQL', 'Git', 'REST APIs', 'Spring Security'],
    ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis', 'Celery'],
    ['C#', '.NET Core', 'SQL Server', 'Git', 'Azure', 'Microservices'],
    ['Go', 'Docker', 'Kubernetes', 'gRPC', 'PostgreSQL', 'REST APIs'],
    ['C++', 'Multithreading', 'Algorithms', 'STL', 'OOP', 'Linux']
  ],
  'Frontend Engineering': [
    ['React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Jest'],
    ['Vue', 'Nuxt.js', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML5'],
    ['React', 'Next.js', 'GraphQL', 'Tailwind CSS', 'TypeScript', 'Prisma'],
    ['HTML5', 'CSS3', 'Tailwind CSS', 'Web Accessibility', 'UX Prototyping'],
    ['Angular', 'TypeScript', 'RxJS', 'Sass', 'Karma', 'Ngrx']
  ],
  'Cybersecurity & DevOps': [
    ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD Pipelines'],
    ['Python', 'Go', 'Prometheus', 'Grafana', 'SRE', 'Linux'],
    ['Wireshark', 'Linux', 'Python', 'Incident Response', 'IDS/IPS'],
    ['Kali Linux', 'Penetration Testing', 'SIEM', 'OWASP Top 10', 'TCP/IP'],
    ['Azure DevOps', 'Terraform', 'Bash', 'Docker', 'Ansible']
  ],
  'Data Science & Analytics': [
    ['Python', 'Pandas', 'Jupyter', 'Scikit-Learn', 'Matplotlib'],
    ['SQL', 'PowerBI', 'Tableau', 'Excel', 'Data Pipelines'],
    ['PyTorch', 'TensorFlow', 'Python', 'Deep Learning', 'Transformers'],
    ['R', 'Statistics', 'Regression', 'Data Cleansing', 'SQL'],
    ['Spark', 'Hadoop', 'SQL', 'Data Lakes', 'Python']
  ],
  'Creative & UI/UX Design': [
    ['Figma', 'UI Design', 'Wireframing', 'User Research', 'Adobe XD'],
    ['Product Design', 'Figma', 'User Persona', 'Prototyping', 'UI Builder'],
    ['Interaction Design', 'Figma', 'CSS Grid', 'Typography', 'A11y'],
    ['Illustrator', 'Motion Graphics', 'Figma', 'Design Systems', 'Brand Identity'],
    ['UX Writing', 'Information Architecture', 'Figma', 'Prototyping']
  ],
  'Developer Advocacy': [
    ['Go', 'Technical Writing', 'Public Speaking', 'API Design', 'GitHub'],
    ['React', 'TypeScript', 'Developer Experience', 'Blogging', 'Public Relations'],
    ['Python', 'APIs', 'Docker', 'Tech Blogging', 'SaaS Advocate'],
    ['Community Building', 'DevEx', 'Open Source', 'GitHub', 'Markdown'],
    ['TypeScript', 'Swift', 'Flutter', 'Developer Education', 'API Docs']
  ],
  'Quality Assurance': [
    ['Selenium', 'Java', 'JUnit', 'Maven', 'Test Automation', 'Jira'],
    ['Playwright', 'TypeScript', 'Jest', 'CI/CD', 'API Testing'],
    ['Cypress', 'JavaScript', 'Bug Logging', 'Test Cases', 'Postman'],
    ['Manual Testing', 'Excel', 'Regression Testing', 'Bugzilla', 'Smoke Testing'],
    ['Postman', 'REST APIs', 'Newman', 'JSON Schema', 'Automated QA']
  ]
};

const jobTitlesByCat: Record<string, { fresher: string[]; experienced: string[] }> = {
  'Software Development': {
    fresher: [
      'Graduate Platform Developer', 'Junior Backend Engineer Trainee', 'Software Apprentice',
      'System Developer Trainee', 'Associate Systems Analyst', 'Junior Developer (C#/.NET)',
      'Backend Programming Associate', 'Systems Engineering Intern', 'Associate Application Builder'
    ],
    experienced: [
      'Senior Infrastructure Architect', 'Lead Microservice Engineer', 'Principal Distributed Developer',
      'VP of Enterprise Applications', 'Staff Systems Programmer', 'Senior Java Developer',
      'Principal Go/Cloud Systems Specialist', 'Director of Backend Operations', 'Lead API Systems Architect'
    ]
  },
  'Frontend Engineering': {
    fresher: [
      'Junior Web Developer', 'Web Design Apprentice', 'React Developer Intern',
      'Associate UI Engineer', 'Frontend Developer Trainee', 'Web Application Intern',
      'UI Engineering Assistant', 'React Native Associate', 'Graduate Frontend Designer'
    ],
    experienced: [
      'Senior Principal Frontend Lead', 'Staff Web Experience Optimizer', 'Lead Responsive UI Architect',
      'Head of Consumer Frontends', 'UI Performance Specialist', 'Senior React Architect',
      'Staff Screen Engineering Expert', 'Principal Native Mobile Developer', 'Director of Product Interfaces'
    ]
  },
  'Cybersecurity & DevOps': {
    fresher: [
      'Graduate Security Analyst', 'DevOps Automation Apprentice', 'Junior Systems Admin',
      'Threat Response Intern', 'Cloud Support Engineering Trainee', 'Associate NOC Operator',
      'Cybersecurity Support Trainee', 'SRE Operations Intern', 'Junior Linux Specialist'
    ],
    experienced: [
      'Lead DevSecOps Investigator', 'Staff Infrastructure SRE Architect', 'Senior Threat Hunter',
      'Principal Cloud Defense Officer', 'SRE Release Automation Lead', 'Director of Network Operations',
      'Senior Penetration Systems Specialist', 'Cloud Architecture Operations Lead', 'Principal Kubernetes Architect'
    ]
  },
  'Data Science & Analytics': {
    fresher: [
      'Junior Data Analyst', 'Big Data Engineering Intern', 'ML Evaluation Associate',
      'Junior Quant Analyst', 'Business Analytics Trainee', 'Data Cleaning Assistant',
      'Associate Business Reporter', 'Metrics System Trainee', 'SQL Reporting Associate'
    ],
    experienced: [
      'Staff ML Platform Research Lead', 'Principal Data Warehouse Architect', 'Senior Predictive Modeler',
      'Director of Commercial BI Systems', 'Lead Deep Learning Scientist', 'Principal Neural Network Optimizer',
      'Senior Econometrician', 'Staff Quantitative Modeler', 'Principal ETL System Architect'
    ]
  },
  'Creative & UI/UX Design': {
    fresher: [
      'UI Design Apprentice', 'Junior Graphic Specialist', 'Figma Prototyping Trainee',
      'Associate UX Researcher', 'Figma Tooling Intern', 'Junior Identity Designer',
      'UX Copywriter Assistant', 'Visual Wireframing Trainee', 'User Experience Intern'
    ],
    experienced: [
      'Lead Architectural UX Designer', 'Director of Design Systems', 'Principal Human Experience Specialist',
      'Senior Design Strategist', 'Lead Touch-Interaction Analyst', 'Creative Systems Director',
      'Senior Custom Responsive UX Lead', 'Principal Product Experience Strategist', 'Director of Creative Assets'
    ]
  },
  'Developer Advocacy': {
    fresher: [
      'Junior Developer Outreach Liaison', 'API Documentation Assistant', 'Open Source Contributor Intern',
      'Developer Advocate Trainee', 'Technical Copy Editor Trainee', 'Developer Community Coordinator',
      'API Integration Apprentice', 'SDK Setup Assistant', 'Junior Technical Evangelist'
    ],
    experienced: [
      'Principal DevEx Architect', 'Global VP of Developer Support', 'Lead SDK Platform Advocate',
      'Director of Open Source Engagement', 'Senior DevEx Evangelist', 'Principal Technical Writer',
      'Lead Developer Ecosystem Representative', 'Global Head of Developer Advocacy', 'Lead API Outreach Specialist'
    ]
  },
  'Quality Assurance': {
    fresher: [
      'QA Manual Tester Trainee', 'Junior Automation Tester', 'Test Script Assistant',
      'SDET Associate Trainee', 'QA Regression Intern', 'Junior Bug Investigator',
      'API Verification Assistant', 'System Integration Tester', 'Graduate QA Officer'
    ],
    experienced: [
      'Staff Automated SDET Architect', 'Director of Quality Platform Engineering', 'Principal Regression Engineering Lead',
      'Senior Systems Automation Consultant', 'Global Head of Testing Standards', 'Staff API Security Tester',
      'Lead Automated Performance Validator', 'Senior Release Quality Lead', 'Principal Cypress QA Architect'
    ]
  }
};

const locationsForGen = [
  'Bangalore, India (Hybrid)', 'Hyderabad, India (Hybrid)', 'Pune, India (Hybrid)',
  'Mumbai, India (Hybrid)', 'Delhi NCR, India', 'Remote (India)', 'Remote (APAC)',
  'Bangalore, India', 'Hyderabad, India', 'Chennai, India', 'Noida, India (Hybrid)',
  'Gurugram, India', 'Remote (India/Singapore)', 'Kolkata, India'
];

const postedTimesForGen = [
  'Just now', 'Today', 'Yesterday', '1 day ago', '2 days ago', '3 days ago', '4 days ago',
  '5 days ago', '1 week ago', '10 days ago', '2 weeks ago'
];

// Seed the programmatic generator of 1100 extra jobs
const teamNamesForGen = [
  'Platform Tech', 'Core Infrastructure', 'Cloud Systems Solutions', 
  'Product Dev Labs', 'Sustaining Engineering', 'Next-Gen Core', 
  'Strategic Integrations', 'Global Services', 'Interface Dynamics', 
  'Advanced Data Ops', 'SRE Systems Group', 'Security Controls Team'
];

for (let i = 1; i <= 1100; i++) {
  const cat = categoriesForExpansion[i % categoriesForExpansion.length];
  const type = i % 2 === 0 ? 'fresher' : 'experienced';
  const cmp = companiesForExpansion[i % companiesForExpansion.length];
  const loc = locationsForGen[i % locationsForGen.length];
  const post = postedTimesForGen[i % postedTimesForGen.length];
  const team = teamNamesForGen[i % teamNamesForGen.length];
  
  const titleList = jobTitlesByCat[cat]?.[type] || ['Software Engineer'];
  const baseTitle = titleList[i % titleList.length];
  const title = `${baseTitle} - ${team} (${String.fromCharCode(65 + (i % 6))}-${100 + i})`;
  
  const skillsList = skillsByCat[cat] || [['Git']];
  const skills = skillsList[i % skillsList.length];
  
  let baseSalary = type === 'fresher' ? 8 + (i % 8) : 25 + (i % 45);
  const salaryRange = type === 'fresher' 
    ? `₹${baseSalary},00,000 - ₹${baseSalary + 4},00,000 / year`
    : `₹${baseSalary},00,000 - ₹${baseSalary + 12},00,000 / year`;
    
  const expText = type === 'fresher' 
    ? (i % 3 === 0 ? 'Fresher (Entry Level)' : '0 - 1 years')
    : `${3 + (i % 5)}+ years`;

  extraJobs.push({
    id: `job-gen-${i}`,
    title,
    companyName: cmp.name,
    companyId: cmp.id,
    logo: cmp.logo,
    location: loc,
    salary: salaryRange,
    type,
    skills,
    description: `Join the ${team} at ${cmp.name} as a dynamic ${title}. Work in our modern ${loc} office to build high-performance pipelines. This role is crucial to our active global platforms serving millions of digital clients. You will learn, grow, and set advanced benchmarks within a collaborative framework.`,
    requirements: [
      `Bachelor's / Master's degree in Computer Science, IT, or equivalent professional specialization`,
      `Demonstrated proficiency in ${skills[0]} and associated system-level paradigms`,
      `Excellent communication skills and strong alignment with clean coding practices`,
      `Past experience or structural focus in ${skills[1]} or ${skills[2]}`
    ],
    postedDate: post,
    category: cat,
    experienceRequired: expText
  });
}

export const mockJobs: Job[] = [...baselineJobs, ...extraJobs];

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
