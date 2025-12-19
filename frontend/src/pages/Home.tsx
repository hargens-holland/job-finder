import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type OverviewResponse = {
    hasProfile: boolean;
};

export default function Home() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasProfile, setHasProfile] = useState<boolean>(false);
    const [stats, setStats] = useState<{
        jobsApplied: number;
        activeApplications: number;
        matchesAvailable: number | null;
    } | null>(null);


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }

        fetch("/api/me/overview", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to load overview");
                }
                return res.json();
            })
            .then((data: OverviewResponse) => {
                setHasProfile(data.hasProfile);

                // 🔽 ADD THIS BLOCK
                fetch("/api/me/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((statsData) => {
                        setStats(statsData);
                    });
            })

            .catch(() => {
                setError("Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    if (!hasProfile) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-semibold">
                    Please complete signup to continue
                </h1>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Welcome */}
            <h1 className="text-2xl font-bold mb-6">Welcome 👋</h1>

            {/* Notifications */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Notifications</h2>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                    <p className="text-sm text-yellow-800">
                        You haven’t applied to any jobs yet. Start by finding jobs that match
                        your profile.
                    </p>
                </div>
            </div>

            {/* Find Jobs */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Find Jobs</h2>

                <div className="border rounded p-6 flex items-center justify-between">
                    <p className="text-gray-600">
                        Browse job opportunities matched to your profile.
                    </p>

                    <button
                        onClick={() => navigate("/jobs")}
                        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Find Jobs
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Your Progress</h2>

                <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded p-4 text-center">
                        <p className="text-2xl font-bold">
                            {stats ? stats.jobsApplied : "—"}
                        </p>
                        <p className="text-sm text-gray-600">Jobs Applied</p>
                    </div>

                    <div className="border rounded p-4 text-center">
                        <p className="text-2xl font-bold">
                            {stats ? stats.activeApplications : "—"}
                        </p>
                        <p className="text-sm text-gray-600">Active Applications</p>
                    </div>

                    <div className="border rounded p-4 text-center">
                        <p className="text-2xl font-bold">
                            {stats && stats.matchesAvailable !== null
                                ? stats.matchesAvailable
                                : "—"}
                        </p>
                        <p className="text-sm text-gray-600">Matches Available</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
