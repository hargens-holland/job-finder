const express = require("express");
const prisma = require("../db/prisma");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * POST /profile
 * Create profile for current user
 */
router.post("/", auth, async (req, res) => {
    try {
        const {
            fullName,
            birthDate,
            education,
            location,
            desiredRole,
            desiredLocation,
        } = req.body;

        if (!fullName) {
            return res.status(400).json({ error: "fullName is required" });
        }

        // Enforce one profile per user
        const existingProfile = await prisma.profile.findUnique({
            where: { userId: req.userId },
        });

        if (existingProfile) {
            return res.status(409).json({ error: "Profile already exists" });
        }

        const profile = await prisma.profile.create({
            data: {
                userId: req.userId,
                fullName,
                birthDate: birthDate ? new Date(birthDate) : undefined,
                education,
                location,
                desiredRole,
                desiredLocation,
            },
        });

        res.status(201).json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * GET /profile/me
 * Get current user's profile
 */
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { userId: req.userId },
            include: {
                skills: true,
                projects: true,
                experiences: true,
                activities: true,
            },
        });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * PUT /profile
 * Update current user's profile
 */
router.put("/", auth, async (req, res) => {
    try {
        const {
            fullName,
            birthDate,
            education,
            location,
            desiredRole,
            desiredLocation,
        } = req.body;

        const profile = await prisma.profile.update({
            where: { userId: req.userId },
            data: {
                fullName,
                birthDate: birthDate ? new Date(birthDate) : undefined,
                education,
                location,
                desiredRole,
                desiredLocation,
            },
        });

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
