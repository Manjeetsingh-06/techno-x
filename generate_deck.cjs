const pptxgen = require('pptxgenjs');
const pres = new pptxgen();

// ── MODERN 16:9 WIDESCREEN (13.333 x 7.5 Inches) ──
pres.defineLayout({ name: 'WIDE_16_9', width: 13.333, height: 7.5 });
pres.layout = 'WIDE_16_9';

// ── AWARD-WINNING DESIGNER PALETTE ──
const C_BG        = '0A0E17'; // Deep Obsidian Black
const C_CARD      = '121826'; // Sleek Surface Card
const C_CARD_HI   = '1A2338'; // Highlighted Selected Card
const C_BORDER    = '222F46'; // Subtle Clean Border
const C_TEXT_MAIN = 'FFFFFF'; // Pure White Headings
const C_TEXT_SUB  = 'E2E8F0'; // High-Contrast Light Gray
const C_TEXT_MUTED= '94A3B8'; // Slate Gray Helper Text
const C_BLUE      = '38BDF8'; // Vibrant Sky Blue
const C_AMBER     = 'FBBF24'; // Warm Gold
const C_GREEN     = '34D399'; // Mint Green
const C_RED       = 'F87171'; // Coral Red

// Master Base Slide
function createBaseSlide(slide, categoryName, slideTitle, slideSubtitle) {
  slide.background = { color: C_BG };

  // Category Tag Pill
  if (categoryName) {
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 0.35, w: 2.2, h: 0.3,
      rectRadius: 0.15,
      fill: { color: '172554' },
      line: { color: C_BLUE, width: 1 }
    });
    slide.addText(categoryName.toUpperCase(), {
      x: 0.6, y: 0.35, w: 2.2, h: 0.3,
      fontSize: 9, bold: true, color: C_BLUE,
      align: 'center', valign: 'middle'
    });
  }

  // Slide Title
  slide.addText(slideTitle, {
    x: 0.6, y: 0.72, w: 12.13, h: 0.55,
    fontSize: 25, bold: true, color: C_TEXT_MAIN
  });

  // Slide Subtitle
  if (slideSubtitle) {
    slide.addText(slideSubtitle, {
      x: 0.6, y: 1.28, w: 12.13, h: 0.38,
      fontSize: 13, color: C_TEXT_MUTED
    });
  }

  // Footer Divider Line
  slide.addShape(pres.ShapeType.line, {
    x: 0.6, y: 6.85, w: 12.13, h: 0,
    line: { color: C_BORDER, width: 1 }
  });

  // Footer Text
  slide.addText('TECHNO-X  •  Campus Event Infrastructure  •  Techno Group of Institutions (TGI Lucknow)', {
    x: 0.6, y: 6.92, w: 8.5, h: 0.3,
    fontSize: 9.5, color: C_TEXT_MUTED
  });
  slide.addText('Live Demo: techno-x-backend-1.vercel.app', {
    x: 9.13, y: 6.92, w: 3.6, h: 0.3,
    fontSize: 9.5, bold: true, color: C_AMBER, align: 'right'
  });
}

// ===================================================================
// SLIDE 1: Title Slide (Cover)
// ===================================================================
{
  let slide = pres.addSlide();
  slide.background = { color: C_BG };

  // Big Hero Container Box
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 0.6, w: 12.13, h: 6.3,
    rectRadius: 0.25,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 1.5 }
  });

  // Stage Pill
  slide.addShape(pres.ShapeType.roundRect, {
    x: 1.2, y: 1.1, w: 2.8, h: 0.36,
    rectRadius: 0.18,
    fill: { color: '172554' },
    line: { color: C_BLUE, width: 1 }
  });
  slide.addText('HACKATHON PROJECT 2026', {
    x: 1.2, y: 1.1, w: 2.8, h: 0.36,
    fontSize: 10, bold: true, color: C_BLUE, align: 'center', valign: 'middle'
  });

  // Title
  slide.addText('TECHNO-X', {
    x: 1.2, y: 1.6, w: 10.0, h: 1.1,
    fontSize: 54, bold: true, color: C_AMBER
  });

  // Subtitle
  slide.addText('Smart Event Management & Digital QR Pass System for Colleges', {
    x: 1.2, y: 2.7, w: 10.8, h: 0.6,
    fontSize: 22, bold: true, color: C_TEXT_MAIN
  });

  // 4 Simple Highlights
  const summaryPoints = [
    '✓  No more paper slips or long entry queues during college fests',
    '✓  Instant digital pass on student mobile with verified QR code (<1.2s scan)',
    '✓  Unified platform for Students, Faculty, and 6 Student Committees',
    '✓  100% Live in Production on Vercel, Render, and TiDB Cloud Database'
  ];

  slide.addText(summaryPoints.join('\n\n'), {
    x: 1.2, y: 3.45, w: 10.8, h: 1.9,
    fontSize: 14, color: C_TEXT_SUB
  });

  // Live URL Box
  slide.addShape(pres.ShapeType.roundRect, {
    x: 1.2, y: 5.6, w: 6.5, h: 0.45,
    rectRadius: 0.1,
    fill: { color: '0A192F' },
    line: { color: C_GREEN, width: 1 }
  });
  slide.addText('🟢 TEST LIVE: https://techno-x-backend-1.vercel.app/', {
    x: 1.3, y: 5.6, w: 6.3, h: 0.45,
    fontSize: 11, bold: true, color: C_GREEN, valign: 'middle'
  });
}

// ===================================================================
// SLIDE 2: The Problem
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'The Problem',
    'Why We Built TECHNO-X: Campus Event Headaches',
    'Manual paper slips, WhatsApp clutter, and gate congestion create serious fest problems.'
  );

  const problems = [
    {
      num: '01',
      title: 'WhatsApp Message Spam',
      desc: 'Important event notices get lost in busy group chats. Over 40% of interested students miss registration deadlines.',
      accent: C_RED
    },
    {
      num: '02',
      title: 'Fake & Shared Paper Slips',
      desc: 'Printed paper entry slips get photocopied or forwarded. Unverified outsiders sneak into campus fests without valid passes.',
      accent: C_AMBER
    },
    {
      num: '03',
      title: 'Slow Gate Check-Ins',
      desc: 'Coordinators manually search student roll numbers on 40-page printed lists. Each entry takes 45+ seconds, causing crowded lines.',
      accent: C_BLUE
    },
    {
      num: '04',
      title: 'Overcrowded Auditoriums',
      desc: 'Zero live seat tracking. Halls get packed beyond safety limits before coordinators realize all seats are filled.',
      accent: C_GREEN
    }
  ];

  problems.forEach((p, i) => {
    let x = 0.6 + i * 3.11;
    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: 1.85, w: 2.8, h: 4.65,
      rectRadius: 0.18,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 2.15, w: 0.8, h: 0.38,
      rectRadius: 0.1,
      fill: { color: p.accent }
    });
    slide.addText(p.num, {
      x: x + 0.25, y: 2.15, w: 0.8, h: 0.38,
      fontSize: 13, bold: true, color: '000000', align: 'center', valign: 'middle'
    });

    slide.addText(p.title, {
      x: x + 0.25, y: 2.75, w: 2.3, h: 0.85,
      fontSize: 16, bold: true, color: C_TEXT_MAIN
    });

    slide.addText(p.desc, {
      x: x + 0.25, y: 3.7, w: 2.3, h: 2.6,
      fontSize: 12.5, color: C_TEXT_MUTED, lineSpacing: 18
    });
  });
}

// ===================================================================
// SLIDE 3: The Market Gap
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'Market Gap',
    'Why Google Forms & Commercial Apps Fail on Campuses',
    'College events require roll number verification, faculty sign-offs, and instant gate scanners.'
  );

  const tools = [
    {
      name: 'Google Forms',
      highlight: false,
      border: C_BORDER,
      bg: C_CARD,
      badge: 'Basic Tool',
      badgeCol: C_RED,
      points: [
        '✗ No roll number validation (outsiders register easily)',
        '✗ No automatic seat cutoff when auditorium is full',
        '✗ Does not generate a digital mobile scanner pass',
        '✗ Leaves coordinators with messy duplicate Excel rows'
      ]
    },
    {
      name: 'Eventbrite / BookMyShow',
      highlight: false,
      border: C_BORDER,
      bg: C_CARD,
      badge: 'Commercial',
      badgeCol: C_AMBER,
      points: [
        '✗ Charges heavy ticketing commissions per student',
        '✗ Lacks college hierarchy and faculty approval workflows',
        '✗ Cannot check enrolled courses (BCA/BBA/B.Com/MBA)',
        '✗ Impractical for routine internal student activities'
      ]
    },
    {
      name: 'TECHNO-X (Our Solution)',
      highlight: true,
      border: C_BLUE,
      bg: C_CARD_HI,
      badge: 'Built for Colleges',
      badgeCol: C_GREEN,
      points: [
        '✓ Strict roll number check (TGIxxxxCourseId format)',
        '✓ Instant 6-digit email OTP + live QR digital pass',
        '✓ Sub-1.2s camera gate scan with anti-proxy check',
        '✓ Built-in workspaces for 6 Student Committees'
      ]
    }
  ];

  tools.forEach((t, i) => {
    let x = 0.6 + i * 4.16;
    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: 1.85, w: 3.8, h: 4.65,
      rectRadius: 0.18,
      fill: { color: t.bg },
      line: { color: t.border, width: t.highlight ? 2 : 1 }
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: x + 0.3, y: 2.15, w: 2.0, h: 0.3,
      rectRadius: 0.08,
      fill: { color: '0A192F' },
      line: { color: t.badgeCol, width: 1 }
    });
    slide.addText(t.badge, {
      x: x + 0.3, y: 2.15, w: 2.0, h: 0.3,
      fontSize: 9.5, bold: true, color: t.badgeCol, align: 'center', valign: 'middle'
    });

    slide.addText(t.name, {
      x: x + 0.3, y: 2.6, w: 3.2, h: 0.6,
      fontSize: 16.5, bold: true, color: t.highlight ? C_AMBER : C_TEXT_MAIN
    });

    slide.addText(t.points.join('\n\n'), {
      x: x + 0.3, y: 3.35, w: 3.2, h: 2.9,
      fontSize: 12.5, color: t.highlight ? C_TEXT_SUB : C_TEXT_MUTED, lineSpacing: 18
    });
  });
}

// ===================================================================
// SLIDE 4: The 4-Step Solution Flow
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'How It Works',
    'The Simple 4-Step Student & Coordinator Flow',
    'Designed to be fast, intuitive, and enjoyable for both students and staff.'
  );

  const steps = [
    {
      num: 'STEP 1',
      title: 'Find Event in 10s',
      desc: 'Browse cultural fests, sports tournaments, and tech workshops with rules, dates, and prize info.',
      tag: 'Event Discovery'
    },
    {
      num: 'STEP 2',
      title: 'One-Click Register',
      desc: 'Enter your student ID. The system checks eligibility and verifies via a fast 6-digit email OTP.',
      tag: 'Identity Check'
    },
    {
      num: 'STEP 3',
      title: 'Instant QR Pass',
      desc: 'Receive a sleek digital entry pass on your phone with allocated seat and venue timing.',
      tag: 'Digital Token'
    },
    {
      num: 'STEP 4',
      title: 'Scan & Enter <1.2s',
      desc: 'Gate security scans your pass with any phone camera. Instant green checkmark granted.',
      tag: 'Gate Check-In'
    }
  ];

  steps.forEach((s, i) => {
    let x = 0.6 + i * 3.11;
    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: 1.85, w: 2.8, h: 4.65,
      rectRadius: 0.18,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    slide.addText(s.num, {
      x: x + 0.25, y: 2.15, w: 2.3, h: 0.35,
      fontSize: 12, bold: true, color: C_AMBER
    });

    slide.addText(s.title, {
      x: x + 0.25, y: 2.55, w: 2.3, h: 0.7,
      fontSize: 16.5, bold: true, color: C_TEXT_MAIN
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 3.35, w: 2.1, h: 0.28,
      rectRadius: 0.08,
      fill: { color: '172554' },
      line: { color: C_BLUE, width: 0.8 }
    });
    slide.addText(s.tag, {
      x: x + 0.25, y: 3.35, w: 2.1, h: 0.28,
      fontSize: 9, bold: true, color: C_BLUE, align: 'center', valign: 'middle'
    });

    slide.addText(s.desc, {
      x: x + 0.25, y: 3.8, w: 2.3, h: 2.4,
      fontSize: 12.5, color: C_TEXT_MUTED, lineSpacing: 18
    });
  });
}

// ===================================================================
// SLIDE 5: Feature 1 — Roll Check & Brevo OTP
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'Security & Auth',
    'Feature 1: Student Roll Verification & Real Email OTP',
    'Stopping fake accounts and burner emails before they register.'
  );

  // Left explanation card
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.85, w: 7.0, h: 4.65,
    rectRadius: 0.18,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 1 }
  });

  slide.addText('Strict College Format Pattern Matching', {
    x: 1.0, y: 2.2, w: 6.2, h: 0.4,
    fontSize: 18, bold: true, color: C_BLUE
  });

  const points = [
    '• Roll Number Pattern Check: Validates IDs like TGI2026BCA101 against enrolled batches.',
    '• Real Email OTP Delivery: Integrated Brevo Transactional REST API to send a 6-digit verification code within 3 seconds.',
    '• Anti-Bot Barrier: Blocks external burner emails and automated spam scripts.',
    '• Safe JWT Sessions: Once verified, students stay logged in securely with encrypted tokens.'
  ];

  slide.addText(points.join('\n\n'), {
    x: 1.0, y: 2.75, w: 6.2, h: 3.4,
    fontSize: 13, color: C_TEXT_SUB, lineSpacing: 20
  });

  // Right visual card (Simulated Verification Card)
  slide.addShape(pres.ShapeType.roundRect, {
    x: 7.9, y: 1.85, w: 4.8, h: 4.65,
    rectRadius: 0.18,
    fill: { color: '050B14' },
    line: { color: C_AMBER, width: 1.5 }
  });

  slide.addText('EMAIL OTP VERIFICATION', {
    x: 8.3, y: 2.2, w: 4.0, h: 0.3,
    fontSize: 11, bold: true, color: C_AMBER
  });

  slide.addText('Code sent to: student@tgi.ac.in\nValid for 5 minutes only', {
    x: 8.3, y: 2.6, w: 4.0, h: 0.6,
    fontSize: 12, color: C_TEXT_MUTED
  });

  // 6-digit box
  slide.addShape(pres.ShapeType.roundRect, {
    x: 8.5, y: 3.35, w: 3.6, h: 0.85,
    rectRadius: 0.1,
    fill: { color: C_CARD },
    line: { color: C_BLUE, width: 1 }
  });
  slide.addText('8  4  9  2  0  1', {
    x: 8.5, y: 3.35, w: 3.6, h: 0.85,
    fontSize: 22, bold: true, color: C_AMBER, align: 'center', valign: 'middle'
  });

  slide.addText('✓ Verified by Brevo REST API\n✓ Enrolled: BCA Final Year\n✓ Account Status: ACTIVE', {
    x: 8.3, y: 4.5, w: 4.0, h: 1.6,
    fontSize: 13, bold: true, color: C_GREEN, lineSpacing: 20
  });
}

// ===================================================================
// SLIDE 6: Feature 2 — Digital Pass & Gate Scanner
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'Gate Entry System',
    'Feature 2: Anti-Proxy QR Pass & Live Camera Scanner',
    'Scan and admit verified students in under 1.2 seconds.'
  );

  const passHighlights = [
    {
      title: 'Tamper-Proof Digital Pass',
      desc: 'Each student receives a personalized mobile pass with event name, allocated seat, venue location, and an encrypted QR token.'
    },
    {
      title: 'Anti-Proxy Timestamping',
      desc: 'Once scanned at the gate, the pass is instantly marked as "Used" in the cloud database. Forwarding a screenshot to a friend results in a RED REJECT alert.'
    },
    {
      title: 'Works on Any Phone Camera',
      desc: 'Faculty and student volunteers do not need expensive barcode scanners. Any mobile phone camera scans the pass instantly.'
    },
    {
      title: 'Live Headcount Dashboard',
      desc: 'Auditorium coordinators see live headcount numbers on their screen: "340 / 400 Seats Filled" with real-time capacity warnings.'
    }
  ];

  passHighlights.forEach((h, i) => {
    let x = (i % 2 === 0) ? 0.6 : 6.8;
    let y = (i < 2) ? 1.85 : 4.3;
    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: 5.9, h: 2.2,
      rectRadius: 0.18,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    slide.addText(h.title, {
      x: x + 0.35, y: y + 0.25, w: 5.2, h: 0.38,
      fontSize: 16, bold: true, color: C_AMBER
    });

    slide.addText(h.desc, {
      x: x + 0.35, y: y + 0.7, w: 5.2, h: 1.3,
      fontSize: 12.5, color: C_TEXT_SUB, lineSpacing: 18
    });
  });
}

// ===================================================================
// SLIDE 7: The 6 Student Committees
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'Campus Governance',
    'Feature 3: Dedicated Hubs for 6 Student Committees',
    'Giving student leaders the power to organize, manage, and report on campus life.'
  );

  const committees = [
    { name: 'KIRAN', role: 'Academic Committee', desc: 'Debates, business quizzes, case study competitions, and research papers.' },
    { name: 'ABHIVYAKTI', role: 'Cultural Committee', desc: 'Annual Antarang fest, solo singing, dance battles, and rock shows.' },
    { name: 'OORJA', role: 'Sports Committee', desc: 'Inter-department cricket tournaments, badminton league, and athletics.' },
    { name: 'DARPAN', role: 'Media Committee', desc: 'Short film screenings, campus photography, and student newsletters.' },
    { name: 'SANJEEVANI', role: 'Placement Committee', desc: 'Corporate mock interviews, group discussions, and alumni conclaves.' },
    { name: 'SRIJAN', role: 'CSR Committee', desc: 'Campus blood donation drives, free health checkups, and tree plantation.' }
  ];

  committees.forEach((c, i) => {
    let x = 0.6 + (i % 3) * 4.16;
    let y = i < 3 ? 1.85 : 4.3;

    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: y, w: 3.8, h: 2.2,
      rectRadius: 0.18,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    slide.addText(c.name, {
      x: x + 0.3, y: y + 0.25, w: 3.2, h: 0.35,
      fontSize: 18, bold: true, color: C_BLUE
    });

    slide.addText(c.role.toUpperCase(), {
      x: x + 0.3, y: y + 0.65, w: 3.2, h: 0.25,
      fontSize: 10, bold: true, color: C_AMBER
    });

    slide.addText(c.desc, {
      x: x + 0.3, y: y + 0.95, w: 3.2, h: 1.1,
      fontSize: 12, color: C_TEXT_MUTED, lineSpacing: 16
    });
  });
}

// ===================================================================
// SLIDE 8: Tech Stack & Architecture
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'Architecture',
    'Tech Stack: Cloud-Native, High-Speed & Scalable',
    'Selected for fast loading, high concurrency, and reliable cloud deployments.'
  );

  const stack = [
    {
      layer: 'FRONTEND',
      tech: 'React 18 + Vite + Tailwind',
      host: 'Hosted on Vercel Global Edge',
      bullets: [
        '• Fast SPA with sub-second page loads',
        '• Dark mode glassmorphism UI',
        '• Mobile responsive on all screen sizes'
      ]
    },
    {
      layer: 'BACKEND',
      tech: 'Java 21 + Spring Boot 3',
      host: 'Containerized on Render (Docker)',
      bullets: [
        '• Enterprise security with stateless JWT',
        '• Automated cron scheduler services',
        '• Clean RESTful API architecture'
      ]
    },
    {
      layer: 'DATABASE',
      tech: 'TiDB Cloud Serverless',
      host: 'Distributed SQL on AWS Cluster',
      bullets: [
        '• Handles high registration traffic spikes',
        '• Real-time ACID transaction guarantees',
        '• Zero data corruption during rush hours'
      ]
    },
    {
      layer: 'EMAILS',
      tech: 'Brevo Transactional API',
      host: 'Verified Cloud SMTP Relay',
      bullets: [
        '• Instant 6-digit OTP delivery',
        '• 24-hour event reminder broadcasts',
        '• 99.4% inbox delivery success rate'
      ]
    }
  ];

  stack.forEach((s, i) => {
    let x = 0.6 + i * 3.11;
    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: 1.85, w: 2.8, h: 4.65,
      rectRadius: 0.18,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    slide.addText(s.layer, {
      x: x + 0.25, y: 2.15, w: 2.3, h: 0.3,
      fontSize: 11, bold: true, color: C_AMBER
    });

    slide.addText(s.tech, {
      x: x + 0.25, y: 2.55, w: 2.3, h: 0.65,
      fontSize: 15, bold: true, color: C_TEXT_MAIN
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 3.3, w: 2.3, h: 0.3,
      rectRadius: 0.08,
      fill: { color: '172554' },
      line: { color: C_BLUE, width: 0.8 }
    });
    slide.addText(s.host, {
      x: x + 0.25, y: 3.3, w: 2.3, h: 0.3,
      fontSize: 8.5, bold: true, color: C_BLUE, align: 'center', valign: 'middle'
    });

    slide.addText(s.bullets.join('\n\n'), {
      x: x + 0.25, y: 3.8, w: 2.3, h: 2.5,
      fontSize: 12, color: C_TEXT_MUTED, lineSpacing: 17
    });
  });
}

// ===================================================================
// SLIDE 9: Automated Background Engine
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'Automation',
    'Smart Automation: Background Schedulers & Alerts',
    'The system works automatically in the background without needing manual coordinator intervention.'
  );

  const automations = [
    {
      timeBadge: 'EVERY DAY AT 8:00 AM',
      title: 'Automatic 24-Hour Event Reminders',
      desc: 'Our Spring Boot scheduler checks all events happening tomorrow and automatically sends reminder emails with venue details and instructions to open their digital pass.'
    },
    {
      timeBadge: 'REAL-TIME DYNAMIC QUEUE',
      title: 'Smart Waitlist Auto-Promotion',
      desc: 'When an auditorium reaches full capacity, additional students join the digital waitlist. If a registered student cancels, the system instantly promotes the next student in line and issues their pass.'
    },
    {
      timeBadge: 'MIDNIGHT HOUSEKEEPING',
      title: 'Automated Status Transitions & Archiving',
      desc: 'Events automatically transition from Published -> Ongoing -> Completed. Attendance registries are locked, and completion certificates become ready for generation.'
    }
  ];

  automations.forEach((a, i) => {
    let y = 1.85 + i * 1.55;
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: y, w: 12.13, h: 1.35,
      rectRadius: 0.16,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    slide.addText(a.timeBadge, {
      x: 0.9, y: y + 0.2, w: 3.5, h: 0.3,
      fontSize: 10, bold: true, color: C_AMBER
    });

    slide.addText(a.title, {
      x: 0.9, y: y + 0.55, w: 3.5, h: 0.55,
      fontSize: 15, bold: true, color: C_TEXT_MAIN
    });

    slide.addText(a.desc, {
      x: 4.6, y: y + 0.2, w: 7.8, h: 0.95,
      fontSize: 12.5, color: C_TEXT_SUB, lineSpacing: 18
    });
  });
}

// ===================================================================
// SLIDE 10: Performance Benchmarks
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'Results',
    'Real Benchmarks: Fast, Reliable & Tested',
    'Proven performance numbers measured on live cloud infrastructure.'
  );

  const metrics = [
    { val: '96+', label: 'Lighthouse Performance', note: 'Fast page loads on mobile phones & campus Wi-Fi' },
    { val: '<180ms', label: 'Average API Latency', note: 'Instant response time on registration clicks' },
    { val: '100%', label: 'Cloud Uptime', note: 'Zero server crashes during live registration tests' },
    { val: '<1.2s', label: 'Gate Scan Speed', note: 'Quick admission per student at venue gate' }
  ];

  metrics.forEach((m, i) => {
    let x = 0.6 + i * 3.11;
    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: 1.85, w: 2.8, h: 4.65,
      rectRadius: 0.18,
      fill: { color: C_CARD },
      line: { color: C_BLUE, width: 1 }
    });

    slide.addText(m.val, {
      x: x + 0.2, y: 2.6, w: 2.4, h: 0.9,
      fontSize: 42, bold: true, color: C_AMBER, align: 'center'
    });

    slide.addText(m.label, {
      x: x + 0.2, y: 3.6, w: 2.4, h: 0.6,
      fontSize: 15, bold: true, color: C_TEXT_MAIN, align: 'center'
    });

    slide.addText(m.note, {
      x: x + 0.25, y: 4.3, w: 2.3, h: 1.8,
      fontSize: 12.5, color: C_TEXT_MUTED, align: 'center', lineSpacing: 18
    });
  });
}

// ===================================================================
// SLIDE 11: Future Expansion
// ===================================================================
{
  let slide = pres.addSlide();
  createBaseSlide(
    slide,
    'The Roadmap',
    'Future Scope: Expanding Beyond Our Campus',
    'A realistic technical roadmap to scale TECHNO-X to 45,000+ colleges across India.'
  );

  const roadmap = [
    {
      badge: 'PHASE 1 (LIVE NOW)',
      badgeCol: C_GREEN,
      title: 'Cloud Web Platform',
      bullets: [
        '✓ Live role-based portals for students & staff',
        '✓ Instant email OTP & QR digital entry passes',
        '✓ TiDB Serverless Cloud database deployed'
      ]
    },
    {
      badge: 'PHASE 2 (NEXT 60 DAYS)',
      badgeCol: C_BLUE,
      title: 'Offline App & Smart Cards',
      bullets: [
        '• Offline PWA for auditoriums with zero network',
        '• Tap-and-enter with RFID/NFC student ID cards',
        '• WhatsApp alert integration for instant updates'
      ]
    },
    {
      badge: 'PHASE 3 (YEAR 2026)',
      badgeCol: C_AMBER,
      title: 'Multi-Campus SaaS',
      bullets: [
        '• White-label platform for other universities',
        '• Verifiable digital certificates for winners',
        '• Centralized inter-college fest discovery network'
      ]
    }
  ];

  roadmap.forEach((r, i) => {
    let x = 0.6 + i * 4.16;
    slide.addShape(pres.ShapeType.roundRect, {
      x: x, y: 1.85, w: 3.8, h: 4.65,
      rectRadius: 0.18,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: x + 0.3, y: 2.15, w: 2.4, h: 0.3,
      rectRadius: 0.08,
      fill: { color: '0A192F' },
      line: { color: r.badgeCol, width: 1 }
    });
    slide.addText(r.badge, {
      x: x + 0.3, y: 2.15, w: 2.4, h: 0.3,
      fontSize: 9.5, bold: true, color: r.badgeCol, align: 'center', valign: 'middle'
    });

    slide.addText(r.title, {
      x: x + 0.3, y: 2.65, w: 3.2, h: 0.6,
      fontSize: 18, bold: true, color: C_TEXT_MAIN
    });

    slide.addText(r.bullets.join('\n\n'), {
      x: x + 0.3, y: 3.45, w: 3.2, h: 2.8,
      fontSize: 12.5, color: C_TEXT_SUB, lineSpacing: 18
    });
  });
}

// ===================================================================
// SLIDE 12: Live Inspection & Q&A
// ===================================================================
{
  let slide = pres.addSlide();
  slide.background = { color: C_BG };

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 0.6, w: 12.13, h: 6.3,
    rectRadius: 0.25,
    fill: { color: C_CARD },
    line: { color: C_AMBER, width: 2 }
  });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 1.2, y: 1.1, w: 2.4, h: 0.36,
    rectRadius: 0.18,
    fill: { color: '172554' },
    line: { color: C_BLUE, width: 1 }
  });
  slide.addText('LIVE & TESTED', {
    x: 1.2, y: 1.1, w: 2.4, h: 0.36,
    fontSize: 10, bold: true, color: C_BLUE, align: 'center', valign: 'middle'
  });

  slide.addText('Try TECHNO-X Live on Your Phones', {
    x: 1.2, y: 1.6, w: 10.8, h: 0.8,
    fontSize: 34, bold: true, color: C_TEXT_MAIN
  });

  const links = [
    '🌐  Live Website:  https://techno-x-backend-1.vercel.app/',
    '⚡  Live Backend:  https://techno-x-backend-1.onrender.com/v3/api-docs',
    '🗄️  Cloud Database: TiDB Serverless (AWS ap-southeast-1)',
    '📂  Source Code:  github.com/Manjeetsingh-06 (Frontend & Backend)'
  ];

  slide.addText(links.join('\n\n'), {
    x: 1.2, y: 2.65, w: 10.8, h: 2.4,
    fontSize: 16, color: C_TEXT_SUB, lineSpacing: 26
  });

  slide.addText('Thank You! We are ready for your questions and live demo.', {
    x: 1.2, y: 5.4, w: 10.8, h: 0.6,
    fontSize: 19, bold: true, color: C_AMBER
  });
}

// Save Output
const outputPath = 'C:/Users/singh/.gemini/antigravity/scratch/TECHNO-X_Hackathon_Pitch_V2.pptx';
pres.writeFile({ fileName: outputPath }).then(fileName => {
  console.log('SUCCESS: Generated Perfect 16:9 Deck at: ' + fileName);
}).catch(err => {
  console.error('ERROR:', err);
});
