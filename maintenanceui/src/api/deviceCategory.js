

import api from './apiConfig';

/**
 * ÇáÍÕæá Úáì ÌãíÚ İÆÇÊ ÇáÃÌåÒÉ
 * @returns {Promise<{success: boolean, data: Array, message: string}>}
 */
export const getAllDeviceCategories = async () => {
    try {
        const response = await api.get('/DeviceCategory/GetAllDeviceCategory');

        if (response.data && response.data.Result) {
            return {
                success: true,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to fetch device categories');
        }
    } catch (error) {
        console.error('Error fetching all device categories:', error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to fetch device categories');
    }
};

/**
 * ÇáÍÕæá Úáì İÆÉ ÌåÇÒ ÈæÇÓØÉ ÇáãÚÑİ
 * @param {number} id - ãÚÑİ İÆÉ ÇáÌåÇÒ
 * @returns {Promise<{success: boolean, data: object, message: string}>}
 */
export const getCategoryById = async (id) => {
    try {
        if (!id || isNaN(id)) {
            throw new Error('   Invalid Id ');
        }

        const response = await api.get('/DeviceCategory/GetDeviceCategoryById', {
            params: { Id: id }
        });

        if (response.data && response.data.Result) {
            return {
                success: true,
                data: response.data.Data,
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to fetch category by ID');
        }
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to fetch category by ID');
    }
};



export const createDeoceCategory = async (device) => {
    try {
        // ÅÚÏÇÏ ÇáÈíÇäÇÊ ÇáãÑÓáÉ ÈÔßá íÊæÇİŞ ãÚ ÇáÈÇß ÅäÏ
        const requestData = {
            CategoryName: device.name,
            Abbreviation: device.abbreviation
            
        };

        const response = await api.post('/DeviceCategory/CreateDeviceCategory', requestData);

        if (response.data && response.data.Result) {
            return {
                success: true,
                data: response.data?.Data || [],
                message: response.data.Message
            };
        } else {
            throw new Error(response.data?.Message || 'Failed to Create device ');
        }
    } catch (error) {
        console.error('Error create device:', error);
        throw new Error(error.response?.data?.Message || error.message || 'Failed to create device');
    }
};

            