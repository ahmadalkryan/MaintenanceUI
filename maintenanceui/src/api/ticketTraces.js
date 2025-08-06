


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


// ÊÕÍíÍ ÇÓã ÇáÍŞá áíÊØÇÈŞ ãÚ ÇáÎáİíÉ (ãÚ ÇáÎØÃ ÇáÅãáÇÆí)



// ÊÕÍíÍ ÇÓã ÍŞá Çáãáİ áíÊØÇÈŞ ãÚ ÇáÎáİíÉ




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
//        // ÇáÊÍŞŞ ãä ÇáÈíÇäÇÊ ÇáãØáæÈÉ
//        if (!traceData.ticketId || !traceData.statusId || !traceData.userId) {
//            throw new Error('ÈíÇäÇÊ ÇáÊÊÈÚ ÇáãØáæÈÉ ÛíÑ ãßÊãáÉ');
//        }

//        const payload = {
//            TicketId: traceData.ticketId,
//            StatusID: traceData.statusId,
//            Note: traceData.note || '', // ÇáãáÇÍÙÉ ÇÎÊíÇÑíÉ
//            UserId: traceData.userId
//            // áÇ äÍÊÇÌ áÅÑÓÇá CreateTime æ UpdateTime áÃäåÇ ÊõÚÇáÌ İí ÇáÈÇßäÏ
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

//        // ÊÍÓíä ÚÑÖ ÇáÎØÃ (ÇáÇÓÊÌÇÈÉ ŞÏ ÊÍÊæí Úáì ÊİÇÕíá ÃÏŞ)
//        const errorMessage = error.response?.data?.Message
//            || error.message
//            || 'Failed to add ticket trace';
//        throw new Error(errorMessage);

//    }
//};

 //        ÇáÍÕæá Úáì ÊÊÈÚ ÇáÊĞßÑÉ ÈæÇÓØÉ ÇáãÚÑİ
 //   * @param { number } ticketId - ãÚÑİ ÇáÊĞßÑÉ
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
// * ÅÖÇİÉ ÊÊÈÚ ÌÏíÏ ááÊĞßÑÉ
// * @param {object} traceData - ÈíÇäÇÊ ÇáÊÊÈÚ
// * @param {number} traceData.ticketId - ãÚÑİ ÇáÊĞßÑÉ
// * @param {number} traceData.statusId - ãÚÑİ ÇáÍÇáÉ
// * @param {string} traceData.note - ÇáãáÇÍÙÉ
// * @param {string} traceData.userId - ãÚÑİ ÇáãÓÊÎÏã
// * @returns {Promise<{success: boolean, data: object, message: string}>}
//export const addTicketTrace = async (traceData) => {
//    try {
//        // ÇáÊÍŞŞ ãä ÇáÈíÇäÇÊ ÇáãØáæÈÉ
//        if (!traceData.ticketId || !traceData.statusId || !traceData.userId) {
//            throw new Error('ÈíÇäÇÊ ÇáÊÊÈÚ ÇáãØáæÈÉ ÛíÑ ãßÊãáÉ');
//        }

//        const payload = {
//            TicketId: traceData.ticketId,
//            StatusID: traceData.statusId,
//            Note: traceData.note || '',
//            UserId: traceData.userId  // ÅÑÓÇá ßäÕ ßãÇ åæ ãØáæÈ İí ÇáÈÇßäÏ
//        };

//        const response = await api.post('/TicketTrace/InsertTicketTrace', payload);

//        // ÊÍáíá åíßáíÉ ÇáÇÓÊÌÇÈÉ ÇáÕÍíÍÉ ãä ÇáÈÇßäÏ
//        if (response.data || response.data.Result) {
//            return {
//                success: true,
//                data: response.data.Data,
//                message: response.data.Message
//            };
//        } else {
//            // ãÍÇæáÉ ÇÓÊÎÑÇÌ ÑÓÇáÉ ÎØÃ ãİÕáÉ
//            const errorMessage = response.data?.Message ||
//                response.data?.Errors?.[0] ||
//                'İÔá ÅÖÇİÉ ÊÊÈÚ ÇáÊĞßÑÉ';
//            throw new Error(errorMessage);
//        }
//    }
//    catch (error) {
//        console.error('Error adding ticket trace:', error);

//        // ÊÍÓíä ÚÑÖ ÇáÎØÃ
//        const errorMessage = error.response?.data?.Message
//            || error.message
//            || 'İÔá ÅÖÇİÉ ÊÊÈÚ ÇáÊĞßÑÉ. íÑÌì ÇáãÍÇæáÉ ãÑÉ ÃÎÑì.';

//        throw new Error(errorMessage);
//    }
//};
// src/api/traces.js



//import api from './apiConfig';
/**
// * ÇáÍÕæá Úáì ÊÊÈÚ ÇáÊĞÇßÑ ááãÓÊÎÏã ÈæÇÓØÉ ãÚÑİå
 //* @param {string} userId - ãÚÑİ ÇáãÓÊÎÏã
 //* @returns {Promise<{success: boolean, data: Array, message: string}>}
// */
//export const getTicketTracesForUser = async (userId) => {
//    try {
//        // ÇáÊÍŞŞ ãä ÕÍÉ ãÚÑİ ÇáãÓÊÎÏã
//        if (!userId || typeof userId !== 'string') {
//            throw new Error('ãÚÑİ ÇáãÓÊÎÏã ÛíÑ ÕÇáÍ');
//        }

//        // ÅÑÓÇá ÇáØáÈ ãÚ ãÚáãÉ UserId İí query string
//        const response = await api.get('/TicketTrace/GetAllTicketTraceForUser', {
//            params: { UserId: userId }
//        });

//        // ãÚÇáÌÉ ÇáÇÓÊÌÇÈÉ ÈäİÓ ÇáäãØ
//        if (response.data && response.data.Result) {
//            return {
//                success: true,
//                data: response.data.Data,
//                message: response.data.Message
//            };
//        } else {
//            throw new Error(response.data?.Message || 'İÔá ÌáÈ ÊÊÈÚ ÇáÊĞÇßÑ ááãÓÊÎÏã');
//        }
//    } catch (error) {
//        console.error(`Error fetching traces for user ${userId}:`, error);
//        throw new Error(error.response?.data?.Message || error.message || 'İÔá ÌáÈ ÊÊÈÚ ÇáÊĞÇßÑ ááãÓÊÎÏã');
//    }
//};// src/api/ticketTraceService.js