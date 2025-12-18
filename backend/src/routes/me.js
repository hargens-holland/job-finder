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
        let profile = await prisma.profile.findUnique({
            where: { userId: req.userId },
        });

        // Auto-create profile if missing
        if (!profile) {
            profile = await prisma.profile.create({
                data: {
                    userId: req.userId,
                    fullName: "",
                },
            });
        }

        // Re-fetch with relations AFTER creation
        const fullProfile = await prisma.profile.findUnique({
            where: { userId: req.userId },
            include: {
                skills: true,
                projects: true,
                experiences: true,
                activities: true,
            },
        });

        const hasValidProfile =
            Boolean(fullProfile.fullName && fullProfile.fullName.trim());

        res.json({
            hasProfile: true,
            hasValidProfile,
            profileCompleteness: hasValidProfile ? 100 : 0,
        });
    } catch (err) {
        console.error("ME OVERVIEW ERROR:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
