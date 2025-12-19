const express = require("express");
const prisma = require("../db/prisma");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * GET /me/overview
 * Used for home page gating + completeness
 */
router.get("/overview", auth, async (req, res) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { userId: req.userId },
        });

        res.json({
            hasProfile: Boolean(profile),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * GET /me/stats
 * Returns dashboard stats for the current user
 */
router.get("/stats", auth, async (req, res) => {
    try {
        // Count total applications
        const jobsApplied = await prisma.application.count({
            where: { userId: req.userId },
        });

        // Count active applications (not rejected)
        const activeApplications = await prisma.application.count({
            where: {
                userId: req.userId,
                status: {
                    not: "REJECTED",
                },
            },
        });

        // Count available matches (jobs with match score > 0 that user hasn't applied to)
        // This requires loading profile and jobs, so we'll compute it
        const profile = await prisma.profile.findUnique({
            where: { userId: req.userId },
            include: { skills: true },
        });

        let matchesAvailable = null;
        if (profile) {
            const appliedJobIds = await prisma.application.findMany({
                where: { userId: req.userId },
                select: { jobId: true },
            });
            const appliedJobIdSet = new Set(appliedJobIds.map((a) => a.jobId));

            const allJobs = await prisma.job.findMany();
            const matchJob = require("../matching/matchJob");

            const matchedCount = allJobs
                .filter((job) => !appliedJobIdSet.has(job.id))
                .map((job) => ({
                    job,
                    score: matchJob(profile, job),
                }))
                .filter(({ score }) => score > 0).length;

            matchesAvailable = matchedCount;
        }

        res.json({
            jobsApplied,
            activeApplications,
            matchesAvailable,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load stats" });
    }
});


module.exports = router;
