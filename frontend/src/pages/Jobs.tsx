import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    skills: string[];
    matchScore?: number;
};

export default function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    const handleApply = async (jobId: string) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ jobId }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 409) {
                    setError(errorData.error || "You have already applied to this job");
                } else {
                    setError(errorData.error || "Failed to apply to job");
                }
                return;
            }

            // Refetch jobs from backend to get updated list (backend excludes applied jobs)
            const jobsResponse = await fetch("/api/jobs/matched", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (jobsResponse.ok) {
                const updatedJobs = await jobsResponse.json();
                setJobs(updatedJobs);
            } else {
                // Fallback: remove from list if refetch fails
                setJobs((prev) => prev.filter((job) => job.id !== jobId));
            }

            setError(null); // Clear any previous errors
        } catch (err) {
            setError("Network error. Please try again.");
        }
    };


    useEffect(() => {
        fetch("/api/jobs/matched", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch jobs");
                }
                return res.json();
            })
            .then((data: Job[]) => {
                setJobs(data);
                setError(null); // Clear any previous errors on successful load
            })
            .catch(() => {
                setError("Could not load jobs");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-6">Loading jobs...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="ml-2 text-red-500 hover:text-red-700 underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {jobs.length === 0 ? (
                <p>No jobs available.</p>
            ) : (
                jobs.map((job) => <JobCard key={job.id} job={job} onApply={handleApply} />)
            )}
        </div>
    );
}
