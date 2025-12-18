const express = require("express");
const prisma = require("../../db/prisma");
const auth = require("../../middleware/auth");

const router = express.Router();

/**
 * POST /profile/skills
 * Add a skill
 */
router.post("/", auth, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Skill name required" });
    }

    const profile = await prisma.profile.findUnique({
        where: { userId: req.userId },
    });

    if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
    }

    const skill = await prisma.skill.create({
        data: {
            name,
            profileId: profile.id,
        },
    });

    res.status(201).json(skill);
});

/**
 * DELETE /profile/skills/:id
 */
router.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;

    await prisma.skill.delete({
        where: { id },
    });

    res.json({ success: true });
});

module.exports = router;
