import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const DonationRequestsChart = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [view, setView] = useState('daily'); 

    useEffect(() => {
        axiosSecure.get("/get-blood-donation-requests-info")
            .then((res) => {
                setRequests(res.data);
                processData(res.data, 'daily');
            });
    }, [axiosSecure]);

    useEffect(() => {
        if(requests.length > 0){
            processData(requests, view);
        }
    }, [view, requests]);

    const processData = (data, timeView) => {
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.donationDate || a.date); 
            const dateB = new Date(b.donationDate || b.date);
            return dateA - dateB;
        });

        const groupedMap = new Map();

        sortedData.forEach(item => {
            const date = new Date(item.donationDate || item.date);
            let key;

            if (timeView === 'daily') {
                key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            } else if (timeView === 'weekly') {
                const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
                const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
                const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
                key = `Week ${weekNum}`;
            } else if (timeView === 'monthly') {
                key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            }

            if (groupedMap.has(key)) {
                groupedMap.set(key, groupedMap.get(key) + 1);
            } else {
                groupedMap.set(key, 1);
            }
        });

        const formattedData = Array.from(groupedMap, ([name, count]) => ({
            name: name,
            requests: count
        }));

        setChartData(formattedData);
    };

    return (
        <div className="mt-8 p-6 bg-base-100 shadow-xl rounded-box">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Donation Request Chart</h3>
                
                <div className="join">
                    <button 
                        className={`btn btn-sm join-item ${view === 'daily' ? 'btn-primary' : ''}`}
                        onClick={() => setView('daily')}
                    >
                        Daily
                    </button>
                    <button 
                        className={`btn btn-sm join-item ${view === 'weekly' ? 'btn-primary' : ''}`}
                        onClick={() => setView('weekly')}
                    >
                        Weekly
                    </button>
                    <button 
                        className={`btn btn-sm join-item ${view === 'monthly' ? 'btn-primary' : ''}`}
                        onClick={() => setView('monthly')}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} /> 
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="requests" fill="#ef4444" name="Blood Requests" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DonationRequestsChart;