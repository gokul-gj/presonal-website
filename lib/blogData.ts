export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: "project-management" | "trading";
    date: string;
    readTime: string;
    content?: string;
    image?: string;
}

export const blogCategories = {
    "project-management": {
        title: "Project Management",
        description: "Expert insights on leading successful projects, from planning to execution",
        icon: "📊",
        gradient: "from-blue-500/20 to-cyan-500/20",
        borderGradient: "from-blue-500 to-cyan-500",
    },
    "trading": {
        title: "Algorithmic Trading",
        description: "Quantitative strategies, options trading, and market analysis",
        icon: "📈",
        gradient: "from-orange-500/20 to-red-500/20",
        borderGradient: "from-orange-500 to-red-500",
    }
};

export const blogPosts: BlogPost[] = [
    {
        slug: "top-10-project-manager-qualities",
        title: "Top 10 Project Manager Qualities",
        excerpt: "Discover the essential qualities that separate exceptional project managers from the rest. Learn what makes a truly great PM.",
        category: "project-management",
        date: "2024-01-15",
        readTime: "5 min read",
        content: `
# Top 10 Project Manager Qualities

A successful project manager needs more than just technical skills. Here are the top 10 qualities that define exceptional project managers:

## 1. Leadership
Great project managers inspire and motivate their teams, setting clear direction and fostering collaboration.

## 2. Communication
Clear, concise communication across all stakeholders is fundamental to project success.

## 3. Organization
Managing multiple tasks, deadlines, and resources requires exceptional organizational skills.

## 4. Problem-Solving
The ability to quickly identify issues and develop effective solutions is crucial.

## 5. Adaptability
Projects rarely go exactly as planned. Flexibility and adaptability are key.

## 6. Risk Management
Identifying potential risks early and developing mitigation strategies prevents major issues.

## 7. Time Management
Balancing competing priorities and meeting deadlines requires excellent time management.

## 8. Technical Knowledge
Understanding the technical aspects of your project builds credibility and aids decision-making.

## 9. Negotiation Skills
Mediating between stakeholders and securing resources requires strong negotiation abilities.

## 10. Emotional Intelligence
Understanding team dynamics and managing relationships effectively drives project success.

## Conclusion
These qualities combine to create project managers who not only deliver results but also build high-performing teams and sustainable processes.
        `
    },
    {
        slug: "project-management-life-cycle",
        title: "The Project Management Life Cycle",
        excerpt: "A comprehensive guide to the five phases of project management, from initiation to closure. Master the complete lifecycle.",
        category: "project-management",
        date: "2024-01-10",
        readTime: "8 min read",
        content: `
# The Project Management Life Cycle

Understanding the project management life cycle is essential for delivering successful projects. Let's explore each phase in detail.

## Phase 1: Initiation
The initiation phase is where projects begin. Key activities include:
- Defining the project scope
- Identifying stakeholders
- Developing the business case
- Creating the project charter

## Phase 2: Planning
Planning is critical to project success. This phase involves:
- Creating detailed project plans
- Defining tasks and timelines
- Resource allocation
- Risk assessment
- Budget development

## Phase 3: Execution
The execution phase is where the actual work happens:
- Implementing the project plan
- Managing team members
- Ensuring quality standards
- Stakeholder communication

## Phase 4: Monitoring & Controlling
Continuous oversight ensures the project stays on track:
- Tracking progress against the plan
- Managing changes
- Quality control
- Performance reporting

## Phase 5: Closure
Proper closure is often overlooked but crucial:
- Final deliverable handoff
- Documentation
- Lessons learned
- Team recognition

## Best Practices
- Maintain clear communication throughout all phases
- Document decisions and changes
- Engage stakeholders regularly
- Celebrate milestones

Understanding and effectively managing each phase ensures project success and team satisfaction.
        `
    },
    {
        slug: "what-is-project-management",
        title: "What is Project Management?",
        excerpt: "An introduction to project management principles, methodologies, and why it matters for business success.",
        category: "project-management",
        date: "2024-01-05",
        readTime: "6 min read",
        content: `
# What is Project Management?

Project management is the discipline of planning, organizing, and managing resources to achieve specific goals within defined constraints.

## Core Principles

### Definition
Project management involves applying knowledge, skills, tools, and techniques to project activities to meet project requirements.

### Key Constraints
Every project operates within the triple constraint:
- **Time**: Project deadlines and schedules
- **Cost**: Budget and resource allocation
- **Scope**: Deliverables and requirements

## Why Project Management Matters

### Business Value
- Ensures efficient resource utilization
- Improves success rates
- Reduces risks and costs
- Enhances stakeholder satisfaction

### Competitive Advantage
Organizations with mature project management practices:
- Deliver projects 28% more successfully
- Waste 13 times less money
- Meet strategic goals more consistently

## Common Methodologies

### Waterfall
Traditional sequential approach, ideal for projects with well-defined requirements.

### Agile
Iterative approach focusing on flexibility and continuous delivery.

### Hybrid
Combines elements of different methodologies based on project needs.

## Essential Skills
- Strategic thinking
- Leadership and team management
- Communication and negotiation
- Risk management
- Technical competency

## Conclusion
Project management is essential for modern organizations to deliver value efficiently and effectively in an increasingly complex business environment.
        `
    },
    {
        slug: "project-charter-essentials",
        title: "Project Charter Essentials",
        excerpt: "Learn how to create effective project charters that set your projects up for success from day one.",
        category: "project-management",
        date: "2023-12-28",
        readTime: "7 min read",
    },
    {
        slug: "top-project-management-qualifications",
        title: "Top Project Management Qualifications",
        excerpt: "Explore the most valuable certifications and qualifications for advancing your project management career.",
        category: "project-management",
        date: "2023-12-20",
        readTime: "6 min read",
    },
    {
        slug: "project-proposals-guide",
        title: "Complete Guide to Project Proposals",
        excerpt: "Master the art of writing compelling project proposals that get approved and funded.",
        category: "project-management",
        date: "2023-12-15",
        readTime: "10 min read",
    },
    {
        slug: "how-to-get-pm-certified",
        title: "How to Get Certified as a Project Manager",
        excerpt: "Step-by-step guide to earning your project management certification and advancing your career.",
        category: "project-management",
        date: "2023-12-10",
        readTime: "8 min read",
    },
    {
        slug: "become-it-project-manager",
        title: "How to Become an IT Project Manager",
        excerpt: "Navigate the path from technical role to IT project management leadership with this comprehensive guide.",
        category: "project-management",
        date: "2023-12-05",
        readTime: "9 min read",
    },
    {
        slug: "become-senior-pm",
        title: "How to Become a Senior Project Manager",
        excerpt: "Advance to senior PM roles with these proven strategies and essential skills.",
        category: "project-management",
        date: "2023-11-28",
        readTime: "7 min read",
    },
    {
        slug: "top-pm-tools-2020",
        title: "Top 10 Project Management Tools in 2020",
        excerpt: "Comprehensive review of the best project management software to boost team productivity.",
        category: "project-management",
        date: "2023-11-20",
        readTime: "12 min read",
    },
    {
        slug: "earned-value-management",
        title: "Earned Value Management",
        excerpt: "Master EVM techniques to track project performance, forecast outcomes, and make data-driven decisions.",
        category: "project-management",
        date: "2023-11-15",
        readTime: "10 min read",
    },
    {
        slug: "agile-project-management",
        title: "Agile Project Management",
        excerpt: "Embrace agile methodologies to deliver value faster and adapt to changing requirements.",
        category: "project-management",
        date: "2023-11-10",
        readTime: "8 min read",
    },
    {
        slug: "agile-frameworks",
        title: "Agile Project Management Frameworks",
        excerpt: "Deep dive into Scrum, Kanban, and other agile frameworks to find the best fit for your team.",
        category: "project-management",
        date: "2023-11-05",
        readTime: "11 min read",
    },
    {
        slug: "project-risk-management",
        title: "Project Risk Management",
        excerpt: "Identify, assess, and mitigate project risks before they become critical issues.",
        category: "project-management",
        date: "2023-10-28",
        readTime: "9 min read",
    },
    {
        slug: "project-resource-management",
        title: "Project Resource Management",
        excerpt: "Optimize resource allocation and utilization for maximum project efficiency.",
        category: "project-management",
        date: "2023-10-20",
        readTime: "8 min read",
    },
    {
        slug: "resource-management-tips",
        title: "Resource Management Tips",
        excerpt: "Practical tips and best practices for managing project resources effectively.",
        category: "project-management",
        date: "2023-10-15",
        readTime: "6 min read",
    },
    {
        slug: "characteristics-of-a-project",
        title: "Characteristics of a Project",
        excerpt: "Understand what defines a project and how it differs from ongoing operations.",
        category: "project-management",
        date: "2023-10-10",
        readTime: "5 min read",
    },
    {
        slug: "code-of-ethics",
        title: "Code of Ethics in Project Management",
        excerpt: "Explore ethical principles and professional responsibility in project management.",
        category: "project-management",
        date: "2023-10-05",
        readTime: "7 min read",
    },
    {
        slug: "project-scheduling",
        title: "Project Scheduling",
        excerpt: "Master scheduling techniques including critical path method and Gantt charts.",
        category: "project-management",
        date: "2023-09-28",
        readTime: "10 min read",
    },
    {
        slug: "product-manager-vs-project-manager",
        title: "Product Manager vs Project Manager",
        excerpt: "Understand the key differences and how these roles complement each other.",
        category: "project-management",
        date: "2023-09-20",
        readTime: "6 min read",
    },
    {
        slug: "options-trading-strategies",
        title: "Advanced Options Trading Strategies",
        excerpt: "Explore sophisticated options strategies for risk management and profit optimization.",
        category: "trading",
        date: "2024-01-12",
        readTime: "12 min read",
    },
    {
        slug: "algo-trading-intro",
        title: "Introduction to Algorithmic Trading",
        excerpt: "Get started with algorithmic trading, from backtesting to live deployment.",
        category: "trading",
        date: "2024-01-08",
        readTime: "10 min read",
    },
];

export function getBlogsByCategory(category: string): BlogPost[] {
    return blogPosts.filter(post => post.category === category);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

export function getFeaturedBlogs(count: number = 3): BlogPost[] {
    return blogPosts.slice(0, count);
}
