type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    skills: string[];
    matchScore?: number;
};

type JobCardProps = {
    job: Job;
    onApply: (jobId: string) => void;
};

export default function JobCard({ job, onApply }: JobCardProps) {
    return (
        <div className="border rounded p-4 mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-sm text-gray-600">
                        {job.company} — {job.location}
                    </p>
                </div>

                {job.matchScore !== undefined && (
                    <span className="text-sm font-semibold text-green-600">
                        {job.matchScore}%
                    </span>
                )}
            </div>

            <button
                onClick={() => onApply(job.id)}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Apply
            </button>
        </div>
    );
}

