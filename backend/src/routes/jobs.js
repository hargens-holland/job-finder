const express = require("express");
const prisma = require("../db/prisma");
const matchJob = require("../matching/matchJob");
const auth = require("../middleware/auth");

const router = express.Router();


/**
 * GET /jobs/matched
 * Returns jobs ranked by match score for the logged-in user
 */
router.get("/matched", auth, async (req, res) => {
    try {
        // 1. Load user profile with skills
        const profile = await prisma.profile.findUnique({
            where: { userId: req.userId },
            include: {
                skills: true,
            },
        });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        // 2. Load jobs the user has already applied to
        const appliedJobs = await prisma.application.findMany({
            where: { userId: req.userId },
            select: { jobId: true },
        });
        const appliedJobIds = new Set(appliedJobs.map((a) => a.jobId));

        // 3. Load all jobs
        const jobs = await prisma.job.findMany();

        // 4. Compute match scores (excluding applied jobs)
        const availableJobs = jobs
            // Remove applied jobs first
            .filter((job) => !appliedJobIds.has(job.id))
            // Score remaining jobs
            .map((job) => {
                const score = matchJob(profile, job);
                return {
                    ...job,
                    matchScore: score,
                };
            })
            // Sort by relevance
            .sort((a, b) => b.matchScore - a.matchScore);

        // 5. If there are jobs with match score > 0, return only those
        // Otherwise, return all available jobs (even with 0 match score) as fallback
        const matchedJobs = availableJobs.filter((job) => job.matchScore > 0);
        const result = matchedJobs.length > 0 ? matchedJobs : availableJobs;

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to match jobs" });
    }
});

/**
 * GET /jobs
 * Returns all jobs (MVP)
 */
router.get("/", async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: "desc" },
        });

        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

module.exports = router;
