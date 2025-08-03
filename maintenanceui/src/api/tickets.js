
//  ���� �� promise maybe {Result , Data , Message}

import api from './apiConfig';

/**
 * ������ ��� ���� �������
 * @returns {Promise<<{Result: boolean, data: Array, message: string}>}
 */
export const getAllTickets = async () => {
    try {
        const response = await api.get('/Ticket/GetAllTickets');

        if (response.data && typeof response.data.Result !== 'undefined') { 
            return {
                success: response.data.Result,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to fetch tickets');
        }
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to fetch tickets');
    }
};

/**
 * ������ ��� ����� ������ ������
 * @param {number} id - ���� �������
 * @returns {Promise<{success: boolean, data: object, message: string}>}
 */
export const getTicketById = async (id) => {
    try {
        if (!id || isNaN(id)) {
            throw new Error('���� ������� ��� ����');
        }

        const response = await api.get('/Ticket/GetTicketById', {
            params: { id }
        });

        if (response.data && response.data.Success) {
            return {
                success: true,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to fetch ticket');
        }
    } catch (error) {
        console.error(`Error fetching ticket with ID ${id}:`, error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to fetch ticket');
    }
};

/**
 * ����� �������
 * @param {object} updateData - ������ �������
 * @returns {Promise<{success: boolean, data: object, message: string}>}
 */
export const updateTicket = async (updateData) => {
    try {
        if (!updateData || !updateData.id) {
            throw new Error('������ ������� ��� �����');
        }

        const response = await api.put('/Ticket/UpdateTicket', updateData);

        if (response.data && response.data.Success) {
            return {
                success: true,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to update ticket');
        }
    } catch (error) {
        console.error('Error updating ticket:', error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to update ticket');
    }
};


export const createTicket = async (ticketData) => {
    try {
        console.log("Sending ticket data:", ticketData);
        const formData = new FormData();
        formData.append('Description', ticketData.description);

        // ����� ��� ����� ������� �� ������� (�� ����� ��������)
        formData.append('DeciveCategoryId', ticketData.deviceCategoryId);


        // ����� ��� ��� ����� ������� �� �������
        if (ticketData.ImageFile) {
            formData.append('ImageFile', ticketData.ImageFile); // ����� AttachmentPath ��� ImageFile
        }

        const response = await api.post('/Ticket/InsertTicket', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};






//export const filterTickets = async (filters) => {
//    try {
//        const response = await api.post('/Ticket/FilterTicket', filters); // ��� get ��� post

//        if (response.data && response.data.Result) {
//            return {
//                success: true,
//                data: response.data.Data,
//                message: response.data.Message
//            };
//        } else {
//            throw new Error(response.data?.Message || 'Failed to filter tickets');
//        }
//    } catch (error) {
//        console.error('Error filtering tickets:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'Failed to filter tickets');
//    }
//};

export const filterTickets = async (filters) => {
    try {
        // ����� �������� ������� ���� ������ �� ����� ���
        const requestData = {
            TicketNumber: filters.ticketNumber || null,
            CreatedDate: filters.startDate || null,
            DeciveCategoryId: filters.deviceCategoryId || null
        };

        const response = await api.post('/Ticket/FilterTicket', requestData);

        if (response.data && response.data.Result) {
            return {
                success: true,
                data: response.data?.Data|| [] ,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to filter tickets');
        }
    } catch (error) {
        console.error('Error filtering tickets:', error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to filter tickets');
    }
};
//export const filterTickets = async (filters) => {
//    try {
//        const response = await api.get('/Ticket/FilterTicket', {
//            params: filters
//        });

//        // ������ �� ���� data ��� �� ���� �����
//        return {
//            success: true,
//            data: response.data?.Data || [], // ������ ����� ��� ���� Data ��� ������
//            message: response.data?.Message || ''
//        };
//    } catch (error) {
//        console.error('Error filtering tickets:', error);
//        return {
//            success: false,
//            data: [], // ������ ����� �� ���� �����
//            message: error.response?.data?.Message || error.message || 'Failed to filter tickets'
//        };
//    }
//};




/**
 * ����� ������� ��� �������
 * @param {object} dateFilters - ����� ����� �������
 * @param {Date|string} dateFilters.startDate - ����� �������
 * @param {Date|string} dateFilters.endDate - ����� �������
 * @returns {Promise<{success: boolean, data: Array, message: string}>}
 */
export const filterTicketsByDate = async (dateFilters) => {
    try {
        if (!dateFilters.startDate || !dateFilters.endDate) {
            throw new Error('����� ������� �������� �������');
        }

        const params = {

            startDate: dateFilters.startDate,
            //startDate: dateFilters.startDate instanceof Date
            //    ? dateFilters.startDate.toISOString()
            //    : dateFilters.startDate,
            endDate: dateFilters.endDate
            //endDate: dateFilters.endDate instanceof Date
            //    ? dateFilters.endDate.toISOString()
            //    : dateFilters.endDate
        };

        const response = await api.get('/Ticket/FilterTicketByDate', {
            params
        });

        if (response.data && response.data.Result) {
            return {
                success: true,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to filter tickets by date');
        }
    } catch (error) {
        console.error('Error filtering tickets by date:', error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to filter tickets by date');
    }
};

/**
 * ������ ��� �������� �������
 * @returns {Promise<{success: boolean, data: object, message: string}>}
 */
export const getTicketStatistics = async () => {
    try {
        const response = await api.get('/Ticket/TicketStatistics');

        if (response.data && response.data.Result) {
            return {
                success: true,
                data: {
                    totalTickets: response.data.Data.TotalTickets,
                    pendingTickets: response.data.Data.PendingTickets,
                    completeTickets: response.data.Data.CompleteTickets,
                    refundTickets: response.data.Data.refundTickets,
                    newTickets: response.data.Data.NewTickets
                },
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to fetch ticket statistics');
        }
    } catch (error) {
        console.error('Error fetching ticket statistics:', error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to fetch ticket statistics');
    }
};




export const mapStatusToValue = (status) => {
    const statusMap = {
        'New': 0,
        'Pending': 1,
        'Complete': 2,
        'Refund': 3
    };
    return statusMap[status] || 0;
};




export const mapTicketStatus = (statusId) => {
    const statusMap = {
        1: 'New',
        2: 'Pending', // �� ����� ����� �������� ���
        3: 'Complete',
        4: 'Refund'
    };
    return statusMap[statusId] || 'Unknown';
};




























//import api from './apiConfig';


//export const getAllTickets = async () => {
//    const response = await api.get('/Ticket/GetAllTickets');
//    return response.data;
//};

//export const getTicketById = async (id) => {
//    const response = await api.get('/Ticket/GetTicketById', {
//        params: { id }
//    });
//    return response.data;
//};

//export const updateTicket = async (updateData) => {
//    const response = await api.put('/Ticket/UpdateTicket', updateData);
//    return response.data;
//};




//export const createTicket = async (ticketData) => {
//    const formData = new FormData();

//    // ����� ������ ���������
//    formData.append('Description', ticketData.description);
//    formData.append('DeviceCategoryId', ticketData.deviceCategoryId);

//    // ����� ������ ����������
//    if (ticketData.deviceId) formData.append('DeviceId', ticketData.deviceId);
//    if (ticketData.attachment) formData.append('Attachment', ticketData.attachment);

//    const response = await api.post('/Ticket/InsertTicket', formData, {
//        headers: {
//            'Content-Type': 'multipart/form-data',
//        },
//    });
//    return response.data;
//};


//export const filterTickets = async (filters) => {
//    // ����� ������ ��� ������� ������ ��� ���� ����
//    if (filters._status && typeof filters._status === 'string') {
//        const statusMap = {
//            'New': 0,
//            'Pending': 1,
//            'Complete': 2,
//            'Refund': 3
//        };
//        filters._status = statusMap[filters._status];
//    }

//    // ����� ������� ��� ���� ISO ��� ��� ���� Date
//    if (filters.CreatedDate instanceof Date) {
//        filters.CreatedDate = filters.CreatedDate.toISOString();
//    }

//    const response = await api.get('/Ticket/FilterTicket', {
//        params: filters
//    });
//    return response.data;
//};

//export const filterTicketsByDate = async (dateFilters) => {
//    // ������ �� ���� �������� �������� ��� ISO
//    const params = {};

//    if (dateFilters.startDate) {
//        params.startDate = dateFilters.startDate instanceof Date
//            ? dateFilters.startDate.toISOString()
//            : dateFilters.startDate;
//    }

//    if (dateFilters.endDate) {
//        params.endDate = dateFilters.endDate instanceof Date
//            ? dateFilters.endDate.toISOString()
//            : dateFilters.endDate;
//    }

//    const response = await api.get('/Ticket/FilterTicketByDate', {
//        params
//    });
//    return response.data;
//};
//export const getTicketStatistics = async () => {
//    const response = await api.get('/Ticket/TicketStatistics');
//    return {
//        totalTickets: response.data.TotalTickets,
//        pendingTickets: response.data.PendingTickets,
//        completeTickets: response.data.CompleteTickets,
//        refundTickets: response.data.refundTickets
//    };
//};


//export const mapTicketStatus = (status) => {
//    const statusMap = {
//        0: 'New',
//        1: 'Pending',
//        2: 'Complete',
//        3: 'Refund'
//    };
//    return statusMap[status] || 'Unknown';
//};

//export const mapStatusToValue = (status) => {
//    const statusMap = {
//        'New': 0,
//        'Pending': 1,
//        'Complete': 2,
//        'Refund': 3
//    };
//    return statusMap[status] || 0;
//};


//export const createTicket = async (ticketData) => {
//    try {
//        if (!ticketData.description || !ticketData.deviceCategoryId) {
//            throw new Error('����� ����� ��� ������ �������');
//        }

//        const formData = new FormData();
//        formData.append('Description', ticketData.description);
//        formData.append('DeviceCategoryId', ticketData.deviceCategoryId);//DeviceCategoryId

//        if (ticketData.deviceId) {
//            formData.append('DeviceId', ticketData.deviceId);
//        }

//        if (ticketData.attachment) {
//            formData.append('Attachment', ticketData.attachment);
//        }

//        const response = await api.post('/Ticket/InsertTicket', formData, {
//            headers: {
//                'Content-Type': 'multipart/form-data',
//            },
//        });

//        if (response.data && response.data.Success) {
//            return {
//                success: true,
//                data: response.data.Data,
//                message: response.data.Message
//            };
//        } else {
//            throw new Error(response.data?.Message || 'Failed to create ticket');
//        }
//    } catch (error) {
//        console.error('Error creating ticket:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'Failed to create ticket');
//    }
//};