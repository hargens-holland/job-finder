const express = require("express");
const prisma = require("../../db/prisma");
const auth = require("../../middleware/auth");

const router = express.Router();

/**
 * POST /profile/activities
 */
router.post("/", auth, async (req, res) => {
    const { name, role, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Activity name required" });
    }

    const profile = await prisma.profile.findUnique({
        where: { userId: req.userId },
    });

    const activity = await prisma.activity.create({
        data: {
            name,
            role,
            description,
            profileId: profile.id,
        },
    });

    res.status(201).json(activity);
});

/**
 * DELETE /profile/activities/:id
 */
router.delete("/:id", auth, async (req, res) => {
    await prisma.activity.delete({
        where: { id: req.params.id },
    });

    res.json({ success: true });
});

module.exports = router;
