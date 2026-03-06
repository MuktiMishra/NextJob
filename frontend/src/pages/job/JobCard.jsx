import {useNavigate} from 'react-router-dom'
function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}



const typeColors = {
  "Full-time": "bg-emerald-100 text-emerald-700",
  "Hybrid": "bg-blue-100 text-blue-700",
  "On-site": "bg-orange-100 text-orange-700",
  "Contract": "bg-purple-100 text-purple-700",
};

export default function JobCard({ job }) {
  const initials = job.company?.name?.slice(0, 2).toUpperCase() || "??";
    const navigate = useNavigate(); 

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{job.company?.name}</p>
            <p className="text-xs text-gray-400">{timeAgo(job.createdAt)}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${typeColors[job.type] || "bg-gray-100 text-gray-600"}`}>
          {job.type}
        </span>
      </div>

      <div>
        <h3 className="text-base font-bold text-gray-900 mb-1">{job.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{job.description}</p>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary}
          </span>
        </div>
        <button onClick={() => navigate(`/job/${job._id}`)} className="text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 px-4 py-1.5 rounded-lg transition-colors">
          Apply →
        </button>
      </div>
    </div>
  );
}
