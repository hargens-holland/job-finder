const express = require("express");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const profileRoutes = require("./routes/profile");
const skillRoutes = require("./routes/profile/skills");
const projectRoutes = require("./routes/profile/projects");
const experienceRoutes = require("./routes/profile/experience");
const activityRoutes = require("./routes/profile/activities");
const applicationRoutes = require("./routes/applications");
const jobsRoutes = require("./routes/jobs");
const meRoutes = require("./routes/me");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

// ✅ API ROUTES (NOTE THE LEADING /)
app.use("/api/jobs", jobsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/profile/skills", skillRoutes);
app.use("/api/profile/projects", projectRoutes);
app.use("/api/profile/experience", experienceRoutes);
app.use("/api/profile/activities", activityRoutes);
app.use("/api/me", meRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/protected", auth, (req, res) => {
    res.json({ message: "You are authenticated", userId: req.userId });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
