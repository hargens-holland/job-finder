const express = require("express");
const prisma = require("../db/prisma");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * POST /applications
 * Apply to a job
 */
router.post("/", auth, async (req, res) => {
    const { jobId } = req.body;

    if (!jobId) {
        return res.status(400).json({ error: "jobId is required" });
    }

    try {
        const application = await prisma.application.create({
            data: {
                userId: req.userId,
                jobId,
            },
        });

        res.status(201).json(application);
    } catch (err) {
        // Duplicate apply (unique constraint)
        if (err.code === "P2002") {
            return res
                .status(409)
                .json({ error: "You have already applied to this job" });
        }

        console.error(err);
        res.status(500).json({ error: "Failed to apply" });
    }
});

module.exports = router;
