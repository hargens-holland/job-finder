const express = require("express");
const prisma = require("../../db/prisma");
const auth = require("../../middleware/auth");

const router = express.Router();

/**
 * POST /profile/experience
 */
router.post("/", auth, async (req, res) => {
    const { company, role, description, startDate, endDate } = req.body;

    if (!company || !role || !startDate) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const profile = await prisma.profile.findUnique({
        where: { userId: req.userId },
    });

    const experience = await prisma.experience.create({
        data: {
            company,
            role,
            description,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            profileId: profile.id,
        },
    });

    res.status(201).json(experience);
});

/**
 * DELETE /profile/experience/:id
 */
router.delete("/:id", auth, async (req, res) => {
    await prisma.experience.delete({
        where: { id: req.params.id },
    });

    res.json({ success: true });
});

module.exports = router;
