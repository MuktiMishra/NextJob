import React from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios'

const STATUS_OPTIONS = ['pending', 'accepted', 'rejected'];

const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
        case 'accepted': return 'text-green-700 bg-green-100 border-green-300';
        case 'rejected': return 'text-red-700 bg-red-100 border-red-300';
        default: return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    }
}

const ReviewJob = () => {
    const location = useLocation();
    const [job] = React.useState(location.state)
    const [applicants, setApplicants] = React.useState([])
    const [updatingStatus, setUpdatingStatus] = React.useState(null)

    React.useEffect(() => {
        const getApplicants = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/application/${job._id}/applicants`, {withCredentials: true})
                if (response.status === 200 || response.status === 201) {
                    return setApplicants(response.data.job.applications)
                }
            } catch (err) {
                alert('failed to find applicants')
            }
        }
        getApplicants();
    }, [])

    const handleStatusChange = async (applicationId, newStatus) => {
        setUpdatingStatus(applicationId);
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/application/status/${applicationId}/update`,
                { status: newStatus },
                { withCredentials: true }
            );
            if (response.status === 200 || response.status === 201) {
                setApplicants(prev => prev.map(app =>
                    app._id === applicationId ? { ...app, status: newStatus } : app
                ));
            }
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setUpdatingStatus(null);
        }
    }

    return (
        <div className="min-h-screen bg-[#F6F7F8]">
            <div className="max-w-7xl mx-auto pt-20 px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-2">
                    <p className="text-4xl text-black font-bold">Manage Applicants: {job.title}</p>
                    <p className="text-md text-gray-400">Manage and evaluate {job.applications.length || 0} applicants for this job</p>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <table className="grow outline outline-1 outline-gray-400 border-collapse rounded-t-xl overflow-hidden">
                        <thead className="text-gray-500 text-md bg-gray-200 tracking-tighter border-b border-gray-400">
                            <tr>
                                <th className="px-4 py-3 uppercase tracking-wide">Candidate</th>
                                <th className="px-4 py-3 uppercase tracking-wide">Status</th>
                                <th className="px-4 py-3 uppercase tracking-wide">Applied Date</th>
                                <th className="px-4 py-3 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-black text-md bg-white">
                            {applicants.length > 0 ? applicants.map((item) => (
                                <tr key={item._id} className="border-b text-center border-gray-200 last:border-0">
                                    <td className="px-4 py-3 font-medium">{item.applicant.fullname}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusStyle(item.status)}`}>
                                            {item.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{item.createdAt.split('T')[0]}</td>
                                    <td className="px-4 py-3">
                                        <select
                                            defaultValue={item.status || 'pending'}
                                            disabled={updatingStatus === item._id}
                                            onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                            className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                                        >
                                            {STATUS_OPTIONS.map(s => (
                                                <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-400">No applicants yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReviewJob;
