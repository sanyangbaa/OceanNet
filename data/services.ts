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
}

export const services: Service[] = [
  {
    id: "digital-solutions",
    title: "Digital Solutions",
    slug: "digital-solutions",
    description:
      "We design and implement innovative digital solutions that help organizations modernize operations, improve efficiency, enhance service delivery, and accelerate digital transformation.",
    detailText: `Organizations today face increasing pressure to improve efficiency, deliver better services, and adapt to rapidly changing digital environments.

OceanNet Technologies helps organizations transform manual and fragmented processes into modern digital solutions that improve productivity, transparency, collaboration, and decision-making.

Our digital solutions are designed around business objectives, ensuring that technology delivers measurable value and sustainable impact.`,
    icon: "Code2",
    challenges: [
      "Manual and paper-based processes",
      "Inefficient workflows",
      "Data silos and fragmented information",
      "Limited visibility into operations",
      "Poor customer or citizen experience",
      "Lack of automation",
      "Limited reporting and analytics capabilities",
    ],
    solutions: [
      {
        title: "Business Process Automation",
        description: "Automating repetitive tasks and workflows.",
      },
      {
        title: "Digital Service Platforms",
        description:
          "Building platforms that improve service delivery and stakeholder engagement.",
      },
      {
        title: "Workflow Management Systems",
        description: "Digitizing and streamlining operational processes.",
      },
      {
        title: "Custom Digital Applications",
        description:
          "Developing solutions tailored to specific business needs.",
      },
      {
        title: "Reporting & Dashboards",
        description:
          "Providing real-time visibility into organizational performance.",
      },
      {
        title: "Mobile Solutions",
        description:
          "Extending services through mobile platforms and applications.",
      },
    ],
    benefits: [
      "Increased operational efficiency",
      "Faster service delivery",
      "Improved transparency",
      "Better decision-making",
      "Reduced manual effort",
      "Enhanced user experience",
      "Greater scalability",
    ],
    typicalDeliverables: [
      "Digital transformation assessments",
      "Business process reviews",
      "Workflow automation solutions",
      "Web-based platforms",
      "Mobile applications",
      "Reporting dashboards",
      "User training and support",
    ],
    industriesServed: [
      "Government",
      "Healthcare",
      "Telecommunications",
      "Financial Services",
      "Education",
      "Development Organizations",
      "Private Sector",
    ],
    order: 1,
  },
  {
    id: "systems-integration",
    title: "Systems Integration",
    slug: "systems-integration",
    description:
      "We integrate applications, platforms, databases, and technologies to create seamless digital ecosystems that improve efficiency, visibility, and performance.",
    detailText: `Many organizations operate multiple systems that do not communicate effectively with one another.

This results in duplicate data entry, inconsistent information, inefficiencies, and limited visibility.

OceanNet Technologies helps organizations connect systems, automate information exchange, and create integrated environments that support informed decision-making and efficient operations.`,
    icon: "Building2",
    challenges: [
      "Disconnected business systems",
      "Duplicate data entry",
      "Inconsistent information",
      "Manual data transfers",
      "Reporting challenges",
      "Poor interoperability",
      "Limited visibility across departments",
    ],
    solutions: [
      {
        title: "Application Integration",
        description: "Connecting enterprise applications and platforms.",
      },
      {
        title: "API Integration",
        description:
          "Designing and implementing secure API-based integrations.",
      },
      {
        title: "Data Integration",
        description: "Synchronizing information across multiple systems.",
      },
      {
        title: "Enterprise Service Integration",
        description: "Building interoperable technology environments.",
      },
      {
        title: "Cloud-to-On-Premise Integration",
        description: "Connecting cloud services with existing infrastructure.",
      },
      {
        title: "Platform Modernization",
        description: "Enhancing existing systems through integration.",
      },
    ],
    benefits: [
      "Improved efficiency",
      "Better data quality",
      "Reduced operational costs",
      "Enhanced visibility",
      "Faster decision-making",
      "Improved interoperability",
      "Greater business agility",
    ],
    typicalDeliverables: [
      "Integration architecture design",
      "API development",
      "Data migration",
      "Data synchronization",
      "Integration testing",
      "Documentation",
      "User training",
    ],
    industriesServed: [
      "Government",
      "Healthcare",
      "Telecommunications",
      "Financial Services",
      "Utilities",
      "Development Organizations",
    ],
    order: 2,
  },
  {
    id: "digital-health",
    title: "Digital Health Solutions",
    slug: "digital-health-solutions",
    description:
      "We help healthcare organizations leverage digital technologies to improve health outcomes, strengthen service delivery, and support data-driven decision-making.",
    detailText: `Digital health technologies play a critical role in improving healthcare delivery, disease surveillance, public health response, supply chain management, and health information management.

OceanNet Technologies supports governments, healthcare institutions, and development organizations in implementing innovative digital health solutions that improve efficiency, transparency, and impact.`,
    icon: "Shield",
    challenges: [
      "Fragmented health information systems",
      "Limited visibility into health data",
      "Disease surveillance challenges",
      "Supply chain inefficiencies",
      "Manual reporting processes",
      "Limited interoperability",
      "Delayed decision-making",
    ],
    solutions: [
      {
        title: "Disease Surveillance Platforms",
        description:
          "Implementation and support of disease monitoring and response systems.",
      },
      {
        title: "Health Information Systems",
        description:
          "Deployment and integration of health information platforms.",
      },
      {
        title: "Supply Chain Solutions",
        description:
          "Supporting efficient management of health commodities and medicines.",
      },
      {
        title: "Data Analytics & Reporting",
        description: "Providing insights for evidence-based decision-making.",
      },
      {
        title: "Interoperability Solutions",
        description: "Connecting health information systems and data sources.",
      },
      {
        title: "Training & Capacity Building",
        description: "Strengthening user adoption and sustainability.",
      },
    ],
    benefits: [
      "Improved health outcomes",
      "Enhanced disease surveillance",
      "Better resource utilization",
      "Stronger reporting capabilities",
      "Faster response to public health events",
      "Increased data quality",
    ],
    technologies: [
      "SORMAS",
      "DHIS2",
      "OpenLMIS",
      "GIS Platforms",
      "Analytics Solutions",
    ],
    typicalDeliverables: [
      "System deployment",
      "Configuration and customization",
      "Training and change management",
      "Systems integration",
      "Reporting dashboards",
      "Technical support",
    ],
    order: 3,
  },
  {
    id: "enterprise-software",
    title: "Enterprise Software Solutions",
    slug: "enterprise-software-solutions",
    description:
      "We help organizations deploy, integrate, and optimize enterprise software solutions that improve efficiency, productivity, and decision-making.",
    detailText: `Enterprise software solutions provide organizations with the tools needed to manage operations, streamline workflows, improve collaboration, and support strategic growth.

OceanNet Technologies works with organizations to implement solutions that align technology investments with business objectives.`,
    icon: "Laptop",
    challenges: [
      "Inefficient business processes",
      "Limited visibility into operations",
      "Fragmented information",
      "Manual reporting",
      "Lack of scalability",
      "Poor collaboration",
    ],
    solutions: [
      {
        title: "Enterprise Resource Planning (ERP)",
        description: "Integrated platforms for managing business operations.",
      },
      {
        title: "Human Resource Management Systems",
        description: "Modern workforce management solutions.",
      },
      {
        title: "Document Management Systems",
        description:
          "Secure storage and management of organizational information.",
      },
      {
        title: "Workflow Automation",
        description: "Digitizing and automating business processes.",
      },
      {
        title: "Collaboration Platforms",
        description: "Improving communication and teamwork.",
      },
      {
        title: "Reporting & Analytics",
        description: "Delivering actionable business insights.",
      },
    ],
    benefits: [
      "Improved efficiency",
      "Better visibility",
      "Enhanced collaboration",
      "Reduced operational costs",
      "Stronger compliance",
      "Increased scalability",
    ],
    typicalDeliverables: [
      "Solution assessment",
      "System implementation",
      "Integration services",
      "Data migration",
      "User training",
      "Support and maintenance",
    ],
    industriesServed: [
      "Government",
      "Healthcare",
      "Telecommunications",
      "Financial Services",
      "Education",
      "Private Sector",
    ],
    order: 4,
  },
  {
    id: "networking",
    title: "Networking Solutions",
    slug: "networking-solutions",
    description:
      "We design, implement, optimize, and support modern network infrastructures that enable organizations to communicate, collaborate, and operate efficiently.",
    detailText: `A reliable network is the foundation of every modern organization. From internet connectivity and wireless access to enterprise-wide communication and cloud services, network performance directly impacts productivity and business operations.

OceanNet Technologies designs and deploys secure, scalable, and resilient networking solutions that support current needs while preparing organizations for future growth.`,
    icon: "BarChart3",
    challenges: [
      "Poor network performance",
      "Unreliable connectivity",
      "Limited wireless coverage",
      "Network security vulnerabilities",
      "Complex multi-site environments",
      "Lack of visibility into network operations",
      "Scalability challenges",
    ],
    solutions: [
      {
        title: "Enterprise Network Design",
        description: "Designing secure and scalable network architectures.",
      },
      {
        title: "Wireless Networking",
        description: "Deployment of enterprise-grade Wi-Fi solutions.",
      },
      {
        title: "Network Optimization",
        description: "Improving network performance and reliability.",
      },
      {
        title: "Multi-Site Connectivity",
        description: "Connecting branches, offices, and remote locations.",
      },
      {
        title: "Network Monitoring",
        description:
          "Providing visibility into network health and performance.",
      },
      {
        title: "Network Security Integration",
        description:
          "Implementing secure access and traffic management controls.",
      },
    ],
    benefits: [
      "Improved reliability",
      "Better performance",
      "Enhanced user experience",
      "Increased productivity",
      "Stronger security",
      "Simplified management",
      "Future-ready infrastructure",
    ],
    technologies: [
      "Cisco",
      "Ubiquiti UniFi",
      "MikroTik",
      "Enterprise Switching Platforms",
      "Wireless Controllers",
      "VPN Technologies",
    ],
    typicalDeliverables: [
      "Network assessments",
      "Network architecture designs",
      "Wireless surveys",
      "Network deployment",
      "Configuration and optimization",
      "Monitoring solutions",
      "Documentation and training",
    ],
    order: 5,
  },
  {
    id: "ict-infrastructure",
    title: "ICT Infrastructure Solutions",
    slug: "ict-infrastructure-solutions",
    description:
      "We design and implement robust ICT infrastructure solutions that support business continuity, operational efficiency, and digital transformation.",
    detailText: `Technology infrastructure serves as the backbone of every digital organization.

OceanNet Technologies helps organizations build resilient, secure, and scalable ICT environments that support critical business systems and future growth.

Whether deploying new infrastructure or modernizing existing environments, we deliver solutions aligned with business objectives and industry best practices.`,
    icon: "Building2",
    challenges: [
      "Aging infrastructure",
      "Limited scalability",
      "Poor system availability",
      "Business continuity risks",
      "Data protection concerns",
      "Performance bottlenecks",
      "Infrastructure complexity",
    ],
    solutions: [
      {
        title: "Server Infrastructure",
        description:
          "Deployment and management of enterprise server environments.",
      },
      {
        title: "Data Center Solutions",
        description:
          "Design and implementation of modern data center infrastructure.",
      },
      {
        title: "Virtualization Platforms",
        description:
          "Improving efficiency through virtualization technologies.",
      },
      {
        title: "Backup & Recovery Solutions",
        description: "Protecting critical organizational data.",
      },
      {
        title: "Business Continuity Solutions",
        description: "Reducing operational risk and downtime.",
      },
      {
        title: "Infrastructure Modernization",
        description: "Upgrading legacy environments to modern platforms.",
      },
    ],
    benefits: [
      "Improved system availability",
      "Increased reliability",
      "Better scalability",
      "Reduced downtime",
      "Stronger data protection",
      "Enhanced operational efficiency",
    ],
    technologies: [
      "VMware",
      "Hyper-V",
      "Windows Server",
      "Linux Platforms",
      "Storage Solutions",
      "Backup Technologies",
    ],
    typicalDeliverables: [
      "Infrastructure assessments",
      "Infrastructure architecture design",
      "Server deployment",
      "Virtualization implementation",
      "Backup solutions",
      "Disaster recovery planning",
      "Documentation and support",
    ],
    order: 6,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Solutions",
    slug: "cybersecurity-solutions",
    description:
      "We help organizations identify risks, strengthen defenses, improve resilience, and protect critical systems, data, and operations.",
    detailText: `Cybersecurity is no longer optional. As organizations become increasingly dependent on digital technologies, the risks associated with cyber threats continue to grow.

OceanNet Technologies provides practical cybersecurity solutions that help organizations strengthen security posture, manage risks, and improve resilience against evolving threats.`,
    icon: "Shield",
    challenges: [
      "Cybersecurity risks",
      "Weak security controls",
      "Increasing cyber threats",
      "Regulatory compliance requirements",
      "Limited security awareness",
      "Vulnerability management challenges",
      "Data protection concerns",
    ],
    solutions: [
      {
        title: "Security Assessments",
        description: "Evaluating security posture and identifying risks.",
      },
      {
        title: "Vulnerability Assessments",
        description: "Identifying weaknesses before they can be exploited.",
      },
      {
        title: "Security Architecture Design",
        description: "Designing secure technology environments.",
      },
      {
        title: "Endpoint Security",
        description: "Protecting user devices and systems.",
      },
      {
        title: "Security Awareness Training",
        description: "Building a culture of cybersecurity awareness.",
      },
      {
        title: "Security Policy Development",
        description: "Supporting governance and compliance initiatives.",
      },
    ],
    benefits: [
      "Reduced risk exposure",
      "Improved compliance",
      "Stronger security controls",
      "Enhanced business resilience",
      "Better protection of sensitive information",
      "Increased stakeholder confidence",
    ],
    technologies: [
      "Fortinet",
      "Sophos",
      "Microsoft Security Solutions",
      "Endpoint Protection Platforms",
      "Security Monitoring Solutions",
    ],
    typicalDeliverables: [
      "Security assessments",
      "Risk analysis reports",
      "Vulnerability assessments",
      "Security policies",
      "Awareness training programs",
      "Remediation plans",
    ],
    order: 7,
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    slug: "cloud-solutions",
    description:
      "We help organizations leverage cloud technologies to improve flexibility, scalability, collaboration, security, and operational efficiency.",
    detailText: `Cloud computing enables organizations to modernize operations, reduce infrastructure complexity, improve accessibility, and accelerate innovation.

OceanNet Technologies helps clients plan, migrate, implement, and manage cloud solutions that align with business goals and operational requirements.`,
    icon: "Laptop",
    challenges: [
      "Aging infrastructure",
      "Limited scalability",
      "Remote work challenges",
      "Collaboration inefficiencies",
      "High infrastructure costs",
      "Complex system management",
      "Business continuity concerns",
    ],
    solutions: [
      {
        title: "Cloud Readiness Assessments",
        description: "Evaluating organizational readiness for cloud adoption.",
      },
      {
        title: "Cloud Migration Services",
        description:
          "Moving applications, systems, and workloads to the cloud.",
      },
      {
        title: "Microsoft 365 Solutions",
        description: "Enhancing productivity and collaboration.",
      },
      {
        title: "Hybrid Cloud Solutions",
        description: "Combining cloud and on-premises environments.",
      },
      {
        title: "Cloud Security",
        description: "Protecting cloud-based assets and information.",
      },
      {
        title: "Cloud Optimization",
        description: "Improving performance, governance, and cost efficiency.",
      },
    ],
    benefits: [
      "Greater flexibility",
      "Improved scalability",
      "Enhanced collaboration",
      "Reduced infrastructure costs",
      "Increased availability",
      "Better disaster recovery capabilities",
    ],
    technologies: [
      "Microsoft Azure",
      "Microsoft 365",
      "Amazon Web Services (AWS)",
      "Hybrid Cloud Platforms",
      "Cloud Backup Solutions",
    ],
    typicalDeliverables: [
      "Cloud strategy development",
      "Cloud readiness assessments",
      "Migration planning",
      "Cloud implementation",
      "Security configuration",
      "User training and support",
    ],
    order: 8,
  },
  {
    id: "gis-solutions",
    title: "GIS Solutions",
    slug: "gis-solutions",
    description:
      "We help organizations leverage Geographic Information Systems (GIS) and spatial technologies to improve planning, decision-making, resource management, and service delivery.",
    detailText: `Location matters. Whether managing infrastructure, public services, land administration, utilities, health programs, or development initiatives, spatial information provides critical insights for effective decision-making.

OceanNet Technologies delivers GIS solutions that enable organizations to collect, analyze, visualize, and manage geographic data to support operational and strategic objectives.`,
    icon: "Map",
    challenges: [
      "Limited visibility into geographic data",
      "Inefficient field operations",
      "Poor asset tracking",
      "Fragmented spatial information",
      "Manual mapping processes",
      "Limited location-based analysis",
      "Ineffective planning and monitoring",
    ],
    solutions: [
      {
        title: "GIS Strategy & Planning",
        description: "Developing GIS roadmaps and implementation strategies.",
      },
      {
        title: "Digital Mapping Solutions",
        description: "Creating accurate digital maps and spatial datasets.",
      },
      {
        title: "Asset Management Systems",
        description:
          "Tracking and managing physical infrastructure and assets.",
      },
      {
        title: "Land Information Systems",
        description:
          "Supporting modern land administration and land management initiatives.",
      },
      {
        title: "Spatial Analytics",
        description:
          "Providing location-based insights for better decision-making.",
      },
      {
        title: "GIS Integration",
        description:
          "Connecting GIS platforms with enterprise systems and databases.",
      },
    ],
    benefits: [
      "Improved planning and decision-making",
      "Better visibility of assets and resources",
      "Enhanced operational efficiency",
      "Improved data accuracy",
      "Stronger monitoring and evaluation",
      "Better resource allocation",
    ],
    industriesServed: [
      "Government",
      "Land Administration",
      "Utilities",
      "Healthcare",
      "Agriculture",
      "Development Organizations",
      "Telecommunications",
    ],
    typicalDeliverables: [
      "GIS assessments",
      "GIS implementation roadmaps",
      "Digital maps",
      "Spatial databases",
      "GIS dashboards",
      "GIS integrations",
      "User training",
    ],
    order: 9,
  },
  {
    id: "ai-data-analytics",
    title: "AI & Data Analytics",
    slug: "ai-data-analytics",
    description:
      "We help organizations unlock the value of their data through analytics, visualization, artificial intelligence, and data-driven decision-making.",
    detailText: `Data is one of the most valuable assets an organization possesses. However, data only becomes valuable when transformed into meaningful insights that support informed decisions and measurable outcomes.

OceanNet Technologies helps organizations collect, manage, analyze, and visualize data while exploring the potential of artificial intelligence to improve efficiency, forecasting, and service delivery.`,
    icon: "BarChart3",
    challenges: [
      "Limited visibility into organizational performance",
      "Poor data quality",
      "Fragmented information sources",
      "Manual reporting processes",
      "Delayed decision-making",
      "Limited predictive capabilities",
      "Underutilized data assets",
    ],
    solutions: [
      {
        title: "Business Intelligence",
        description: "Transforming data into actionable insights.",
      },
      {
        title: "Dashboard Development",
        description: "Real-time visibility into key performance indicators.",
      },
      {
        title: "Data Analytics",
        description: "Advanced analysis to support strategic decisions.",
      },
      {
        title: "Data Integration",
        description: "Combining information from multiple sources.",
      },
      {
        title: "AI Readiness Assessments",
        description:
          "Evaluating opportunities for artificial intelligence adoption.",
      },
      {
        title: "AI-Enabled Solutions",
        description:
          "Supporting automation, prediction, and intelligent decision-making initiatives.",
      },
    ],
    benefits: [
      "Faster decision-making",
      "Improved operational visibility",
      "Better performance monitoring",
      "Enhanced forecasting capabilities",
      "Improved service delivery",
      "Greater organizational agility",
    ],
    technologies: [
      "Power BI",
      "Data Warehousing Platforms",
      "Artificial Intelligence Platforms",
      "Machine Learning Frameworks",
      "Analytics Solutions",
    ],
    industriesServed: [
      "Government",
      "Healthcare",
      "Telecommunications",
      "Financial Services",
      "Education",
      "Development Organizations",
      "Private Sector",
    ],
    typicalDeliverables: [
      "Data strategy assessments",
      "Dashboards and reports",
      "Business intelligence platforms",
      "Data integration solutions",
      "Analytics frameworks",
      "AI readiness assessments",
    ],
    order: 10,
  },
  {
    id: "managed-services",
    title: "Managed Services",
    slug: "managed-services",
    description:
      "We provide proactive managed services that help organizations maintain reliable, secure, and high-performing technology environments.",
    detailText: `Managing technology infrastructure can be complex and resource-intensive.

OceanNet Technologies provides managed services that allow organizations to focus on their core mission while we monitor, maintain, support, and optimize their technology environments.

Our managed services approach emphasizes reliability, responsiveness, security, and continuous improvement.`,
    icon: "ClipboardList",
    challenges: [
      "Limited internal IT resources",
      "Frequent system downtime",
      "Reactive support models",
      "Security concerns",
      "Infrastructure management challenges",
      "Lack of monitoring and reporting",
      "Operational inefficiencies",
    ],
    solutions: [
      {
        title: "IT Support Services",
        description: "Responsive technical support for users and systems.",
      },
      {
        title: "Infrastructure Monitoring",
        description:
          "Proactive monitoring of critical technology environments.",
      },
      {
        title: "System Administration",
        description: "Management of servers, networks, and platforms.",
      },
      {
        title: "Security Monitoring",
        description: "Ongoing monitoring of security controls and risks.",
      },
      {
        title: "Preventive Maintenance",
        description: "Reducing downtime through proactive management.",
      },
      {
        title: "Technology Advisory Services",
        description: "Strategic guidance and planning support.",
      },
    ],
    benefits: [
      "Reduced downtime",
      "Improved reliability",
      "Enhanced security",
      "Predictable support costs",
      "Better performance",
      "Increased user satisfaction",
    ],
    typicalDeliverables: [
      "Service level agreements (SLAs)",
      "Monitoring reports",
      "Maintenance schedules",
      "Incident management",
      "Technical support",
      "Infrastructure optimization",
    ],
    order: 11,
  },
  {
    id: "ict-procurement",
    title: "ICT Procurement Solutions",
    slug: "ict-procurement-solutions",
    description:
      "We help organizations source, acquire, deploy, and support technology solutions that meet operational requirements, budget expectations, and long-term objectives.",
    detailText: `Technology procurement involves more than purchasing hardware and software. Successful procurement requires careful planning, technical evaluation, vendor management, deployment support, and lifecycle management.

OceanNet Technologies helps organizations navigate complex procurement processes while ensuring solutions align with business needs and industry standards.`,
    icon: "Package",
    challenges: [
      "Complex procurement requirements",
      "Technology selection challenges",
      "Vendor management issues",
      "Budget constraints",
      "Deployment coordination difficulties",
      "Warranty and support concerns",
      "Lifecycle management challenges",
    ],
    solutions: [
      {
        title: "Technology Advisory",
        description: "Supporting informed procurement decisions.",
      },
      {
        title: "Hardware Procurement",
        description:
          "Servers, networking equipment, security solutions, end-user devices, and peripherals.",
      },
      {
        title: "Software Procurement",
        description:
          "Licensing, subscriptions, and enterprise software acquisition.",
      },
      {
        title: "Vendor Management",
        description: "Coordinating suppliers and technology partners.",
      },
      {
        title: "Deployment Services",
        description: "Installation, configuration, and commissioning support.",
      },
      {
        title: "Lifecycle Management",
        description: "Managing technology assets throughout their lifecycle.",
      },
    ],
    benefits: [
      "Better procurement outcomes",
      "Reduced procurement risk",
      "Improved vendor coordination",
      "Cost optimization",
      "Technical assurance",
      "Simplified deployment",
    ],
    typicalDeliverables: [
      "Technical specifications",
      "Vendor evaluations",
      "Procurement support",
      "Deployment planning",
      "Installation coordination",
      "Warranty management",
    ],
    order: 12,
  },
];
