


import api from './apiConfig';

export const getTicketTracesForUser = async (userId) => {
    try {
        // Validate user ID
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid user ID');
        }

        // Send request with UserId as query parameter
        const response = await api.get('/TicketTrace/GetAllTicketTraceForUser', {
            params: { UserId: userId }
        });

        // Process response in standard format
        if (response.data && response.data.Result) {
            return {
                success: true,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to fetch ticket traces for user');
        }
    } catch (error) {
        console.error(`Error fetching traces for user ${userId}:`, error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to fetch ticket traces for user');
    }
};


// ����� ��� ����� ������� �� ������� (�� ����� ��������)



// ����� ��� ��� ����� ������� �� �������




export const addTicketTrace = async (traceData) => {
    try {
        
        const formData = new FormData();
        formData.append('TicketId', traceData.ticketId);
        formData.append('StatusID', traceData.statusId);
        formData.append('Note', traceData.note);
        formData.append('UserId', traceData.userId);

        const response = await api.post('/TicketTrace/InsertTicketTrace', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        
        return response.data;
    } catch (error) {
        console.error('Error creating tickettrace:', error);
        throw error;
    }

 
};

//export const getTicketTracesForTicket = async (ticketId) => {
//    try {
//        const response = await api.get('/TicketTrace/GetAllTicketTraceForTicket', {
//            params: { Id: ticketId }
//        });
//        return response.data;
//    } catch (error) {
//        throw error;
//    }
//};































































//export const addTicketTrace = async (traceData) => {
//    try {
//        // ������ �� �������� ��������
//        if (!traceData.ticketId || !traceData.statusId || !traceData.userId) {
//            throw new Error('������ ������ �������� ��� ������');
//        }

//        const payload = {
//            TicketId: traceData.ticketId,
//            StatusID: traceData.statusId,
//            Note: traceData.note || '', // �������� ��������
//            UserId: traceData.userId
//            // �� ����� ������ CreateTime � UpdateTime ����� ������ �� �������
//        };

//        const response = await api.post('/TicketTrace/InsertTicketTrace', payload);

//        if (response.data && response.data.Result) {
//            return {
//                success: true,
//                data: response.data.Data,
//                message: response.data.Message
//            };
//        } else {
//            throw new Error(response.data?.Message || 'Failed to add ticket trace');
//        }
//    }
//    catch (error) {
//        console.error('Error adding ticket trace:', error);

//        // ����� ��� ����� (��������� �� ����� ��� ������ ���)
//        const errorMessage = error.response?.data?.Message
//            || error.message
//            || 'Failed to add ticket trace';
//        throw new Error(errorMessage);

//    }
//};

 //        ������ ��� ���� ������� ������ ������
 //   * @param { number } ticketId - ���� �������
 //       * @returns { Promise < { success: boolean, data: Array, message: string } >}
 //* /
export const getTicketTracesForTicket = async (ticketId) => {
    try {
        if (!ticketId || isNaN(ticketId)) {
            throw new Error(' Id Not Valid  ');
        }

        const response = await api.get('/TicketTrace/GetAllTicketTraceForTicket', {
            params: { id: ticketId }
        });

        if (response.data && response.data.Result) {
            return {
                success: true,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to fetch ticket traces');
        }
    } catch (error) {
        console.error(`Error fetching traces for ticket ${ticketId}:`, error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to fetch ticket traces');
    }
};

///**
// * ����� ���� ���� �������
// * @param {object} traceData - ������ ������
// * @param {number} traceData.ticketId - ���� �������
// * @param {number} traceData.statusId - ���� ������
// * @param {string} traceData.note - ��������
// * @param {string} traceData.userId - ���� ��������
// * @returns {Promise<{success: boolean, data: object, message: string}>}
//export const addTicketTrace = async (traceData) => {
//    try {
//        // ������ �� �������� ��������
//        if (!traceData.ticketId || !traceData.statusId || !traceData.userId) {
//            throw new Error('������ ������ �������� ��� ������');
//        }

//        const payload = {
//            TicketId: traceData.ticketId,
//            StatusID: traceData.statusId,
//            Note: traceData.note || '',
//            UserId: traceData.userId  // ����� ��� ��� �� ����� �� �������
//        };

//        const response = await api.post('/TicketTrace/InsertTicketTrace', payload);

//        // ����� ������ ��������� ������� �� �������
//        if (response.data || response.data.Result) {
//            return {
//                success: true,
//                data: response.data.Data,
//                message: response.data.Message
//            };
//        } else {
//            // ������ ������� ����� ��� �����
//            const errorMessage = response.data?.Message ||
//                response.data?.Errors?.[0] ||
//                '��� ����� ���� �������';
//            throw new Error(errorMessage);
//        }
//    }
//    catch (error) {
//        console.error('Error adding ticket trace:', error);

//        // ����� ��� �����
//        const errorMessage = error.response?.data?.Message
//            || error.message
//            || '��� ����� ���� �������. ���� �������� ��� ����.';

//        throw new Error(errorMessage);
//    }
//};
// src/api/traces.js



//import api from './apiConfig';
/**
// * ������ ��� ���� ������� �������� ������ �����
 //* @param {string} userId - ���� ��������
 //* @returns {Promise<{success: boolean, data: Array, message: string}>}
// */
//export const getTicketTracesForUser = async (userId) => {
//    try {
//        // ������ �� ��� ���� ��������
//        if (!userId || typeof userId !== 'string') {
//            throw new Error('���� �������� ��� ����');
//        }

//        // ����� ����� �� ����� UserId �� query string
//        const response = await api.get('/TicketTrace/GetAllTicketTraceForUser', {
//            params: { UserId: userId }
//        });

//        // ������ ��������� ���� �����
//        if (response.data && response.data.Result) {
//            return {
//                success: true,
//                data: response.data.Data,
//                message: response.data.Message
//            };
//        } else {
//            throw new Error(response.data?.Message || '��� ��� ���� ������� ��������');
//        }
//    } catch (error) {
//        console.error(`Error fetching traces for user ${userId}:`, error);
//        throw new Error(error.response?.data?.Message || error.message || '��� ��� ���� ������� ��������');
//    }
//};// src/api/ticketTraceService.js