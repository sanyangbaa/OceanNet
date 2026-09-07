export interface Service {
  id: string;
  title: string;
  description: string;
  slug?: string;
  icon: string;
  features?: string[];
  detailText?: string;
  challenges?: string[];
  solutions?: Array<{ title: string; description: string }>;
  benefits?: string[];
  technologies?: string[];
  industriesServed?: string[];
  typicalDeliverables?: string[];
  tools?: string[];
  order?: number;
  showOnHomepage?: boolean;
  category?:
    | "Core Digital Capabilities"
    | "Infrastructure & Platforms"
    | "Specialised & Managed Services";
}

export const services: Service[] = [
  // ─── CORE DIGITAL CAPABILITIES ───────────────────────────────────────────
  {
    id: "digital-solutions",
    title: "Digital Solutions",
    category: "Core Digital Capabilities",
    showOnHomepage: true,
    slug: "digital-solutions",
    description:
      "Custom digital platforms and applications designed around organisational processes, users and service-delivery objectives.",
    detailText: `Digital platforms designed around the way your organisation actually works.

OceanNet Technologies helps organisations transform manual and fragmented processes into modern digital solutions that improve productivity, transparency, collaboration and decision-making.

Our digital solutions are designed around business objectives, ensuring that technology delivers measurable value and sustainable impact.`,
    icon: "Code2",
    challenges: [
      "Manual and fragmented processes",
      "Disconnected information and workflows",
      "Limited visibility into operations",
      "Legacy tools that no longer meet service needs",
    ],
    solutions: [
      {
        title: "Custom Web and Business Applications",
        description:
          "Tailored applications built around your specific operational requirements and user journeys.",
      },
      {
        title: "Workflow Digitisation and Automation",
        description:
          "Converting manual, paper-heavy processes into efficient digital workflows.",
      },
      {
        title: "Digital Service Portals",
        description:
          "Online platforms that improve how services are delivered to staff, citizens and stakeholders.",
      },
      {
        title: "Database-Backed Operational Systems",
        description:
          "Structured data platforms that give visibility and control over core operations.",
      },
      {
        title: "Mobile and Field-Data Solutions",
        description:
          "Extending digital capability to field teams and mobile users.",
      },
      {
        title: "Application Modernisation",
        description:
          "Replacing or upgrading legacy systems to modern, maintainable platforms.",
      },
    ],
    benefits: [
      "Improved service delivery",
      "Reduced manual work",
      "Better data visibility",
      "Scalable systems designed for future integration",
    ],
    industriesServed: [
      "Government",
      "Development programmes",
      "Healthcare",
      "Private enterprise",
    ],
    order: 1,
  },
  {
    id: "systems-integration",
    title: "Systems Integration",
    category: "Core Digital Capabilities",
    showOnHomepage: true,
    slug: "systems-integration",
    description:
      "Connect applications, data and platforms into one dependable digital environment.",
    detailText: `Connect applications, data and platforms into one dependable digital environment.

Many organisations operate multiple systems that do not communicate effectively with one another, resulting in duplicate data entry, inconsistent information, inefficiencies and limited visibility.

OceanNet Technologies helps organisations connect systems, automate information exchange and create integrated environments that support informed decision-making and efficient operations.`,
    icon: "Building2",
    challenges: [
      "Disconnected applications and duplicated data",
      "Manual data transfer",
      "Legacy systems with limited interoperability",
      "Cloud and on-premise systems operating in silos",
    ],
    solutions: [
      {
        title: "REST API Integration",
        description:
          "Designing and implementing secure, standards-based API connections between systems.",
      },
      {
        title: "Database and Data Integration",
        description:
          "Synchronising and consolidating information across multiple data sources.",
      },
      {
        title: "Cloud/On-Premise Integration",
        description:
          "Connecting cloud services with existing on-premise infrastructure and applications.",
      },
      {
        title: "Identity and Access Integration",
        description:
          "Centralising authentication and access control across connected systems.",
      },
      {
        title: "Legacy System Integration",
        description:
          "Extending and connecting older systems without full replacement.",
      },
      {
        title: "Integration Architecture and Technical Advisory",
        description:
          "Designing integration strategies and roadmaps aligned with business objectives.",
      },
    ],
    benefits: [
      "Consistent data across systems",
      "Fewer manual handoffs",
      "Improved automation",
      "Stronger operational visibility",
    ],
    industriesServed: [
      "Government",
      "Healthcare",
      "Enterprise",
      "Development programmes",
    ],
    order: 2,
  },
  {
    id: "digital-health",
    title: "Digital Health Solutions",
    category: "Core Digital Capabilities",
    showOnHomepage: true,
    slug: "digital-health-solutions",
    description:
      "Digital health platforms that strengthen surveillance, information flow and public-health operations.",
    detailText: `Digital health platforms that strengthen surveillance, information flow and public-health operations.

Digital health technologies play a critical role in improving healthcare delivery, disease surveillance, public health response, supply chain management and health information management.

OceanNet Technologies supports governments, healthcare institutions and development organisations in implementing digital health solutions that improve efficiency, transparency and impact.`,
    icon: "Shield",
    challenges: [
      "Fragmented health information",
      "Manual surveillance workflows",
      "Limited interoperability",
      "Weak technical capacity for platform administration",
    ],
    solutions: [
      {
        title: "Disease Surveillance and Outbreak-Response Platforms",
        description:
          "Implementation and support of platforms such as SORMAS for national disease monitoring and response.",
      },
      {
        title: "Health Information Systems",
        description:
          "Deployment and integration of health information platforms including DHIS2 and related tools.",
      },
      {
        title: "Health Supply-Chain Solutions",
        description:
          "Supporting efficient management of health commodities and medicines.",
      },
      {
        title: "Interoperability and API Integration",
        description:
          "Connecting health information systems and enabling data exchange across platforms.",
      },
      {
        title: "Deployment and Infrastructure Support",
        description:
          "Server configuration, hosting, network and infrastructure support for health platforms.",
      },
      {
        title: "Training, System Administration and Operational Support",
        description:
          "Building local capacity through training, mentoring and ongoing technical support.",
      },
    ],
    benefits: [
      "Faster information flow",
      "Improved surveillance and response",
      "Better data quality",
      "Sustainable local administration",
    ],
    technologies: ["SORMAS", "DHIS2", "OpenLMIS", "GIS Platforms", "PostgreSQL"],
    industriesServed: [
      "Ministries of Health",
      "Public-health programmes",
      "Health facilities",
      "Development partners",
    ],
    order: 3,
  },
  {
    id: "enterprise-software",
    title: "Enterprise Software Solutions",
    category: "Core Digital Capabilities",
    showOnHomepage: true,
    slug: "enterprise-software-solutions",
    description:
      "Enterprise applications that improve workflows, collaboration and operational control.",
    detailText: `Enterprise applications that improve workflows, collaboration and operational control.

Enterprise software solutions provide organisations with the tools needed to manage operations, streamline workflows, improve collaboration and support strategic growth.

OceanNet Technologies works with organisations to implement solutions that align technology investments with business objectives, ensuring sustainable outcomes.`,
    icon: "Laptop",
    challenges: [
      "Manual approvals and paper-heavy processes",
      "Disconnected departmental tools",
      "Limited reporting",
      "Legacy systems that constrain growth",
    ],
    solutions: [
      {
        title: "ERP and Business Systems",
        description:
          "Integrated platforms for managing core business operations across departments.",
      },
      {
        title: "HRMIS",
        description:
          "Modern human resource and workforce management solutions.",
      },
      {
        title: "Document and Records Management",
        description:
          "Secure storage, retrieval and lifecycle management of organisational documents.",
      },
      {
        title: "Workflow Automation",
        description:
          "Digitising and automating approval processes and operational workflows.",
      },
      {
        title: "Collaboration Platforms",
        description:
          "Improving communication, teamwork and information sharing across teams.",
      },
      {
        title: "Reporting and Analytics",
        description:
          "Delivering actionable management information and performance insights.",
      },
      {
        title: "Custom Enterprise Applications",
        description:
          "Bespoke applications built around specific organisational requirements.",
      },
      {
        title: "Legacy System Modernisation",
        description:
          "Upgrading and replacing systems that constrain operational growth.",
      },
    ],
    benefits: [
      "Standardised processes",
      "Improved productivity",
      "Better management information",
      "Secure and scalable operations",
    ],
    industriesServed: [
      "Government",
      "Enterprise",
      "NGOs",
      "Project implementation units",
    ],
    order: 4,
  },

  // ─── INFRASTRUCTURE & PLATFORMS ──────────────────────────────────────────
  {
    id: "networking",
    title: "Networking Solutions",
    category: "Infrastructure & Platforms",
    showOnHomepage: true,
    slug: "networking-solutions",
    description:
      "Secure and resilient connectivity for offices, campuses and distributed operations.",
    detailText: `Secure and resilient connectivity for offices, campuses and distributed operations.

A reliable network is the foundation of every modern organisation. From internet connectivity and wireless access to enterprise-wide communication and cloud services, network performance directly impacts productivity and operations.

OceanNet Technologies designs and deploys secure, scalable and resilient networking solutions that support current needs while preparing organisations for future growth.`,
    icon: "BarChart3",
    challenges: [
      "Unreliable connectivity",
      "Poor wireless coverage",
      "Unstructured or ageing networks",
      "Limited network visibility and security",
    ],
    solutions: [
      {
        title: "LAN/WAN Design",
        description:
          "Designing structured, scalable local and wide-area network architectures.",
      },
      {
        title: "Structured Cabling",
        description:
          "Professional cabling installation and infrastructure for reliable physical connectivity.",
      },
      {
        title: "Enterprise Wi-Fi",
        description:
          "Deployment of enterprise-grade wireless access with consistent coverage.",
      },
      {
        title: "Routing, Switching and Firewall Integration",
        description:
          "Configuring core network components for performance, security and control.",
      },
      {
        title: "Site-to-Site Connectivity and VPN",
        description:
          "Connecting offices, branches and remote locations securely.",
      },
      {
        title: "Network Assessment and Optimisation",
        description:
          "Evaluating existing networks and improving performance, security and reliability.",
      },
    ],
    benefits: [
      "Reliable connectivity",
      "Improved performance",
      "Better security",
      "Simpler support and expansion",
    ],
    technologies: [
      "Cisco",
      "Ubiquiti UniFi",
      "MikroTik",
      "Fortinet",
      "Enterprise Switching Platforms",
      "VPN Technologies",
    ],
    industriesServed: [
      "Offices",
      "Government facilities",
      "Healthcare",
      "Education",
      "Enterprise",
    ],
    order: 5,
  },
  {
    id: "ict-infrastructure",
    title: "ICT Infrastructure",
    category: "Infrastructure & Platforms",
    slug: "ict-infrastructure-solutions",
    description:
      "Reliable infrastructure for the systems your organisation depends on.",
    detailText: `Reliable infrastructure for the systems your organisation depends on.

Technology infrastructure serves as the backbone of every digital organisation. OceanNet Technologies helps organisations build resilient, secure and scalable ICT environments that support critical business systems and future growth.

Whether deploying new infrastructure or modernising existing environments, we deliver solutions aligned with business objectives and industry best practices.`,
    icon: "Building2",
    challenges: [
      "Ageing equipment",
      "Inadequate compute/storage capacity",
      "Weak backup and power protection",
      "Poorly planned server and end-user environments",
    ],
    solutions: [
      {
        title: "Server and Storage Infrastructure",
        description:
          "Deployment and management of enterprise server and storage environments.",
      },
      {
        title: "End-User Computing",
        description:
          "Sourcing, deployment and support of workstations, laptops and peripherals.",
      },
      {
        title: "Data-Centre and Server-Room Solutions",
        description:
          "Design and implementation of structured server and data-centre environments.",
      },
      {
        title: "Backup and NAS Solutions",
        description:
          "Protecting critical organisational data with reliable backup and network-attached storage.",
      },
      {
        title: "UPS and Power Protection",
        description:
          "Ensuring system availability through uninterruptible power supply and power conditioning.",
      },
      {
        title: "Infrastructure Assessment and Deployment",
        description:
          "Evaluating existing environments and planning structured deployment programmes.",
      },
    ],
    benefits: [
      "Higher availability",
      "Improved resilience",
      "Scalable capacity",
      "Better lifecycle management",
    ],
    technologies: [
      "Windows Server",
      "Linux Platforms",
      "VMware",
      "Hyper-V",
      "Veeam Backup",
      "UPS Solutions",
    ],
    industriesServed: [
      "Government",
      "Enterprise",
      "Healthcare",
      "Development projects",
    ],
    order: 6,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Solutions",
    category: "Infrastructure & Platforms",
    showOnHomepage: true,
    slug: "cybersecurity-solutions",
    description:
      "Security-focused technology and practices that reduce operational risk.",
    detailText: `Security-focused technology and practices that reduce operational risk.

As organisations become increasingly dependent on digital technologies, cybersecurity risks continue to grow. OceanNet Technologies provides practical cybersecurity solutions that help organisations strengthen security posture, manage risks and improve resilience against evolving threats.`,
    icon: "Shield",
    challenges: [
      "Weak identity controls",
      "Unprotected endpoints and networks",
      "Inconsistent security configuration",
      "Limited visibility into security events",
    ],
    solutions: [
      {
        title: "Security Assessment and Hardening",
        description:
          "Evaluating security posture and implementing targeted improvements.",
      },
      {
        title: "Firewall and Network Security",
        description:
          "Deploying and configuring firewalls and network security controls.",
      },
      {
        title: "Endpoint Protection",
        description:
          "Protecting user devices and systems from malware and threats.",
      },
      {
        title: "Identity and Access Management",
        description:
          "Implementing centralised identity, authentication and access controls.",
      },
      {
        title: "MFA and Access Controls",
        description:
          "Enforcing multi-factor authentication and least-privilege access policies.",
      },
      {
        title: "Security Monitoring and Advisory",
        description:
          "Ongoing monitoring of security events and strategic advisory services.",
      },
      {
        title: "Backup and Recovery Security",
        description:
          "Ensuring backup systems are secure, tested and recoverable.",
      },
    ],
    benefits: [
      "Reduced attack surface",
      "Stronger access control",
      "Improved resilience",
      "Better security governance",
    ],
    technologies: [
      "Fortinet",
      "Sophos",
      "Microsoft Defender",
      "Microsoft Entra ID",
      "Endpoint Protection Platforms",
    ],
    industriesServed: [
      "Government",
      "Enterprise",
      "Healthcare",
      "Development programmes",
    ],
    order: 7,
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    category: "Infrastructure & Platforms",
    slug: "cloud-solutions",
    description:
      "Cloud services that improve collaboration, availability and operational flexibility.",
    detailText: `Cloud services that improve collaboration, availability and operational flexibility.

Cloud computing enables organisations to modernise operations, reduce infrastructure complexity, improve accessibility and accelerate productivity. OceanNet Technologies helps clients plan, migrate, implement and manage cloud solutions that align with business goals and operational requirements.`,
    icon: "Laptop",
    challenges: [
      "On-premise limitations",
      "Complex email and collaboration environments",
      "Inconsistent backup",
      "Need for secure remote access",
    ],
    solutions: [
      {
        title: "Cloud Migration",
        description:
          "Planning and executing migration of applications, data and workloads to the cloud.",
      },
      {
        title: "Microsoft 365",
        description:
          "Implementation, configuration and administration of Microsoft 365 including Exchange Online, Teams, SharePoint and OneDrive.",
      },
      {
        title: "Google Workspace",
        description:
          "Implementation, migration and administration of Google Workspace productivity and collaboration tools.",
      },
      {
        title: "Cloud Hosting",
        description:
          "Secure hosting of websites, applications and workloads in cloud environments.",
      },
      {
        title: "Identity and Access Management",
        description:
          "Configuring cloud identity, MFA and access controls for secure environments.",
      },
      {
        title: "Cloud Backup",
        description:
          "Protecting cloud data with structured backup and recovery solutions.",
      },
      {
        title: "Hybrid-Cloud Architecture",
        description:
          "Designing environments that combine cloud and on-premise resources effectively.",
      },
      {
        title: "Ongoing Cloud Administration",
        description:
          "Day-to-day management, user support and optimisation of cloud environments.",
      },
    ],
    benefits: [
      "Anywhere access",
      "Improved collaboration",
      "Simpler administration",
      "Scalable services and business continuity",
    ],
    technologies: [
      "Microsoft 365",
      "Microsoft Azure",
      "Google Workspace",
      "Microsoft Entra ID",
      "Cloud Backup Solutions",
    ],
    industriesServed: [
      "SMEs",
      "Government projects",
      "NGOs",
      "Professional services",
      "Enterprise",
    ],
    order: 8,
  },

  // ─── SPECIALISED & MANAGED SERVICES ──────────────────────────────────────
  {
    id: "gis-solutions",
    title: "GIS Solutions",
    category: "Specialised & Managed Services",
    slug: "gis-solutions",
    description:
      "Geospatial platforms that turn location data into operational insight.",
    detailText: `Geospatial platforms that turn location data into operational insight.

Location matters. Whether managing infrastructure, public services, land administration, utilities, health programmes or development initiatives, spatial information provides critical insights for effective decision-making.

OceanNet Technologies delivers GIS solutions that enable organisations to collect, analyse, visualise and manage geographic data to support operational and strategic objectives.`,
    icon: "Map",
    challenges: [
      "Disconnected spatial and business data",
      "Paper-based mapping and land records",
      "Limited geospatial access",
      "Difficulty integrating maps into operational systems",
    ],
    solutions: [
      {
        title: "GIS-Enabled Applications",
        description:
          "Custom applications with embedded mapping, spatial queries and location-based features.",
      },
      {
        title: "PostGIS Spatial Databases",
        description:
          "Structured spatial databases for storing, querying and analysing geographic data.",
      },
      {
        title: "Web Mapping",
        description:
          "Interactive map platforms accessible through browsers and portals.",
      },
      {
        title: "Geospatial Data Integration",
        description:
          "Connecting GIS platforms with enterprise systems and operational databases.",
      },
      {
        title: "Land and Asset Information Systems",
        description:
          "Supporting modern land administration and asset management through GIS.",
      },
      {
        title: "GIS Infrastructure and Technical Support",
        description:
          "Hosting, administration and technical support for GIS environments.",
      },
    ],
    benefits: [
      "Location-aware decision making",
      "Integrated spatial records",
      "Improved service planning",
      "Better access to geospatial information",
    ],
    industriesServed: [
      "Land administration",
      "Government",
      "Utilities",
      "Environment",
      "Infrastructure",
    ],
    order: 9,
  },
  {
    id: "ai-data-analytics",
    title: "AI & Data Analytics",
    category: "Specialised & Managed Services",
    slug: "ai-data-analytics",
    description:
      "Practical analytics and AI capabilities focused on measurable operational value.",
    detailText: `Practical analytics and AI capabilities focused on measurable operational value.

Data is one of the most valuable assets an organisation possesses. However, data only becomes valuable when transformed into meaningful insights that support informed decisions and measurable outcomes.

OceanNet Technologies helps organisations collect, manage, analyse and visualise data while exploring the practical potential of artificial intelligence to improve efficiency, decision support and service delivery.`,
    icon: "BarChart3",
    challenges: [
      "Data spread across multiple sources",
      "Manual reporting",
      "Limited decision visibility",
      "Repetitive information-processing tasks",
    ],
    solutions: [
      {
        title: "Data Integration and Preparation",
        description:
          "Consolidating data from multiple sources into structured, usable formats.",
      },
      {
        title: "Dashboards and Visualisation",
        description:
          "Real-time dashboards that make key performance indicators visible and actionable.",
      },
      {
        title: "Operational Analytics",
        description:
          "Analysis to support operational management, planning and service improvement.",
      },
      {
        title: "AI-Enabled Workflow Support",
        description:
          "Practical AI capabilities embedded into operational processes for efficiency gains.",
      },
      {
        title: "Document and Information Intelligence",
        description:
          "Extracting and processing information from documents and unstructured data sources.",
      },
      {
        title: "Prototype and Use-Case Development",
        description:
          "Building proofs of concept to validate AI and analytics applications before full deployment.",
      },
    ],
    benefits: [
      "Faster insight",
      "Better reporting",
      "Reduced repetitive work",
      "Evidence-based decision support",
    ],
    technologies: [
      "Power BI",
      "Python",
      "PostgreSQL",
      "Data Warehousing Platforms",
      "AI/ML Frameworks",
    ],
    industriesServed: [
      "Government",
      "Enterprise",
      "Healthcare",
      "Development programmes",
    ],
    order: 10,
  },
  {
    id: "managed-services",
    title: "Managed Services",
    category: "Specialised & Managed Services",
    slug: "managed-services",
    description:
      "Ongoing technical administration and support that keeps critical systems working.",
    detailText: `Ongoing technical administration and support that keeps critical systems working.

Managing technology infrastructure can be complex and resource-intensive. OceanNet Technologies provides managed services that allow organisations to focus on their core mission while we monitor, maintain, support and optimise their technology environments.

Our managed services approach emphasises reliability, responsiveness, security and continuous improvement.`,
    icon: "ClipboardList",
    challenges: [
      "Limited internal ICT capacity",
      "Recurring system administration workload",
      "Inconsistent maintenance",
      "Need for specialist support without full-time staffing",
    ],
    solutions: [
      {
        title: "Cloud Administration",
        description:
          "Day-to-day management of cloud platforms including user accounts, licensing and security.",
      },
      {
        title: "Microsoft 365 and Google Workspace Administration",
        description:
          "Ongoing administration of productivity and collaboration platforms.",
      },
      {
        title: "Hosting and Domain Management",
        description:
          "Managing website hosting, domain registration, DNS and SSL certificates.",
      },
      {
        title: "Infrastructure and Network Support",
        description:
          "Monitoring and supporting on-premise servers, networks and infrastructure.",
      },
      {
        title: "User Support",
        description:
          "Responsive helpdesk and user support for ICT issues and requests.",
      },
      {
        title: "Technical Advisory",
        description:
          "Strategic guidance on technology planning, upgrades and procurement decisions.",
      },
      {
        title: "Preventive Maintenance and Troubleshooting",
        description:
          "Scheduled maintenance and proactive troubleshooting to reduce downtime.",
      },
    ],
    benefits: [
      "Predictable support",
      "Reduced operational burden",
      "Improved continuity",
      "Access to broader technical expertise",
    ],
    industriesServed: [
      "SMEs",
      "Projects",
      "NGOs",
      "Professional services",
      "Public institutions",
    ],
    order: 11,
  },
  {
    id: "ict-procurement",
    title: "ICT Procurement",
    category: "Specialised & Managed Services",
    slug: "ict-procurement-solutions",
    description:
      "Technology procurement supported by technical requirements, evaluation and deployment expertise.",
    detailText: `Technology procurement supported by technical requirements, evaluation and deployment expertise.

Successful ICT procurement requires careful planning, technical evaluation, vendor management, deployment support and lifecycle management — not just purchasing.

OceanNet Technologies helps organisations navigate complex procurement processes while ensuring solutions align with business needs, technical requirements and long-term objectives.`,
    icon: "Package",
    challenges: [
      "Poorly specified requirements",
      "Incompatible equipment purchases",
      "Weak technical evaluation",
      "Procurement disconnected from implementation",
    ],
    solutions: [
      {
        title: "Requirements and Specification Development",
        description:
          "Defining technical requirements and specifications before procurement begins.",
      },
      {
        title: "Technical Evaluation",
        description:
          "Assessing vendor proposals, products and solutions against defined requirements.",
      },
      {
        title: "Sourcing Support",
        description:
          "Identifying suitable suppliers and supporting procurement processes.",
      },
      {
        title: "Equipment Supply",
        description:
          "Supplying hardware, peripherals and ICT equipment aligned with specifications.",
      },
      {
        title: "Installation and Configuration",
        description:
          "Deploying, installing and configuring procured equipment and software.",
      },
      {
        title: "Acceptance Testing",
        description:
          "Verifying that delivered equipment and systems meet specified requirements.",
      },
      {
        title: "Lifecycle and Warranty Coordination",
        description:
          "Managing warranties, support contracts and equipment lifecycle planning.",
      },
    ],
    benefits: [
      "Better-fit purchases",
      "Reduced compatibility risk",
      "Clear technical accountability",
      "Faster deployment",
    ],
    industriesServed: [
      "Government",
      "Development projects",
      "Enterprise",
      "NGOs",
    ],
    order: 12,
  },
];
