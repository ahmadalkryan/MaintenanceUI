import React from 'react';

const StatsCard = ({ title, value, color = 'blue', loading = false }) => {
    const colorClasses = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
        green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' },
        red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' },
    };

    const { bg, text, border } = colorClasses[color] || colorClasses.blue;

    return (
        <div className={`bg-white rounded-lg shadow p-4 border-l-4 ${border}`}>
            <div className="text-gray-500 text-sm">{title}</div>
            {loading ? (
                <div className="h-8 w-3/4 mt-2 bg-gray-200 rounded animate-pulse"></div>
            ) : (
                <div className={`text-2xl font-bold ${text}`}>{value}</div>
            )}
        </div>
    );
};

export default StatsCard;