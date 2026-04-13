import { useState, useEffect, useRef } from "react";
import JobCard from './JobCard.jsx'
import axios from 'axios'


function filterJobs(jobs, keyword) {
  if (!keyword.trim()) return jobs;
  const k = keyword.toLowerCase();
  return jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(k) ||
      j.description.toLowerCase().includes(k)
  );
}

export default function JobSearch() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedKeyword(keyword), 400);
    return () => clearTimeout(timerRef.current);
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(async () => {
      const res = await axios.get(`https://next-job-rho.vercel.app/api/v1/job/get?keyword=${debouncedKeyword}`, {withCredentials: true});
      if (res.status === 201 || res.status === 200) setJobs(res.data.jobs);
        console.log(debouncedKeyword)
      setJobs(filterJobs(res.data.jobs, debouncedKeyword));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [debouncedKeyword]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Find your next role
          </h1>
          <p className="text-gray-400 text-sm">Search across thousands of open positions</p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {loading ? (
              <svg className="w-4 h-4 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            )}
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent shadow-sm transition"
          />
          {keyword && (
            <button
              onClick={() => setKeyword("")}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">
            {loading ? "Searching..." : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} found`}
          </p>
          {debouncedKeyword && !loading && (
            <p className="text-sm text-gray-400">
              Results for <span className="font-medium text-gray-700">"{debouncedKeyword}"</span>
            </p>
          )}
        </div>

        {!loading && jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">No jobs match your search</p>
            <p className="text-xs mt-1">Try different keywords</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
