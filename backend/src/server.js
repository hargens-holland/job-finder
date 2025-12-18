const express = require('express');
const authRoutes = require('./routes/auth');
const auth = require("./middleware/auth");
const profileRoutes = require("./routes/profile");
const skillRoutes = require("./routes/profile/skills");
const projectRoutes = require("./routes/profile/projects");
const experienceRoutes = require("./routes/profile/experience");
const activityRoutes = require("./routes/profile/activities");
const meRoutes = require("./routes/me");


const app = express();
const port = 3001;

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/protected", auth, (req, res) => {
    res.json({ message: "You are authenticated", userId: req.userId });
});

app.use("/profile", profileRoutes);

app.use("/profile/skills", skillRoutes);
app.use("/profile/projects", projectRoutes);
app.use("/profile/experience", experienceRoutes);
app.use("/profile/activities", activityRoutes);

app.use("/me", meRoutes);
