/**
 * Compute a match score between a user profile and a job
 * This is intentionally simple and explainable
 */

function matchJob(profile, job) {
    let score = 0;

    // Normalize strings
    const normalize = (str) => str.toLowerCase();

    // --------------------
    // Skill matching
    // --------------------
    if (profile.skills && job.skills) {
        const profileSkills = profile.skills.map((s) =>
            normalize(s.name || s)
        );
        const jobSkills = job.skills.map(normalize);

        for (const skill of profileSkills) {
            if (jobSkills.includes(skill)) {
                score += 10;
            }
        }
    }

    // --------------------
    // Role match
    // --------------------
    if (profile.desiredRole) {
        const role = normalize(profile.desiredRole);
        const title = normalize(job.title);

        if (title.includes(role)) {
            score += 20;
        }
    }

    // --------------------
    // Location match
    // --------------------
    if (
        profile.desiredLocation &&
        job.location &&
        normalize(profile.desiredLocation) === normalize(job.location)
    ) {
        score += 10;
    }

    return score;
}

module.exports = matchJob;
