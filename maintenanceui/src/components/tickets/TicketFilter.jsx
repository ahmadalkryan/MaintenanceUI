import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const TicketFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        ticketNumber: '',
        status: '',
        dateRange: null
    });

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const handleChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedFilters = {
            ...filters,
            startDate: filters.dateRange?.[0]?.format('YYYY-MM-DD'),
            endDate: filters.dateRange?.[1]?.format('YYYY-MM-DD')
        };

        onFilter(formattedFilters);
    };

    const handleReset = () => {
        setFilters({
            ticketNumber: '',
            status: '',
            dateRange: null
        });
        onFilter({});
        setMobileFilterOpen(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1"> Ticket Number</label>
                        <input
                            type="text"
                            value={filters.ticketNumber}
                            onChange={(e) => handleChange('ticketNumber', e.target.value)}
                            placeholder="search by number..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">status</label>
                        <Select
                            value={filters.status}
                            onChange={(value) => handleChange('status', value)}
                            className="w-full"
                            placeholder=" All "
                            options={[
                                { value: '', label: ' All' },
                                { value: 'New', label: 'New' },
                                { value: 'Pending', label: 'Pending ' },
                                { value: 'Complete', label: 'Complete' },
                                { value: 'Refund', label: 'Refund' }
                            ]}
                        />
                    </div>

                    <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1"> Period </label>
                        <RangePicker
                            value={filters.dateRange}
                            onChange={(dates) => handleChange('dateRange', dates)}
                            className="w-full"
                            format="YYYY-MM-DD"
                        />
                    </div>

                    <div className="md:col-span-1 flex items-end">
                        <div className="flex space-x-2 w-full">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                               Reset
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                               Filter
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default TicketFilter;