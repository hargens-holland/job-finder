const express = require("express");
const prisma = require("../../db/prisma");
const auth = require("../../middleware/auth");

const router = express.Router();

/**
 * POST /profile/projects
 */
router.post("/", auth, async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description required" });
    }

    const profile = await prisma.profile.findUnique({
        where: { userId: req.userId },
    });

    const project = await prisma.project.create({
        data: {
            title,
            description,
            profileId: profile.id,
        },
    });

    res.status(201).json(project);
});

/**
 * DELETE /profile/projects/:id
 */
router.delete("/:id", auth, async (req, res) => {
    await prisma.project.delete({
        where: { id: req.params.id },
    });

    res.json({ success: true });
});

module.exports = router;
