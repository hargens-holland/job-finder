const { PrismaClient } = require("../src/generated/prisma");
const prisma = new PrismaClient();

async function main() {
    const jobs = [
        {
            title: "Frontend Engineer",
            company: "TechNova",
            location: "Remote",
            description:
                "Build and maintain modern React applications with a focus on performance and UX.",
            skills: ["React", "TypeScript", "CSS", "HTML"],
        },
        {
            title: "Backend Engineer",
            company: "DataForge",
            location: "New York, NY",
            description:
                "Design scalable backend APIs and work with databases and cloud infrastructure.",
            skills: ["Node.js", "PostgreSQL", "REST", "Docker"],
        },
        {
            title: "Full Stack Developer",
            company: "Startup Labs",
            location: "San Francisco, CA",
            description:
                "Work across the stack to build and ship new product features quickly.",
            skills: ["React", "Node.js", "SQL", "AWS"],
        },
        {
            title: "Software Engineer Intern",
            company: "InnovateX",
            location: "Austin, TX",
            description:
                "Assist engineering teams in building internal tools and customer-facing features.",
            skills: ["JavaScript", "Git"],
        },
        {
            title: "Machine Learning Engineer",
            company: "AI Systems",
            location: "Remote",
            description:
                "Develop and deploy machine learning models into production systems.",
            skills: ["Python", "Machine Learning", "PyTorch"],
        },
    ];

    for (const job of jobs) {
        await prisma.job.create({ data: job });
    }

    console.log("✅ Jobs seeded successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
