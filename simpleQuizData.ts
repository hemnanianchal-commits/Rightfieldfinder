import { SimpleQuestion, FieldRecommendation, GuideTip, FieldId } from '../types';

export const QUIZ_QUESTIONS: SimpleQuestion[] = [
  {
    id: 1,
    question: 'Which subject do you enjoy most?',
    options: [
      { id: '1a', text: 'Math & Physics', field: 'engineering' },
      { id: '1b', text: 'Biology & Chemistry', field: 'medical' },
      { id: '1c', text: 'Computer Science & Tech', field: 'cs_it' },
      { id: '1d', text: 'Business & Economics', field: 'business' },
    ],
  },
  {
    id: 2,
    question: 'How do you prefer to solve problems?',
    options: [
      { id: '2a', text: 'Writing logic and code', field: 'cs_it' },
      { id: '2b', text: 'Observing and researching', field: 'medical' },
      { id: '2c', text: 'Sketching visual solutions', field: 'design_arts' },
      { id: '2d', text: 'Debating ideas and writing', field: 'social_sciences' },
    ],
  },
  {
    id: 3,
    question: 'What kind of projects excite you?',
    options: [
      { id: '3a', text: 'Building machines or hardware', field: 'engineering' },
      { id: '3b', text: 'Planning marketing or finances', field: 'business' },
      { id: '3c', text: 'Creating digital apps or games', field: 'cs_it' },
      { id: '3d', text: 'Designing visual media or graphics', field: 'design_arts' },
    ],
  },
  {
    id: 4,
    question: 'Pick one word that describes you best:',
    options: [
      { id: '4a', text: 'Analytical', field: 'engineering' },
      { id: '4b', text: 'Caring', field: 'medical' },
      { id: '4c', text: 'Strategic', field: 'business' },
      { id: '4d', text: 'Creative', field: 'design_arts' },
    ],
  },
  {
    id: 5,
    question: 'Where would you feel most energized working?',
    options: [
      { id: '5a', text: 'In a modern tech office', field: 'cs_it' },
      { id: '5b', text: 'In a clinic or laboratory', field: 'medical' },
      { id: '5c', text: 'In an executive boardroom', field: 'business' },
      { id: '5d', text: 'In a community or legal setting', field: 'social_sciences' },
    ],
  },
  {
    id: 6,
    question: 'How do you like to express your ideas?',
    options: [
      { id: '6a', text: 'Through diagrams and models', field: 'engineering' },
      { id: '6b', text: 'Through visuals and color', field: 'design_arts' },
      { id: '6c', text: 'Through speeches and articles', field: 'social_sciences' },
      { id: '6d', text: 'Through growth metrics and data', field: 'business' },
    ],
  },
  {
    id: 7,
    question: 'What kind of impact matters most to you?',
    options: [
      { id: '7a', text: 'Improving patient health', field: 'medical' },
      { id: '7b', text: 'Developing useful software', field: 'cs_it' },
      { id: '7c', text: 'Advocating for justice and society', field: 'social_sciences' },
      { id: '7d', text: 'Building sustainable infrastructure', field: 'engineering' },
    ],
  },
  {
    id: 8,
    question: 'If you had free time, which would you explore?',
    options: [
      { id: '8a', text: 'A coding tutorial or hackathon', field: 'cs_it' },
      { id: '8b', text: 'A documentary on human science', field: 'medical' },
      { id: '8c', text: 'An art or design exhibition', field: 'design_arts' },
      { id: '8d', text: 'A podcast on leadership and business', field: 'business' },
    ],
  },
];

export const FIELD_RECOMMENDATIONS: Record<FieldId, FieldRecommendation> = {
  cs_it: {
    id: 'cs_it',
    name: 'Computer Science & Software',
    subtitle: 'Building the digital future with code, algorithms, and logic',
    explanation:
      'Your responses reflect a strong curiosity for structured logic, algorithmic problem-solving, and digital tools. You enjoy breaking complex challenges down into manageable steps and building practical software that people can interact with every day.',
    whatToStudy: [
      'Foundational programming (Python, JavaScript, or Java)',
      'Data structures and computational problem-solving',
      'Discrete mathematics, linear algebra, and basic logic',
      'Computer systems and software engineering fundamentals',
    ],
    careerPaths: [
      'Software Engineer / Web Developer',
      'Data Scientist / AI Specialist',
      'Cybersecurity Analyst',
      'Mobile App Developer',
    ],
  },
  engineering: {
    id: 'engineering',
    name: 'Engineering & Technology',
    subtitle: 'Designing, testing, and optimizing physical systems',
    explanation:
      'You are drawn to how physical things work, from intricate machinery to large-scale infrastructure. Your analytical mindset suits fields that apply physical principles, mathematics, and technical modeling to design reliable, real-world solutions.',
    whatToStudy: [
      'Advanced calculus, physics, and mechanics',
      'Computer-aided design (CAD) and physical modeling',
      'Materials science and circuit theory',
      'Systems engineering and project management',
    ],
    careerPaths: [
      'Mechanical or Electrical Engineer',
      'Civil or Structural Engineer',
      'Robotics & Automation Specialist',
      'Renewable Energy Engineer',
    ],
  },
  medical: {
    id: 'medical',
    name: 'Medical & Life Sciences',
    subtitle: 'Understanding living systems and improving human health',
    explanation:
      'Your natural empathy and scientific curiosity align well with biological and health sciences. You find satisfaction in understanding human anatomy, life processes, and discovering treatments that directly support the wellbeing of others.',
    whatToStudy: [
      'Cellular biology, human physiology, and genetics',
      'Organic and biochemistry',
      'Clinical ethics, public health, and research methods',
      'Pharmacology and diagnostic laboratory procedures',
    ],
    careerPaths: [
      'Medical Doctor / Surgeon',
      'Biomedical Researcher / Geneticist',
      'Pharmacist / Clinical Specialist',
      'Physical Therapist / Healthcare Director',
    ],
  },
  business: {
    id: 'business',
    name: 'Business & Finance',
    subtitle: 'Leading organizations, managing markets, and driving strategy',
    explanation:
      'You think strategically about resources, people, and growth. Your mindset combines practical decision-making with leadership, making you well suited for managing organizations, analyzing financial opportunities, and turning ideas into thriving ventures.',
    whatToStudy: [
      'Financial accounting and economic analysis',
      'Marketing strategy, consumer behavior, and brand management',
      'Organizational leadership and operations planning',
      'Data-driven decision making and business analytics',
    ],
    careerPaths: [
      'Financial Analyst / Investment Manager',
      'Management Consultant / Business Strategist',
      'Product Manager / Operations Director',
      'Entrepreneur / Venture Founder',
    ],
  },
  design_arts: {
    id: 'design_arts',
    name: 'Design & Creative Arts',
    subtitle: 'Shaping visual experiences, interfaces, and human connection',
    explanation:
      'You have an eye for visual harmony, storytelling, and user experience. You thrive when translating conceptual ideas into tangible visual forms that communicate clearly and evoke genuine emotional connection.',
    whatToStudy: [
      'Visual design principles, color theory, and typography',
      'Digital interaction design (UI/UX) and user research',
      'Design software (Figma, Adobe Creative Suite, 3D modeling)',
      'Creative storytelling, composition, and visual branding',
    ],
    careerPaths: [
      'UI/UX & Product Designer',
      'Brand Identity / Graphic Designer',
      'Art Director / Creative Lead',
      'Motion Designer / Animator',
    ],
  },
  social_sciences: {
    id: 'social_sciences',
    name: 'Social Sciences & Humanities',
    subtitle: 'Investigating human behavior, society, policy, and justice',
    explanation:
      'You are deeply interested in how societies operate, how people interact, and how policies shape our daily lives. Your communication skills and thoughtful perspective make you a natural fit for roles in advocacy, research, law, and diplomacy.',
    whatToStudy: [
      'Political science, public policy, and constitutional law',
      'Sociology, social psychology, and human behavior',
      'Qualitative and quantitative research methodologies',
      'Critical thinking, ethics, and persuasive writing',
    ],
    careerPaths: [
      'Policy Analyst / Public Affairs Specialist',
      'Corporate Lawyer / Legal Counselor',
      'Diplomat / International Relations Officer',
      'Human Resources / Social Researcher',
    ],
  },
};

export const GUIDE_TIPS: GuideTip[] = [
  {
    id: 1,
    title: 'Focus on what engages your curiosity',
    text: 'Think about the problems you genuinely enjoy working on, not just what pays well right now. Long-term career success comes from staying engaged with your craft.',
  },
  {
    id: 2,
    title: 'Talk to people working in the field',
    text: 'Reach out to professionals doing the day-to-day job you are considering. A quick 15-minute conversation will show you the real daily routine beyond the degree title.',
  },
  {
    id: 3,
    title: 'Remember that your path can evolve',
    text: 'Choosing a field today is a starting direction, not a permanent trap. Most people continuously adapt and combine skills from multiple fields as they grow.',
  },
];
