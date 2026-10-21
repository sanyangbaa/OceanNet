import "dotenv/config";
import { getPool, generateId } from "../server/db";
import { getAllJobs, createJob, updateJob } from "../lib/careers";

async function seedCareers() {
  console.log("Seeding authentic careers for OceanNet Technologies...");
  const p = getPool();
  if (!p) {
    console.error("Database pool not available!");
    process.exit(1);
  }

  // Check existing jobs
  const existingJobs = await getAllJobs();
  console.log(`Found ${existingJobs.length} existing job(s) in DB.`);

  // Clean out outdated placeholder/test jobs if they have invalid data
  for (const ej of existingJobs) {
    if (
      ej.id === "iwv4cts11qq5ykilmso1" ||
      ej.title === "Senior Software Engineer" ||
      ej.title === "Test Career Title"
    ) {
      console.log(`Updating or replacing legacy job: ${ej.id} - ${ej.title}`);
      await p.execute(`DELETE FROM "Job" WHERE id = ?`, [ej.id]);
    }
  }

  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const careersToCreate = [
    {
      title: "Senior Full-Stack Software Engineer",
      jobType: "Full-time",
      description:
        "<p>OceanNet Technologies is seeking an exceptional Senior Full-Stack Software Engineer to lead the architecture, design, and deployment of mission-critical enterprise web platforms and distributed digital solutions. In this role, you will collaborate closely with public and private sector clients across The Gambia and West Africa, transforming complex operational requirements into resilient, high-performance systems.</p>",
      responsibilities: [
        "Architect, build, and maintain highly scalable web applications using Next.js, React, Node.js, and TypeScript",
        "Design secure, robust RESTful APIs and integrate enterprise relational databases (PostgreSQL, MySQL)",
        "Collaborate with cross-functional teams including UI/UX designers, systems architects, and project managers",
        "Enforce software engineering best practices, comprehensive code reviews, automated CI/CD, and unit/integration testing",
        "Mentor mid-level and junior software engineers, fostering technical excellence and continuous learning",
      ],
      qualifications: [
        "Bachelor's or Master's degree in Computer Science, Software Engineering, or related discipline",
        "5+ years of production experience in full-stack web application development",
        "Deep proficiency in modern TypeScript/JavaScript, React/Next.js, and backend Node.js frameworks",
        "Solid expertise in database schema design, query optimization, indexing, and data security",
        "Familiarity with containerization (Docker), cloud deployment (AWS/Supabase), and Git version control workflows",
        "Strong problem-solving skills, accountability, and clear communication in English",
      ],
      benefits: [
        "Competitive executive salary package aligned with West African tech leadership standards",
        "Comprehensive medical and health insurance coverage for employee and dependents",
        "Annual performance bonuses and project milestone incentives",
        "Sponsored professional certifications (AWS, GCP, Linux Foundation) and learning allowance",
        "Flexible hybrid working policy with modern office amenities at Jula Finance Complex, Kanifing",
        "Paid annual leave, sick leave, and parental leave",
      ],
      expiresAt: new Date(now + 90 * dayMs),
      archived: false,
    },
    {
      title: "Cloud Infrastructure & DevOps Engineer",
      jobType: "Full-time",
      description:
        "<p>We are seeking a proactive and skilled Cloud Infrastructure & DevOps Engineer to design, automate, and manage OceanNet's enterprise cloud platforms and client infrastructure. You will be instrumental in modernizing national digital systems, ensuring maximum uptime, enterprise security, and continuous delivery pipelines.</p>",
      responsibilities: [
        "Provision, configure, and manage high-availability cloud infrastructure on AWS, Azure, and hybrid on-premise environments",
        "Design and maintain automated CI/CD deployment pipelines using GitHub Actions and modern automation tools",
        "Implement comprehensive infrastructure monitoring, logging (Prometheus, Grafana), alerting, and disaster recovery procedures",
        "Strengthen system security postures through automated vulnerability scanning, IAM hardening, and SSL/TLS management",
        "Troubleshoot network, server, and application performance bottlenecks across Linux production environments",
      ],
      qualifications: [
        "Degree in Computer Science, Information Technology, Computer Engineering, or equivalent practical experience",
        "3+ years of dedicated experience in Cloud Engineering, DevOps, or Systems Administration",
        "Hands-on experience with Infrastructure as Code (Terraform) and container orchestration (Docker, Kubernetes)",
        "Strong Linux administration (Ubuntu, Debian, RHEL) and shell scripting proficiency (Bash, Python)",
        "Demonstrated understanding of enterprise networking protocols (DNS, VPN, BGP, Firewalls, Load Balancing)",
        "AWS Certified Solutions Architect or SysOps Administrator certification is an added advantage",
      ],
      benefits: [
        "Competitive compensation package with annual review",
        "Full medical insurance and healthcare benefits",
        "Continuous skills advancement budget and paid certification vouchers",
        "Modern engineering hardware setup (high-performance workstation and peripherals)",
        "Collaborative, merit-driven work culture with clear career progression paths",
      ],
      expiresAt: new Date(now + 75 * dayMs),
      archived: false,
    },
    {
      title: "Digital Health & CAPI Systems Analyst",
      jobType: "Full-time",
      description:
        "<p>OceanNet Technologies is looking for a Digital Health & CAPI Systems Analyst to oversee the technical implementation and field deployment of our public health surveillance platforms and large-scale mobile data collection operations (CAPI) across The Gambia.</p>",
      responsibilities: [
        "Configure, program, and maintain complex mobile survey instruments and digital health forms using SurveyCTO, ODK, and HoneyGuide",
        "Supervise field technical operations, device provisioning, encryption setup, and real-time data synchronization",
        "Perform rigorous data quality audits, automated logic checks, and high-frequency data validation routines",
        "Liaise with ministry counterparts, international development partners, and enumerator field supervisors",
        "Generate analytical reports, interactive KPI dashboards, and clean datasets for national stakeholders",
      ],
      qualifications: [
        "Bachelor's degree in Health Informatics, Information Systems, Statistics, Public Health, or related field",
        "3+ years of experience with mobile CAPI platforms (SurveyCTO, ODK, Tangerine, CommCare)",
        "Proficiency in data cleaning, transformation, and statistical analysis (SQL, Python/Pandas, or Stata/R)",
        "Experience working on national surveys, public health surveillance, or randomized controlled trials (RCTs)",
        "Excellent organizational skills and willingness to oversee field deployments when required",
      ],
      benefits: [
        "Attractive salary commensurate with technical and field management experience",
        "Health insurance coverage and field duty allowances",
        "Opportunities to work on nationally transformative public health and governance projects",
        "Structured mentorship and career advancement within our Digital Solutions division",
        "Generous leave entitlements and supportive team culture",
      ],
      expiresAt: new Date(now + 60 * dayMs),
      archived: false,
    },
    {
      title: "Cybersecurity & Network Systems Specialist",
      jobType: "Full-time",
      description:
        "<p>We are seeking a Cybersecurity & Network Systems Specialist to safeguard OceanNet's infrastructure and protect critical client network environments against emerging cyber threats. You will lead security audits, firewall implementations, zero-trust network configurations, and incident response operations.</p>",
      responsibilities: [
        "Design, deploy, and manage enterprise network security perimeters, next-generation firewalls (Fortinet, Cisco, pfSense), and secure VPN gateways",
        "Conduct proactive vulnerability assessments, penetration testing, and compliance audits for enterprise clients",
        "Monitor SIEM systems for security anomalies, unauthorized access attempts, and threat incidents",
        "Establish security policies, backup verification protocols, and incident response playbooks aligned with ISO 27001 / NIST guidelines",
        "Deliver cybersecurity awareness training to corporate and institutional clients",
      ],
      qualifications: [
        "Degree in Cybersecurity, Computer Networks, Information Technology, or relevant discipline",
        "4+ years of hands-on experience in network administration and cybersecurity operations",
        "Relevant industry certifications: CEH, CompTIA Security+, CCNA/CCNP Security, or CISSP",
        "Demonstrated expertise in network routing, VLAN segmentation, IDS/IPS, and endpoint protection systems",
        "Analytical mindset with exceptional attention to detail and rigorous ethics",
      ],
      benefits: [
        "Highly competitive remuneration package with cybersecurity hazard allowances",
        "Comprehensive medical and family health insurance coverage",
        "Full coverage for ongoing cybersecurity certifications (OffSec, SANS, CompTIA)",
        "Opportunity to design and protect mission-critical national infrastructure",
        "Flexible work arrangements and collaborative engineering environment",
      ],
      expiresAt: new Date(now + 80 * dayMs),
      archived: false,
    },
    {
      title: "Frontend / UI-UX Engineering Intern",
      jobType: "Internship",
      description:
        "<p>OceanNet Technologies invites passionate, budding web developers and UI/UX designers to join our Technology Internship Programme. You will receive hands-on mentorship, work on live enterprise client projects, and gain practical experience building modern web interfaces with React, Next.js, and Tailwind CSS.</p>",
      responsibilities: [
        "Translate Figma UI/UX design mockups into responsive, accessible, pixel-perfect web interfaces",
        "Collaborate with senior developers on building interactive frontend components and animations",
        "Assist in testing web applications across desktop and mobile devices for performance and cross-browser consistency",
        "Participate in sprint planning, agile standups, and technical learning sessions",
      ],
      qualifications: [
        "Recent graduate or final-year student in Computer Science, Software Engineering, IT, or self-taught developer with a demonstrable portfolio",
        "Foundational knowledge of HTML5, CSS3, modern JavaScript, and familiarity with React",
        "Familiarity with UI design principles and tools such as Figma",
        "Eagerness to learn, ask questions, and accept constructive feedback",
        "Basic knowledge of Git version control is a plus",
      ],
      benefits: [
        "Paid monthly internship stipend",
        "One-on-one mentorship from experienced senior software engineers",
        "Direct exposure to live enterprise-scale digital platforms",
        "Fast-track consideration for a full-time Associate Software Engineer position upon successful completion",
        "Complimentary refreshments, high-speed fiber internet, and collaborative learning culture",
      ],
      expiresAt: new Date(now + 45 * dayMs),
      archived: false,
    },
  ];

  for (const c of careersToCreate) {
    const created = await createJob(c);
    console.log(`Created career: "${created?.title}" (ID: ${created?.id})`);
  }

  const allJobsAfter = await getAllJobs();
  console.log(`Total jobs in DB now: ${allJobsAfter.length}`);

  const activeJobsAfter = await getAllJobs({ activeOnly: true });
  console.log(`Total active jobs visible on frontend: ${activeJobsAfter.length}`);

  process.exit(0);
}

seedCareers().catch((e) => {
  console.error("Seeding error:", e);
  process.exit(1);
});
