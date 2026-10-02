// TECHNO-X Mock Data Store
// 100% Privacy-Safe Dataset for Techno Group of Institutions (TGI)
// Zero student faces, zero personal emails, zero personal phone numbers.
// All images are strictly architecture, stadiums, stages, instruments, and graphics.

export const TIHS_OFFICIAL_INFO = {
  institutionName: "Techno Institute of Higher Studies (TIHS)",
  parentGroup: "Techno Group of Institutions (TGI)",
  tagline: "Inspiring Excellence, Building Futures",
  hindiTagline: "Connect. Participate. Experience. • हर इवेंट, एक प्लेटफॉर्म।",
  affiliation: "Affiliated to University of Lucknow & Approved by AICTE, UGC recognized",
  accreditation: "NAAC Accredited Institution",
  helpline: "+91 (0522) 278-9000",
  tollFree: "1800-120-8447",
  address: "Techno Campus, Faizabad Road, Lucknow, Uttar Pradesh 226028",
  email: "helpdesk@technox.tgi.ac.in",
  eventsEmail: "events@technox.tgi.ac.in",
  socials: {
    instagram: "https://www.instagram.com/technogroupofinstitutionslko/",
    youtube: "https://www.youtube.com/channel/UCm3Xw4YjiuQqkKhfT04qCRw",
    facebook: "https://www.facebook.com/technogroupofinstitutions/",
    linkedin: "https://www.linkedin.com/company/technogroupofinstitutions/",
    twitter: "https://x.com/technogroup2?lang=en"
  }
};

export const INITIAL_USERS = [
  {
    id: "USR-001",
    name: "Dr. Rajeshwar Sen",
    email: "admin@technox.tgi.ac.in",
    role: "ADMIN",
    status: "ACTIVE",
    adminId: "TGI-ADM-001",
    department: "Central Administration",
    mobile: "+91 98000 00001",
    avatar: "https://ui-avatars.com/api/?name=Rajeshwar+Sen&background=1e293b&color=38bdf8&bold=true",
    joinedDate: "2023-01-10",
  },
  {
    id: "USR-002",
    name: "Prof. Ananya Banerjee",
    email: "faculty@technox.tgi.ac.in",
    role: "FACULTY",
    status: "ACTIVE",
    facultyId: "TGI-FAC-104",
    department: "Computer Applications & Management",
    designation: "Associate Professor & Dean of Student Affairs",
    mobile: "+91 98000 00002",
    avatar: "https://ui-avatars.com/api/?name=Ananya+Banerjee&background=312e81&color=818cf8&bold=true",
    joinedDate: "2023-06-15",
  },
  {
    id: "USR-003",
    name: "Vikramaditya Roy",
    email: "committee@technox.tgi.ac.in",
    role: "MANAGEMENT_COMMITTEE",
    status: "ACTIVE",
    committeeId: "TGI-MC-201",
    department: "Campus Life & Logistics",
    designation: "Lead Event Operations Manager",
    mobile: "+91 98000 00003",
    avatar: "https://ui-avatars.com/api/?name=Vikramaditya+Roy&background=581c87&color=c084fc&bold=true",
    joinedDate: "2023-08-01",
  },
  {
    id: "USR-004",
    name: "Aarav Sharma",
    email: "student@technox.tgi.ac.in",
    role: "STUDENT",
    status: "ACTIVE",
    studentId: "TGI2025BCA768",
    course: "BCA",
    year: "1st Year",
    semester: "2nd Semester",
    mobile: "+91 98000 00004",
    avatar: "https://ui-avatars.com/api/?name=Aarav+Sharma&background=065f46&color=34d399&bold=true",
    joinedDate: "2025-08-10",
    batch: "2025-2028",
  },
];

export const INITIAL_STUDENTS = [
  {
    id: "STU-001",
    studentId: "TGI2025BCA768",
    name: "Aarav Sharma",
    email: "aarav.s@technox.tgi.ac.in",
    course: "BCA",
    year: "1st Year",
    semester: "2nd Semester",
    status: "ACTIVE",
    mobile: "+91 98000 00004",
    avatar: "https://ui-avatars.com/api/?name=Aarav+Sharma&background=065f46&color=34d399&bold=true",
    department: "Computer Applications",
    cgpa: 8.92,
    attendanceRate: 94.5,
    eventsAttendedCount: 6,
    batch: "2025-2028",
    qrHash: "TX-VERIFY-TGI2025BCA768-SECURE-TOKEN-AARAV"
  },
  {
    id: "STU-002",
    studentId: "TGI2025BBA421",
    name: "Priya Mukherjee",
    email: "priya.m@technox.tgi.ac.in",
    course: "BBA",
    year: "1st Year",
    semester: "2nd Semester",
    status: "ACTIVE",
    mobile: "+91 98000 00005",
    avatar: "https://ui-avatars.com/api/?name=Priya+Mukherjee&background=831843&color=f472b6&bold=true",
    department: "Management Studies",
    cgpa: 9.15,
    attendanceRate: 97.0,
    eventsAttendedCount: 8,
    batch: "2025-2028",
    qrHash: "TX-VERIFY-TGI2025BBA421-SECURE-TOKEN-PRIYA"
  },
  {
    id: "STU-003",
    studentId: "TGI2024BCA315",
    name: "Rohan Gupta",
    email: "rohan.g@technox.tgi.ac.in",
    course: "BCA",
    year: "2nd Year",
    semester: "4th Semester",
    status: "ACTIVE",
    mobile: "+91 98000 00006",
    avatar: "https://ui-avatars.com/api/?name=Rohan+Gupta&background=1e3a8a&color=60a5fa&bold=true",
    department: "Computer Applications",
    cgpa: 8.45,
    attendanceRate: 88.0,
    eventsAttendedCount: 5,
    batch: "2024-2027",
    qrHash: "TX-VERIFY-TGI2024BCA315-SECURE-TOKEN-ROHAN"
  },
  {
    id: "STU-004",
    studentId: "TGI2025BCOM112",
    name: "Sneha Paul",
    email: "sneha.p@technox.tgi.ac.in",
    course: "B.Com",
    year: "1st Year",
    semester: "2nd Semester",
    status: "ACTIVE",
    mobile: "+91 98000 00007",
    avatar: "https://ui-avatars.com/api/?name=Sneha+Paul&background=701a75&color=e879f9&bold=true",
    department: "Commerce",
    cgpa: 9.40,
    attendanceRate: 98.2,
    eventsAttendedCount: 7,
    batch: "2025-2028",
    qrHash: "TX-VERIFY-TGI2025BCOM112-SECURE-TOKEN-SNEHA"
  },
  {
    id: "STU-005",
    studentId: "TGI2024BAJMC089",
    name: "Devendra Verma",
    email: "devendra.v@technox.tgi.ac.in",
    course: "BAJMC",
    year: "2nd Year",
    semester: "4th Semester",
    status: "ACTIVE",
    mobile: "+91 98000 00008",
    avatar: "https://ui-avatars.com/api/?name=Devendra+Verma&background=713f12&color=facc15&bold=true",
    department: "Journalism & Mass Comm",
    cgpa: 7.95,
    attendanceRate: 85.5,
    eventsAttendedCount: 4,
    batch: "2024-2027",
    qrHash: "TX-VERIFY-TGI2024BAJMC089-SECURE-TOKEN-DEVENDRA"
  }
];

export const INITIAL_FACULTY = [
  {
    id: "FAC-001",
    facultyId: "TGI-FAC-104",
    name: "Prof. Ananya Banerjee",
    email: "faculty@technox.tgi.ac.in",
    department: "Computer Applications",
    designation: "Associate Professor & Dean of Student Affairs",
    mobile: "+91 98000 00002",
    avatar: "https://ui-avatars.com/api/?name=Ananya+Banerjee&background=312e81&color=818cf8&bold=true",
    committeesLed: ["KIRAN", "ABHIVYAKTI"]
  },
  {
    id: "FAC-002",
    facultyId: "TGI-FAC-108",
    name: "Prof. Meenakshi Iyer",
    email: "meenakshi.i@technox.tgi.ac.in",
    department: "Management Studies",
    designation: "Professor & Cultural Dean",
    mobile: "+91 98000 00009",
    avatar: "https://ui-avatars.com/api/?name=Meenakshi+Iyer&background=1e293b&color=38bdf8&bold=true",
    committeesLed: ["ABHIVYAKTI", "OORJA", "SRIJAN"]
  },
  {
    id: "FAC-003",
    facultyId: "TGI-FAC-112",
    name: "Dr. Sourav Sengupta",
    email: "sourav.s@technox.tgi.ac.in",
    department: "Commerce & Economics",
    designation: "Head of Placements Liaison",
    mobile: "+91 98000 00010",
    avatar: "https://ui-avatars.com/api/?name=Sourav+Sengupta&background=1e293b&color=38bdf8&bold=true",
    committeesLed: ["SANJEEVANI", "DARPAN"]
  }
];

export const INITIAL_COMMITTEE = [
  {
    id: "MC-001",
    committeeId: "TGI-MC-201",
    name: "Vikramaditya Roy",
    email: "committee@technox.tgi.ac.in",
    department: "Campus Life & Logistics",
    designation: "Lead Event Operations Manager",
    mobile: "+91 98000 00003",
    avatar: "https://ui-avatars.com/api/?name=Vikramaditya+Roy&background=581c87&color=c084fc&bold=true"
  }
];

export const CATEGORIES = [
  { id: "CAT-01", name: "Cultural", description: "Fests, music, dance, theatre, rockshows, and fine arts fests by Abhivyakti", color: "pink" },
  { id: "CAT-02", name: "Academic", description: "Seminars, debates, paper presentations, case studies, and quizzes by Kiran", color: "orange" },
  { id: "CAT-03", name: "Sports", description: "Inter-department leagues, cricket, football, athletics, and badminton by Oorja", color: "emerald" },
  { id: "CAT-04", name: "Media", description: "Short film festivals, photography expos, street plays (Nukkad Natak), and PR by Darpan", color: "rose" },
  { id: "CAT-05", name: "Placement", description: "Mega career fairs, mock interview panels, GD boot camps, and alumni meets by Sanjeevani", color: "teal" },
  { id: "CAT-06", name: "CSR", description: "Muskaan donation drives, blood donation camps, BCLP computer literacy, and green drives by Srijan", color: "lime" },
  { id: "CAT-07", name: "Institutional", description: "Induction orientations, convocations, farewell assemblies, and foundation day", color: "violet" }
];

// All committee banners use architecture, stage, or lawn visuals (zero faces)
export const COMMITTEES = [
  {
    id: "kiran",
    clubId: "CLB-01",
    name: "KIRAN",
    tagline: "The Academic Committee",
    icon: "BookOpen",
    color: "blue",
    banner: "/campus_hero.png",
    logo: "/campus_hero.png",
    description: "The Academic Committee is a vital link between the student body and faculty at Techno. It focuses on academic assessments, curriculum enrichment, regular faculty-student open houses, and building a productive academic culture.",
    vision: "To foster and sustain a productive academic-oriented-culture of assessment at Techno by emphasizing the positive outcomes of the process on the betterment of academic programs and student development as well as faculty development programs.",
    mission: "We aspire to provide students with rich and deep learning experiences and anticipate that our craft will prepare our graduates for a fulfilling career and help them make a positive contribution to society.",
    objectives: [
      "Apply knowledge in creative ways",
      "Experiment with new ideas, identities, and skills",
      "Improving the relationship and industry exposure between students and their concerned departments",
      "Creating a greater integration between academics and the campus climate",
      "Holding dialogues on regular basis between students and faculty to discuss academic issues",
      "Creating zeal for academic venture"
    ],
    events: [
      "Seminars, Conferences & Workshops",
      "Paper Presentations",
      "Simulation Games",
      "Case Studies",
      "Vaktavya (Debate)",
      "Literati (Creative Writing)",
      "Brand O Mania (Quiz)",
      "Horse Race (Business Plan)",
      "Commercial Madness (Ad Mad)",
      "Essay Writing Competition"
    ],
    coreSkills: ["Networking", "Time Management", "Resilience", "Presentation Skills", "Leadership & Management"],
    facultyCoordinator: "Prof. Ananya Banerjee",
    studentLead: "Rohan Gupta",
    membersCount: 180,
    status: "ACTIVE"
  },
  {
    id: "abhivyakti",
    clubId: "CLB-02",
    name: "ABHIVYAKTI",
    tagline: "The Cultural Committee",
    icon: "Music",
    color: "purple",
    banner: "/techno_stage.png",
    logo: "/techno_stage.png",
    description: "Abhivyakti @ TECHNO is established to proliferate the Self Esteem & Sense of Achievement in Students via the Management Tool of POSDCORB (Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting). Spearheads the flagship annual fest ANTARANG.",
    vision: "To create innovative experiences that connect, educate and inspire.",
    mission: "We are committed to ensure that you receive tailored event management solutions that bring exceptional results. We want you to not only love the experience of the event, but also the experience of working with us.",
    objectives: [
      "To make students learn the various management skills like Planning, Organizing, Directing and Controlling",
      "To enhance co-operation and team work among the students",
      "To give opportunity to all to exhibit their individual talents",
      "To give an exposure to holistic development",
      "To contribute in developing the artistic talents of students",
      "To provide a platform for students to go beyond their academic quest and explore their creative sensibilities",
      "To bring limelight to the hidden talent of the students",
      "To add zest to college life by organizing various intra and inter college cultural events"
    ],
    events: [
      "Induction Programme",
      "Tashan (Fresher's Party)",
      "Teacher's Day Celebration",
      "Sports & Sparkle",
      "Antarang — Annual Fest Cultural Night",
      "Antarang — Inter Collegiate Competition",
      "Splash Bash (Rain Dance Party)",
      "Farewell Party",
      "Face Painting Competition",
      "Goonj (Solo Singing)",
      "Footsteps (Solo Dance)",
      "Sur Sargam (Antakshari)",
      "Kalakriti (Chart Making)",
      "Alpana (Rangoli)",
      "Dumb Charades",
      "Rockshow",
      "Treasure Hunt",
      "Graffiti",
      "Various Other Intra & Inter Competitions & Celebrations"
    ],
    coreSkills: ["Interpersonal Skills", "Flexibility", "Energetic", "Creative and Innovative", "Leadership Skills", "Organizational Skills", "Teamwork"],
    facultyCoordinator: "Prof. Meenakshi Iyer",
    studentLead: "Priya Mukherjee",
    membersCount: 320,
    status: "ACTIVE"
  },
  {
    id: "oorja",
    clubId: "CLB-03",
    name: "OORJA",
    tagline: "The Sports Committee",
    icon: "Trophy",
    color: "emerald",
    banner: "/techno_concert.jpg",
    logo: "/techno_concert.jpg",
    description: "The Sports Committee organizes, coordinates, and promotes college-level games and sports tournaments. Oorja ensures that the best minds stay fit and healthy while building unbeatable teamwork and competitive leadership.",
    vision: "To provide students with means and environment to pursue their sporting passions.",
    mission: "To nourish budding sportsmen and strengthen the sporting environment among students.",
    objectives: [
      "To help students achieve a health-enhancing life of physical activity",
      "To help students understand and respect individual differences in physical settings",
      "To provide for a safe physical environment",
      "To provide students with a variety of activities that will enhance lifelong participation",
      "To develop superior individual/team prowess",
      "To promote physical excellence"
    ],
    events: [
      "Athletics (Track & Field)",
      "Badminton (Singles & Doubles)",
      "Basketball Championship",
      "Carrom Tournament",
      "Cricket League (T10 & T20)",
      "Chess Championship",
      "Football League",
      "Hockey",
      "Squash",
      "Swimming Meet",
      "Table Tennis",
      "Lawn Tennis",
      "Throw Ball",
      "Volleyball Tournament"
    ],
    coreSkills: ["Drive", "Discipline", "Competitiveness", "Focus", "Commitment", "Time Management", "High Endurance", "Adaptability"],
    facultyCoordinator: "Prof. Meenakshi Iyer",
    studentLead: "Devendra Verma",
    membersCount: 250,
    status: "ACTIVE"
  },
  {
    id: "darpan",
    clubId: "CLB-04",
    name: "DARPAN",
    tagline: "The Media Committee",
    icon: "Camera",
    color: "rose",
    banner: "/techno_fest_evening.jpg",
    logo: "/techno_fest_evening.jpg",
    description: "The Media Committee provides centralized services across Photography, Video coverage, Audio Systems, and Journalism. Equipped with professional equipment handled by trained student photojournalists and media creators.",
    vision: "To have a shared understanding, alignment, and commitment to project our institute's vision that sets the course and empowers people to take action.",
    mission: "To enrich the mind and nourish the spirit, assisting our students to expand perspectives and strengthen their digital communication capabilities.",
    objectives: [
      "Realistic Exposure to Journalism & Mass Media",
      "Personality development and confident public speaking",
      "Competence in print, electronic, and social media production",
      "Publishing campus periodicals and news bulletins"
    ],
    events: [
      "Publishing the Bi-monthly Campus Bulletin",
      "Informative Newsletter & Press Releases",
      "Photography Exhibition cum Competition",
      "Selfie & Mobile Photography Contest",
      "Short Film Festival",
      "Nukkad Natak (Street Play)",
      "Poster Making & Slogan Writing",
      "Poetry & Shayari Competition",
      "Audio-Video Storytelling"
    ],
    coreSkills: ["Photography", "Videography", "Writing Skills", "Interviewing", "Networking", "Public Relations", "Digital Storytelling"],
    facultyCoordinator: "Dr. Sourav Sengupta",
    studentLead: "Devendra Verma",
    membersCount: 150,
    status: "ACTIVE"
  },
  {
    id: "sanjeevani",
    clubId: "CLB-05",
    name: "SANJEEVANI",
    tagline: "The Placement Committee",
    icon: "Briefcase",
    color: "teal",
    banner: "/campus_hero.png",
    logo: "/campus_hero.png",
    description: "Sanjeevani acts as the corporate interface of the college, liaising between recruiters and the student community. Coordinates guest lectures, pre-placement training, resume clinics, and campus interview drives.",
    vision: "To envisage an ideal interface between industry requirements and student aspirations, ensuring the right person for the right job.",
    mission: "To equip students with conceptualized professional skills guiding them towards bright careers with values of Sincerity, Hard Work, and Ethics.",
    objectives: [
      "To assist 100% career placements",
      "To groom students for corporate scenarios and interview rigor",
      "To maintain active liaison with top national recruiters",
      "To cultivate young leaders ready for industry challenges",
      "To develop strong analytical and competitive capabilities"
    ],
    events: [
      "Mock Interviews with Corporate HRs",
      "Group Discussions (GD) Boot Camps",
      "Annual Alumni Meet & Networking Night",
      "Mega Campus Career Fair",
      "Industrial & Corporate Tours",
      "On-Campus Placement Drives"
    ],
    coreSkills: ["Quick Learner", "Corporate Communication", "Networking Skills", "Interview Prep", "Professional Ethics"],
    facultyCoordinator: "Dr. Sourav Sengupta",
    studentLead: "Sneha Paul",
    membersCount: 120,
    status: "ACTIVE"
  },
  {
    id: "srijan",
    clubId: "CLB-06",
    name: "SRIJAN",
    tagline: "The CSR Committee (In association with Rotary Club)",
    icon: "Heart",
    color: "amber",
    banner: "/techno_stage.png",
    logo: "/techno_stage.png",
    description: "Corporate Social Responsibility (CSR) is at the core of humanism as practiced by Techno. Srijan drives impactful humanitarian welfare projects in collaboration with Rotary Club, Barabanki.",
    vision: "To be a model academic entity with social responsibility committed to energizing lives through sustainable development.",
    mission: "To create a positive impact across all communities where we operate.",
    objectives: [
      "Inculcating a sense of social responsibility and empathy in students",
      "Making a measurable difference through sustained community welfare",
      "Partnering with Rotary Club and healthcare institutions for impact",
      "Empowering underprivileged youth through education and healthcare"
    ],
    events: [
      "Muskaan Donation Drive (Clothes, Books, Stationery, Food)",
      "Learn to Earn (Job skill training for underprivileged women)",
      "Go Green (Waste reduction & environmental awareness)",
      "Tree Plantation Drives",
      "Sanrakshan (Free Health Checkup Camp with city hospitals)",
      "Basic Computer Literacy Program (BCLP weekend labs)",
      "Blood Donation Camp (Over 200+ units for cancer patients)",
      "Techno Enlightens (Career counseling for school students)"
    ],
    coreSkills: ["Empathy", "Community Leadership", "Humanism", "Social Responsibility", "Volunteering"],
    facultyCoordinator: "Prof. Meenakshi Iyer",
    studentLead: "Aarav Sharma",
    membersCount: 200,
    status: "ACTIVE"
  }
];

export const CLUBS = COMMITTEES;

// 100% REAL TIHS LUCKNOW EVENTS — ZERO STUDENT FACES (Architecture, Stages, Turf, Instruments)
export const INITIAL_EVENTS = [
  // ── ABHIVYAKTI (Cultural Committee) Flagships ──
  {
    id: "EVT-001",
    title: "ANTARANG 2026 — Annual Cultural Fest (Celebrity Star Night)",
    category: "Cultural",
    committeeId: "abhivyakti",
    clubId: "CLB-02",
    banner: "/techno_gate.jpg", // Entrance gate visual (no human faces)
    date: "2026-10-15",
    endDate: "2026-10-17",
    time: "04:00 PM IST",
    endTime: "10:30 PM IST",
    venue: "Main Campus Grounds & Central Amphitheatre",
    capacity: 600,
    registeredCount: 420,
    waitlistCount: 0,
    registrationDeadline: "2026-10-12T23:59:59",
    status: "PUBLISHED",
    organizer: "ABHIVYAKTI Cultural Committee",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "Open to all enrolled students, faculty, and verified alumni of Techno Group of Institutions.",
    description: "The grandest annual cultural festival of TIHS Lucknow! Featuring star celebrity concert with DJ Rihya from Mumbai, classical fusion ensembles, rock band showdowns, food carnival, and inter-college cultural competitions.",
    rules: [
      "Digital pass QR check at entrance gate mandatory.",
      "Valid institutional student ID card required for gate verification.",
      "Strict campus decorum and safety protocol enforced."
    ],
    schedule: [
      { time: "Day 1 - 04:00 PM", item: "Inaugural Ceremony & Classical Fusion Performance" },
      { time: "Day 2 - 06:00 PM", item: "Battle of the Bands & Collegiate Dance Troupes" },
      { time: "Day 3 - 07:00 PM", item: "Star Night: DJ Rihya from Mumbai Live Concert" }
    ],
    prizes: [
      { position: "1st Prize (Battle of the Bands)", reward: "₹50,000 Cash + Rolling Trophy" },
      { position: "Best Dance Troupe", reward: "₹30,000 Cash" }
    ]
  },
  {
    id: "EVT-002",
    title: "Tashan 2026 — Annual Fresher's Welcoming Extravaganza",
    category: "Cultural",
    committeeId: "abhivyakti",
    clubId: "CLB-02",
    banner: "/techno_stage.png", // Tagore lawn stage (no human faces)
    date: "2026-10-08",
    endDate: "2026-10-08",
    time: "03:00 PM IST",
    endTime: "08:30 PM IST",
    venue: "Tagore Lawn Arena & Main Stage",
    capacity: 400,
    registeredCount: 310,
    waitlistCount: 0,
    registrationDeadline: "2026-10-06T23:59:59",
    status: "PUBLISHED",
    organizer: "ABHIVYAKTI Cultural Committee",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "1st Year students and departmental seniors.",
    description: "Welcoming the new batch of BCA, BBA, B.Com, BAJMC, and B.Ed students to Techno family. Packed with runway fashion walks, Mr. & Ms. Fresher titles, acoustic bands, and high-energy dance performances.",
    rules: [
      "Formal or Indo-Western dress code.",
      "First year students have reserved seating in front pavilion."
    ],
    schedule: [
      { time: "03:00 PM", item: "Welcome Address & Senior Performances" },
      { time: "05:00 PM", item: "Mr. & Ms. Fresher Talent Round & Runway" },
      { time: "07:00 PM", item: "DJ Celebration & Dinner" }
    ],
    prizes: [
      { position: "Mr. & Ms. Fresher", reward: "Crown, Sash & ₹10,000 Voucher" }
    ]
  },
  {
    id: "EVT-003",
    title: "Goonj 2026 — Solo & Duet Singing Championship",
    category: "Cultural",
    committeeId: "abhivyakti",
    clubId: "CLB-02",
    banner: "/techno_fest_evening.jpg", // Fest evening lights (no faces)
    date: "2026-10-16",
    endDate: "2026-10-16",
    time: "02:00 PM IST",
    endTime: "06:30 PM IST",
    venue: "Central Open-Air Amphitheatre",
    capacity: 100,
    registeredCount: 82,
    waitlistCount: 0,
    registrationDeadline: "2026-10-14T23:59:59",
    status: "PUBLISHED",
    organizer: "ABHIVYAKTI Cultural Committee",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "Open to all enrolled students.",
    description: "The premier singing competition of Techno, celebrating soulful melodies in Bollywood, Sufi, Indian Semi-Classical, and Western genres. Judged by distinguished music educators.",
    rules: ["Solo or Duet format.", "Max 5 minutes on stage.", "Karaoke or live acoustic guitar allowed."],
    schedule: [
      { time: "02:00 PM", item: "Prelims & Semi-Final Round" },
      { time: "04:30 PM", item: "Grand Finale Performance" }
    ],
    prizes: [
      { position: "1st Position", reward: "₹8,000 + Studio Recording Session Voucher" },
      { position: "2nd Position", reward: "₹5,000" }
    ]
  },
  {
    id: "EVT-004",
    title: "Footsteps — Inter-Department Dance Battle 2026",
    category: "Cultural",
    committeeId: "abhivyakti",
    clubId: "CLB-02",
    banner: "/techno_concert.jpg", // Stage lighting truss (no faces)
    date: "2026-10-16",
    endDate: "2026-10-16",
    time: "06:30 PM IST",
    endTime: "09:30 PM IST",
    venue: "Central Open-Air Amphitheatre",
    capacity: 120,
    registeredCount: 96,
    waitlistCount: 0,
    registrationDeadline: "2026-10-14T23:59:59",
    status: "PUBLISHED",
    organizer: "ABHIVYAKTI Cultural Committee",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "All departments.",
    description: "Electrifying dance battle across Hip-Hop, Contemporary, Freestyle, and Bollywood Fusion. Features dynamic face-offs, synchronized group choreography, and judges' spotlight rounds.",
    rules: ["Max 4 minutes for solo, 7 minutes for groups.", "Soundtracks must be submitted 24h prior."],
    schedule: [
      { time: "06:30 PM", item: "Solo Showdowns" },
      { time: "08:00 PM", item: "Group Choreography & Winner Felicitations" }
    ],
    prizes: [
      { position: "Best Dance Crew", reward: "₹15,000 + Trophy" },
      { position: "Best Solo Dancer", reward: "₹6,000" }
    ]
  },

  // ── KIRAN (Academic Committee) Flagships ──
  {
    id: "EVT-005",
    title: "Vaktavya — All India Inter-Collegiate Parliamentary Debate",
    category: "Academic",
    committeeId: "kiran",
    clubId: "CLB-01",
    banner: "/campus_hero.png", // Main academic wing
    date: "2026-11-15",
    endDate: "2026-11-16",
    time: "10:00 AM IST",
    endTime: "05:00 PM IST",
    venue: "Sir J.C. Bose Seminar Hall",
    capacity: 120,
    registeredCount: 85,
    waitlistCount: 0,
    registrationDeadline: "2026-11-10T23:59:59",
    status: "PUBLISHED",
    organizer: "KIRAN Academic Committee",
    facultyCoordinator: "Prof. Ananya Banerjee",
    eligibility: "Undergraduate and postgraduate students across all streams.",
    description: "Prestigious parliamentary debate championship covering artificial intelligence governance, economic policy, sustainable development, and social ethics. Top speakers earn selections for state-level debate teams.",
    rules: [
      "Teams of 2 (Proposer and Opposer).",
      "Motion revealed 30 minutes before each round.",
      "Strict parliamentary speaking protocol observed."
    ],
    schedule: [
      { time: "Day 1", item: "Preliminary Pools & Quarter Finals" },
      { time: "Day 2", item: "Semi Finals, Grand Final & Awards Ceremony" }
    ],
    prizes: [
      { position: "Best Speaker", reward: "₹10,000 + Gold Medal" },
      { position: "Winning Team", reward: "₹20,000 + Rotating Trophy" }
    ]
  },
  {
    id: "EVT-006",
    title: "Brand O Mania — Annual Business & Brand Quiz Championship",
    category: "Academic",
    committeeId: "kiran",
    clubId: "CLB-01",
    banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", // Digital quiz / technology desk (no faces)
    date: "2026-10-22",
    endDate: "2026-10-22",
    time: "02:00 PM IST",
    endTime: "05:30 PM IST",
    venue: "Smart Classroom Complex Block A",
    capacity: 90,
    registeredCount: 78,
    waitlistCount: 0,
    registrationDeadline: "2026-10-18T23:59:59",
    status: "PUBLISHED",
    organizer: "KIRAN Academic Committee",
    facultyCoordinator: "Prof. Ananya Banerjee",
    eligibility: "BBA, BCA, B.Com, MBA students.",
    description: "High-octane corporate quiz featuring buzzer rounds, audio-visual company logo identification, startup case trivia, and Fortune 500 blitz questions.",
    rules: ["Teams of 3 students.", "Quizmaster's decisions final and irrevocable."],
    schedule: [
      { time: "02:00 PM", item: "Written Qualifier Round (30 Questions)" },
      { time: "03:30 PM", item: "Top 6 Teams Stage Buzzer Finals" }
    ],
    prizes: [
      { position: "Champion Team", reward: "₹12,000 + Memento" },
      { position: "1st Runner-Up", reward: "₹6,000" }
    ]
  },
  {
    id: "EVT-007",
    title: "Horse Race — Business Plan & Pitch Competition",
    category: "Academic",
    committeeId: "kiran",
    clubId: "CLB-01",
    banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", // Modern corporate boardroom (no faces)
    date: "2026-11-25",
    endDate: "2026-11-25",
    time: "10:30 AM IST",
    endTime: "04:30 PM IST",
    venue: "Auditorium Hall B",
    capacity: 100,
    registeredCount: 65,
    waitlistCount: 0,
    registrationDeadline: "2026-11-20T23:59:59",
    status: "PUBLISHED",
    organizer: "KIRAN Academic Committee",
    facultyCoordinator: "Prof. Ananya Banerjee",
    eligibility: "Aspiring student entrepreneurs with validated business ideas.",
    description: "Pitch your startup or business plan to angel investors, startup incubators, and faculty jury. 10-minute pitch followed by rigorous Q&A on unit economics, scalability, and market fit.",
    rules: ["Teams of 2 to 4.", "Pitch deck max 12 slides.", "Financial projections mandatory."],
    schedule: [
      { time: "10:30 AM", item: "Pitch Presentations" },
      { time: "03:30 PM", item: "Investor Feedback & Seed Grant Announcement" }
    ],
    prizes: [
      { position: "Best Business Plan", reward: "₹25,000 Seed Grant + Incubation Support" }
    ]
  },
  {
    id: "EVT-008",
    title: "Commercial Madness — The Ad Mad Show 2026",
    category: "Academic",
    committeeId: "kiran",
    clubId: "CLB-01",
    banner: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80", // Creative studio & design board (no faces)
    date: "2026-11-05",
    endDate: "2026-11-05",
    time: "01:30 PM IST",
    endTime: "05:00 PM IST",
    venue: "Sir J.C. Bose Seminar Hall",
    capacity: 120,
    registeredCount: 88,
    waitlistCount: 0,
    registrationDeadline: "2026-11-01T23:59:59",
    status: "PUBLISHED",
    organizer: "KIRAN Academic Committee",
    facultyCoordinator: "Prof. Ananya Banerjee",
    eligibility: "Open to all students.",
    description: "Hilarious and inventive advertising competition where student teams create spoof advertisements, witty jingles, and brand campaigns for fictional and wacky consumer products.",
    rules: ["Teams of 3 to 5.", "Time limit: 3-5 minutes on stage.", "Humor and creativity awarded."],
    schedule: [{ time: "01:30 PM", item: "Stage Presentations & Live Skits" }],
    prizes: [
      { position: "1st Place", reward: "₹10,000 + Trophy" },
      { position: "Most Creative Ad", reward: "₹5,000" }
    ]
  },

  // ── OORJA (Sports Committee) Flagships ──
  {
    id: "EVT-009",
    title: "TGI Inter-Department Cricket Tournament 2026",
    category: "Sports",
    committeeId: "oorja",
    clubId: "CLB-03",
    banner: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80", // Cricket pitch & turf (no faces)
    date: "2026-11-08",
    endDate: "2026-11-12",
    time: "08:00 AM IST",
    endTime: "06:00 PM IST",
    venue: "TGI Main Sports Ground",
    capacity: 200,
    registeredCount: 160,
    waitlistCount: 0,
    registrationDeadline: "2026-11-02T23:59:59",
    status: "PUBLISHED",
    organizer: "OORJA Sports Committee",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "All departments (BCA, BBA, B.Com, BAJMC, B.Ed).",
    description: "Five days of electrifying cricket action! 8 department teams battle through round-robin group fixtures, thrilling semi-finals, and floodlit grand finale for the Chancellor Cup.",
    rules: ["10-over format.", "White cricket jersey mandatory.", "Standard BCCI rules apply."],
    schedule: [
      { time: "Day 1 to 3", item: "Group League Matches" },
      { time: "Day 4", item: "Semi-Final Clashes" },
      { time: "Day 5", item: "Grand Final & Trophy Presentation" }
    ],
    prizes: [
      { position: "Champion Department", reward: "TGI Chancellor Cup + ₹25,000" },
      { position: "Player of the Tournament", reward: "Cricket Kit + Trophy" }
    ]
  },
  {
    id: "EVT-010",
    title: "TechnoSpardha — Badminton Open Championship 2026",
    category: "Sports",
    committeeId: "oorja",
    clubId: "CLB-03",
    banner: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80", // Badminton court & shuttle (no faces)
    date: "2026-11-14",
    endDate: "2026-11-15",
    time: "09:00 AM IST",
    endTime: "05:00 PM IST",
    venue: "TGI Indoor Synthetic Badminton Arena",
    capacity: 64,
    registeredCount: 56,
    waitlistCount: 0,
    registrationDeadline: "2026-11-10T23:59:59",
    status: "PUBLISHED",
    organizer: "OORJA Sports Committee",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "Men and Women Singles & Doubles across all faculties.",
    description: "High-intensity collegiate badminton tournament on state-of-the-art synthetic indoor courts. Seeded knockout format adhering to Badminton World Federation guidelines.",
    rules: ["Non-marking badminton shoes mandatory.", "Yonex Mavis 350 shuttles provided."],
    schedule: [
      { time: "Day 1", item: "Round of 32 & 16" },
      { time: "Day 2", item: "Quarter, Semi & Grand Finals" }
    ],
    prizes: [
      { position: "Singles Winner (Men/Women)", reward: "₹6,000 + Badminton Racket" },
      { position: "Doubles Champions", reward: "₹10,000 + Medals" }
    ]
  },
  {
    id: "EVT-011",
    title: "Techno Football League (TFL) 2026",
    category: "Sports",
    committeeId: "oorja",
    clubId: "CLB-03",
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80", // Football stadium turf under lights (no faces)
    date: "2026-12-01",
    endDate: "2026-12-04",
    time: "02:30 PM IST",
    endTime: "06:00 PM IST",
    venue: "Main Campus Turf Football Field",
    capacity: 120,
    registeredCount: 96,
    waitlistCount: 0,
    registrationDeadline: "2026-11-26T23:59:59",
    status: "PUBLISHED",
    organizer: "OORJA Sports Committee",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "Enrolled students with valid physical fitness declaration.",
    description: "7-a-side football tournament between department cohorts. Featuring speed, precision passing, and passionate student cheer sections.",
    rules: ["Shin guards and football studs mandatory.", "Two 25-minute halves."],
    schedule: [{ time: "Every Afternoon", item: "Match Fixtures & Playoff Rounds" }],
    prizes: [
      { position: "Champions", reward: "₹20,000 + Gold Medals" }
    ]
  },

  // ── DARPAN (Media Committee) Flagships ──
  {
    id: "EVT-012",
    title: "Darpan Short Film Festival & Documentaries 2026",
    category: "Media",
    committeeId: "darpan",
    clubId: "CLB-04",
    banner: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80", // Cinema projector & film reel (no faces)
    date: "2026-11-20",
    endDate: "2026-11-20",
    time: "11:00 AM IST",
    endTime: "05:00 PM IST",
    venue: "Auditorium Hall A",
    capacity: 180,
    registeredCount: 42,
    waitlistCount: 0,
    registrationDeadline: "2026-11-15T23:59:59",
    status: "PUBLISHED",
    organizer: "DARPAN Media Committee",
    facultyCoordinator: "Dr. Sourav Sengupta",
    eligibility: "Open to student filmmakers across all courses.",
    description: "Screening of student-directed short films, fictional narratives, and investigative documentaries focusing on campus life, human emotion, and social issues. Followed by a masterclass with regional directors.",
    rules: ["Max 15 minutes runtime.", "Full HD (1080p) MP4 video submission.", "Original background score or royalty-free audio."],
    schedule: [
      { time: "11:00 AM", item: "Short Film Screenings" },
      { time: "03:30 PM", item: "Director's Q&A & Award Jury Verdict" }
    ],
    prizes: [
      { position: "Best Director", reward: "₹15,000 + Trophy" },
      { position: "Best Cinematography", reward: "₹7,000" }
    ]
  },
  {
    id: "EVT-013",
    title: "Nukkad Natak — Annual Street Play Championship",
    category: "Media",
    committeeId: "darpan",
    clubId: "CLB-04",
    banner: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80", // Outdoor amphitheatre stage & red curtains (no faces)
    date: "2026-11-22",
    endDate: "2026-11-22",
    time: "10:00 AM IST",
    endTime: "01:30 PM IST",
    venue: "Central Campus Courtyard",
    capacity: 150,
    registeredCount: 84,
    waitlistCount: 0,
    registrationDeadline: "2026-11-18T23:59:59",
    status: "PUBLISHED",
    organizer: "DARPAN Media Committee",
    facultyCoordinator: "Dr. Sourav Sengupta",
    eligibility: "Teams of 6 to 14 students.",
    description: "Vibrant and intense street plays enacted in open courtyard highlighting social awareness, women empowerment, mental health, and civic duties with thunderous dholak beats and chorus chants.",
    rules: ["12-15 minutes runtime.", "No electronic microphones; acoustic and vocal projection only."],
    schedule: [{ time: "10:00 AM", item: "Courtyard Street Play Performances" }],
    prizes: [
      { position: "Best Street Play Team", reward: "₹15,000 + Trophy" },
      { position: "Best Actor (Male/Female)", reward: "₹3,500 each" }
    ]
  },
  {
    id: "EVT-014",
    title: "Drishti — Annual Photography Exhibition & Contest",
    category: "Media",
    committeeId: "darpan",
    clubId: "CLB-04",
    banner: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80", // Professional camera & lenses (no faces)
    date: "2026-11-28",
    endDate: "2026-11-29",
    time: "10:00 AM IST",
    endTime: "04:30 PM IST",
    venue: "Central Academic Block Art Gallery",
    capacity: 100,
    registeredCount: 68,
    waitlistCount: 0,
    registrationDeadline: "2026-11-24T23:59:59",
    status: "PUBLISHED",
    organizer: "DARPAN Media Committee",
    facultyCoordinator: "Dr. Sourav Sengupta",
    eligibility: "Open to all students with mobile or DSLR cameras.",
    description: "Two-day visual exhibition showcasing best student photographs across categories: Campus Architecture, Street Portraits, Wildlife & Nature, and Monochromatic Frames.",
    rules: ["Max 3 photo submissions per photographer.", "No AI-generated imagery permitted."],
    schedule: [{ time: "10:00 AM", item: "Public Gallery Walkthrough & Voting" }],
    prizes: [
      { position: "Photographer of the Year", reward: "₹10,000 + Camera Accessories Kit" }
    ]
  },

  // ── SANJEEVANI (Placement Committee) Flagships ──
  {
    id: "EVT-015",
    title: "Corporate Synergy — Mega Campus Placement Conclave 2026",
    category: "Placement",
    committeeId: "sanjeevani",
    clubId: "CLB-05",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", // Glass corporate skyscrapers (no faces)
    date: "2026-10-28",
    endDate: "2026-10-29",
    time: "09:30 AM IST",
    endTime: "05:00 PM IST",
    venue: "Placement Cell Convention Center",
    capacity: 300,
    registeredCount: 220,
    waitlistCount: 0,
    registrationDeadline: "2026-10-24T23:59:59",
    status: "PUBLISHED",
    organizer: "SANJEEVANI Placement Committee",
    facultyCoordinator: "Dr. Sourav Sengupta",
    eligibility: "2nd, 3rd, and Final year students of BCA, BBA, B.Com, and MCA.",
    description: "Direct interaction and recruitment opportunities with 40+ leading corporate employers, tech firms, banks, and consulting companies. Live on-spot interviews, HR panels, and offer letters.",
    rules: [
      "Strict corporate formal dress code.",
      "Bring 5 hard copies of verified resume and student ID card."
    ],
    schedule: [
      { time: "09:30 AM", item: "Inaugural Keynote by HR Leaders" },
      { time: "11:00 AM", item: "Corporate Booth Visits & Resume Screening" },
      { time: "02:30 PM", item: "Interview Rounds & Shortlists" }
    ],
    prizes: []
  },
  {
    id: "EVT-016",
    title: "Mock Interview & Group Discussion Intensive Boot Camp",
    category: "Placement",
    committeeId: "sanjeevani",
    clubId: "CLB-05",
    banner: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80", // Modern corporate meeting space (no faces)
    date: "2026-10-30",
    endDate: "2026-10-31",
    time: "09:00 AM IST",
    endTime: "04:30 PM IST",
    venue: "Placement Training Suites 1 & 2",
    capacity: 100,
    registeredCount: 92,
    waitlistCount: 0,
    registrationDeadline: "2026-10-26T23:59:59",
    status: "PUBLISHED",
    organizer: "SANJEEVANI Placement Committee",
    facultyCoordinator: "Dr. Sourav Sengupta",
    eligibility: "Pre-final and Final year students.",
    description: "Rigorous simulated corporate interview sessions and GD rounds led by corporate consultants. Personalized scorecard on body language, domain knowledge, and articulation.",
    rules: ["Punctuality strictly enforced.", "Formal attire required."],
    schedule: [
      { time: "Day 1", item: "Group Discussion Mastery & Mock GD Panels" },
      { time: "Day 2", item: "Technical & Behavioral 1-on-1 Interviews" }
    ],
    prizes: []
  },
  {
    id: "EVT-017",
    title: "Annual Alumni Reunion & Corporate Mentoring Night 2026",
    category: "Placement",
    committeeId: "sanjeevani",
    clubId: "CLB-05",
    banner: "/techno_stage.png", // Tagore lawn evening stage (no faces)
    date: "2026-12-05",
    endDate: "2026-12-05",
    time: "05:00 PM IST",
    endTime: "09:30 PM IST",
    venue: "Main Campus Grounds & Convention Hall",
    capacity: 350,
    registeredCount: 240,
    waitlistCount: 0,
    registrationDeadline: "2026-11-30T23:59:59",
    status: "PUBLISHED",
    organizer: "SANJEEVANI Placement Committee",
    facultyCoordinator: "Dr. Rajeshwar Sen",
    eligibility: "All students, faculty, and returning TGI alumni.",
    description: "An evening of reconnection with 200+ successful TIHS alumni working at top MNCs and unicorns. One-on-one student mentoring, fireside chat on corporate career growth, and dinner banquet.",
    rules: ["Smart casual or formal dress code.", "Pre-registration mandatory for dinner."],
    schedule: [
      { time: "05:00 PM", item: "Welcome Address & Alumni Panel" },
      { time: "07:00 PM", item: "Mentoring Circles & Networking Dinner" }
    ],
    prizes: []
  },

  // ── SRIJAN (CSR Committee with Rotary Club) Flagships ──
  {
    id: "EVT-018",
    title: "Muskaan — Annual Campus Donation Drive 2026",
    category: "CSR",
    committeeId: "srijan",
    clubId: "CLB-06",
    banner: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80", // Charity donation box & notebooks (no faces)
    date: "2026-12-10",
    endDate: "2026-12-12",
    time: "09:00 AM IST",
    endTime: "04:00 PM IST",
    venue: "Central Courtyard & Collection Desks",
    capacity: 500,
    registeredCount: 340,
    waitlistCount: 0,
    registrationDeadline: "2026-12-08T23:59:59",
    status: "PUBLISHED",
    organizer: "SRIJAN CSR Committee (with Rotary Club)",
    facultyCoordinator: "Prof. Meenakshi Iyer",
    eligibility: "Open to all students, faculty, and staff.",
    description: "Technoites join hands to bring smiles! 3-day donation drive collecting winter clothes, books, stationery, and non-perishable food packs distributed to local shelter homes and child education centers in collaboration with Rotary Club, Barabanki.",
    rules: ["Donations accepted at designated student counters.", "Volunteer certificates awarded to student contributors."],
    schedule: [
      { time: "Day 1-2", item: "Campus-Wide Collection Drive" },
      { time: "Day 3", item: "Sorting, Packaging & Distribution Ceremony" }
    ],
    prizes: []
  },
  {
    id: "EVT-019",
    title: "Sanrakshan — Mega Free Community Health Camp 2026",
    category: "CSR",
    committeeId: "srijan",
    clubId: "CLB-06",
    banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80", // Medical stethoscope & health instruments on clinic desk (no faces)
    date: "2026-12-18",
    endDate: "2026-12-18",
    time: "09:30 AM IST",
    endTime: "03:30 PM IST",
    venue: "Tagore Lawn Pavilion & Medical Wing",
    capacity: 250,
    registeredCount: 180,
    waitlistCount: 0,
    registrationDeadline: "2026-12-15T23:59:59",
    status: "PUBLISHED",
    organizer: "SRIJAN CSR Committee (with Rotary Club)",
    facultyCoordinator: "Dr. Rajeshwar Sen",
    eligibility: "Open to students, campus staff, and local community members.",
    description: "Free medical checkup camp organized in association with premier city hospitals. General health screening, ophthalmology tests, blood pressure checkup, dental screening, and free consultations.",
    rules: ["Carry valid student/aadhaar card for consultation card."],
    schedule: [{ time: "09:30 AM", item: "Doctor Consultations & Free Screenings" }],
    prizes: []
  },
  {
    id: "EVT-020",
    title: "Rakt Daan Mahadan — Blood Donation Camp (200+ Units Target)",
    category: "CSR",
    committeeId: "srijan",
    clubId: "CLB-06",
    banner: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80", // Red cross healthcare symbolism (no faces)
    date: "2026-12-22",
    endDate: "2026-12-22",
    time: "09:00 AM IST",
    endTime: "03:30 PM IST",
    venue: "Campus Medical Center & Central Hall",
    capacity: 200,
    registeredCount: 165,
    waitlistCount: 0,
    registrationDeadline: "2026-12-20T23:59:59",
    status: "PUBLISHED",
    organizer: "SRIJAN CSR Committee (with Rotary Club)",
    facultyCoordinator: "Dr. Rajeshwar Sen",
    eligibility: "Healthy donors aged 18+ with weight > 45kg.",
    description: "Blood collected at this camp directly supports cancer patients and emergency trauma units across Lucknow hospitals. Recognized as one of the largest collegiate blood donation drives in the region.",
    rules: ["Age 18+ required.", "Hemoglobin test performed before donation.", "Donor card and refreshments provided."],
    schedule: [{ time: "09:00 AM", item: "Registration, Screening & Donation" }],
    prizes: []
  },
  {
    id: "EVT-021",
    title: "Basic Computer Literacy Program (BCLP) — Weekend Workshop",
    category: "CSR",
    committeeId: "srijan",
    clubId: "CLB-06",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80", // Modern computer lab screens & keyboard (no faces)
    date: "2026-11-21",
    endDate: "2026-11-22",
    time: "10:00 AM IST",
    endTime: "02:00 PM IST",
    venue: "Computer Center Lab 1, Ground Floor",
    capacity: 50,
    registeredCount: 45,
    waitlistCount: 0,
    registrationDeadline: "2026-11-18T23:59:59",
    status: "PUBLISHED",
    organizer: "SRIJAN CSR Committee (with Rotary Club)",
    facultyCoordinator: "Prof. Ananya Banerjee",
    eligibility: "Techno student volunteers teaching underprivileged youth.",
    description: "Student-led weekend initiative where Techno BCA and BBA students teach foundational computer skills, typing, digital literacy, and internet safety to 50 young learners from underprivileged backgrounds.",
    rules: ["Volunteers must commit to both Saturday and Sunday sessions."],
    schedule: [{ time: "10:00 AM", item: "Hands-on Student Lab Modules" }],
    prizes: []
  }
];

export const INITIAL_REGISTRATIONS = [
  {
    id: "REG-2025-001",
    registrationId: "REG-2025-001",
    eventId: "EVT-001",
    eventTitle: "ANTARANG 2026 — Annual Cultural Fest (Celebrity Star Night)",
    eventDate: "2026-10-15",
    eventVenue: "Main Campus Grounds & Central Amphitheatre",
    studentId: "TGI2025BCA768",
    studentName: "Aarav Sharma",
    studentEmail: "student@technox.tgi.ac.in",
    course: "BCA",
    year: "1st Year",
    registeredAt: "2026-09-18T14:32:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  },
  {
    id: "REG-2025-002",
    registrationId: "REG-2025-002",
    eventId: "EVT-003",
    eventTitle: "Goonj 2026 — Solo & Duet Singing Championship",
    eventDate: "2026-10-16",
    eventVenue: "Central Open-Air Amphitheatre",
    studentId: "TGI2025BCA768",
    studentName: "Aarav Sharma",
    studentEmail: "student@technox.tgi.ac.in",
    course: "BCA",
    year: "1st Year",
    registeredAt: "2026-09-20T11:15:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  },
  {
    id: "REG-2025-003",
    registrationId: "REG-2025-003",
    eventId: "EVT-005",
    eventTitle: "Vaktavya — All India Inter-Collegiate Parliamentary Debate",
    eventDate: "2026-11-15",
    eventVenue: "Sir J.C. Bose Seminar Hall",
    studentId: "TGI2025BCA768",
    studentName: "Aarav Sharma",
    studentEmail: "student@technox.tgi.ac.in",
    course: "BCA",
    year: "1st Year",
    registeredAt: "2026-09-21T09:45:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  },
  {
    id: "REG-2025-004",
    registrationId: "REG-2025-004",
    eventId: "EVT-009",
    eventTitle: "TGI Inter-Department Cricket Tournament 2026",
    eventDate: "2026-11-08",
    eventVenue: "TGI Main Sports Ground",
    studentId: "TGI2025BCA768",
    studentName: "Aarav Sharma",
    studentEmail: "student@technox.tgi.ac.in",
    course: "BCA",
    year: "1st Year",
    registeredAt: "2026-09-22T10:00:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  },
  {
    id: "REG-2025-005",
    registrationId: "REG-2025-005",
    eventId: "EVT-001",
    eventTitle: "ANTARANG 2026 — Annual Cultural Fest (Celebrity Star Night)",
    eventDate: "2026-10-15",
    eventVenue: "Main Campus Grounds & Central Amphitheatre",
    studentId: "TGI2025BBA421",
    studentName: "Priya Mukherjee",
    studentEmail: "priya.m@technox.tgi.ac.in",
    course: "BBA",
    year: "1st Year",
    registeredAt: "2026-09-19T16:00:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  },
  {
    id: "REG-2025-006",
    registrationId: "REG-2025-006",
    eventId: "EVT-006",
    eventTitle: "Brand O Mania — Annual Business & Brand Quiz Championship",
    eventDate: "2026-10-22",
    eventVenue: "Smart Classroom Complex Block A",
    studentId: "TGI2024BCA315",
    studentName: "Rohan Gupta",
    studentEmail: "rohan.g@technox.tgi.ac.in",
    course: "BCA",
    year: "2nd Year",
    registeredAt: "2026-09-17T12:00:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  },
  {
    id: "REG-2025-007",
    registrationId: "REG-2025-007",
    eventId: "EVT-015",
    eventTitle: "Corporate Synergy — Mega Campus Placement Conclave 2026",
    eventDate: "2026-10-28",
    eventVenue: "Placement Cell Convention Center",
    studentId: "TGI2024BAJMC089",
    studentName: "Devendra Verma",
    studentEmail: "devendra.v@technox.tgi.ac.in",
    course: "BAJMC",
    year: "2nd Year",
    registeredAt: "2026-09-21T10:12:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  },
  {
    id: "REG-2025-008",
    registrationId: "REG-2025-008",
    eventId: "EVT-018",
    eventTitle: "Muskaan — Annual Campus Donation Drive 2026",
    eventDate: "2026-12-10",
    eventVenue: "Central Courtyard & Collection Desks",
    studentId: "TGI2025BCOM112",
    studentName: "Sneha Paul",
    studentEmail: "sneha.p@technox.tgi.ac.in",
    course: "B.Com",
    year: "1st Year",
    registeredAt: "2026-09-21T12:30:00",
    status: "REGISTERED",
    attendanceStatus: "PENDING",
    overrideType: null,
    overrideReason: null,
    overrideBy: null,
    passValidity: "VALID"
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "AUD-101",
    timestamp: "2026-09-22T14:15:30",
    user: "Prof. Ananya Banerjee",
    role: "FACULTY",
    action: "EVENT_VERIFIED",
    target: "EVT-005 (Vaktavya Debate)",
    reason: "Reviewed judging rubric and parliamentary debate adjudicators.",
    ipAddress: "192.168.10.45",
    status: "SUCCESS"
  },
  {
    id: "AUD-102",
    timestamp: "2026-09-21T16:40:12",
    user: "Dr. Rajeshwar Sen",
    role: "ADMIN",
    action: "EVENT_APPROVED",
    target: "EVT-001 (ANTARANG 2026)",
    reason: "Reviewed gate logistics, star DJ rider, and amphitheatre safety perimeter.",
    ipAddress: "192.168.1.10",
    status: "SUCCESS"
  },
  {
    id: "AUD-103",
    timestamp: "2026-09-20T11:22:05",
    user: "Prof. Meenakshi Iyer",
    role: "FACULTY",
    action: "COMMITTEE_ROSTER_UPDATED",
    target: "ABHIVYAKTI Cultural Committee",
    reason: "Approved 15 student co-leads for Antarang stage operations.",
    ipAddress: "192.168.10.48",
    status: "SUCCESS"
  },
  {
    id: "AUD-104",
    timestamp: "2026-09-19T17:05:00",
    user: "Vikramaditya Roy",
    role: "MANAGEMENT_COMMITTEE",
    action: "QR_GATE_CONFIGURED",
    target: "Main Campus Entrance Turnstiles",
    reason: "Configured sub-second QR scanners for ANTARANG 2026 fest entrance.",
    ipAddress: "192.168.12.88",
    status: "SUCCESS"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    userId: "USR-004",
    role: "STUDENT",
    title: "Registration Confirmed!",
    message: "Your registration for ANTARANG 2026 (Star DJ Rihya Night) is confirmed. Your digital gate pass is ready.",
    category: "REGISTRATION",
    type: "SUCCESS",
    read: false,
    timestamp: "2026-09-18T14:32:00",
    link: "/student/registrations"
  },
  {
    id: "NOTIF-002",
    userId: "USR-004",
    role: "STUDENT",
    title: "Debate Championship Schedule",
    message: "Vaktavya Debate rounds schedule is now live. Check your reporting slot at Sir J.C. Bose Hall.",
    category: "EVENT",
    type: "INFO",
    read: false,
    timestamp: "2026-09-21T09:45:00",
    link: "/student/events"
  },
  {
    id: "NOTIF-003",
    userId: "USR-004",
    role: "STUDENT",
    title: "Cricket League Team Selection",
    message: "OORJA Sports Committee has published the department team rosters for Inter-Department Cricket.",
    category: "EVENT",
    type: "WARNING",
    read: true,
    timestamp: "2026-09-22T10:00:00",
    link: "/student/events"
  },
  {
    id: "NOTIF-004",
    userId: "USR-002",
    role: "FACULTY",
    title: "New Committee Event Proposal",
    message: "Commercial Madness (The Ad Mad Show) submitted by KIRAN Committee awaiting approval.",
    category: "EVENT",
    type: "INFO",
    read: false,
    timestamp: "2026-09-23T11:00:00",
    link: "/faculty/approvals"
  },
  {
    id: "NOTIF-005",
    userId: "USR-001",
    role: "ADMIN",
    title: "System Audit Alert",
    message: "All 6 TIHS Committee Pillars and 21 official events successfully synchronized.",
    category: "SYSTEM",
    type: "SUCCESS",
    read: false,
    timestamp: "2026-09-20T11:22:05",
    link: "/admin/audit-logs"
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "ACH-001",
    studentId: "TGI2025BCA768",
    title: "Cultural Star",
    badgeIcon: "Music",
    color: "from-purple-500 to-pink-600",
    description: "Registered participant and performer at ANTARANG 2026 Annual Cultural Fest.",
    associatedEvent: "ANTARANG 2026",
    earnedDate: "2026-09-18"
  },
  {
    id: "ACH-002",
    studentId: "TGI2025BCA768",
    title: "Master Orator",
    badgeIcon: "Award",
    color: "from-amber-500 to-orange-600",
    description: "Active speaker in Vaktavya All India Inter-Collegiate Parliamentary Debate.",
    associatedEvent: "Vaktavya Debate 2026",
    earnedDate: "2026-09-21"
  },
  {
    id: "ACH-003",
    studentId: "TGI2025BCA768",
    title: "Sports Champion",
    badgeIcon: "Trophy",
    color: "from-emerald-500 to-teal-600",
    description: "Represented department in TGI Inter-Department Sports Tournament.",
    associatedEvent: "Cricket Tournament 2026",
    earnedDate: "2026-09-22"
  },
  {
    id: "ACH-004",
    studentId: "TGI2025BCA768",
    title: "Community Champion",
    badgeIcon: "Heart",
    color: "from-rose-500 to-red-600",
    description: "Active volunteer contributor for SRIJAN CSR Muskaan Donation Drive.",
    associatedEvent: "Muskaan Drive 2026",
    earnedDate: "2026-09-25"
  }
];

export const USERS = INITIAL_USERS;
export const STUDENTS = INITIAL_STUDENTS;
export const EVENTS = INITIAL_EVENTS;
export const REGISTRATIONS = INITIAL_REGISTRATIONS;
export const AUDIT_LOGS = INITIAL_AUDIT_LOGS;
export const NOTIFICATIONS = INITIAL_NOTIFICATIONS;
export const ACHIEVEMENTS = INITIAL_ACHIEVEMENTS;
export const COMMITTEES_LIST = COMMITTEES;
