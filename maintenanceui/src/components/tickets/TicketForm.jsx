






import React, { useState, useEffect } from 'react';

const TicketForm = ({ categories, onSubmit, isLoading, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);
    const [validationErrors, setValidationErrors] = useState({});
    const [fileName, setFileName] = useState('');

    // حل مشكلة SecurityError: إنشاء أنماط CSS بشكل آمن
    useEffect(() => {
        const styleId = 'spin-keyframes-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, attachment: file }));
            setFileName(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors({});

        // File validation
        if (formData.attachment) {
            const validTypes = [
                'image/jpeg', 'image/png',
                'application/pdf', 'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(formData.attachment.type)) {
                setValidationErrors({
                    attachment: 'Unsupported file type. Please upload JPG, PNG, PDF, or DOC files.'
                });
                return;
            }

            if (formData.attachment.size > maxSize) {
                setValidationErrors({
                    attachment: 'File size exceeds 5MB limit'
                });
                return;
            }
        }

        // Form validation
        const errors = {};
        if (!formData.description.trim()) errors.description = 'Problem description is required';
        if (!formData.deviceCategoryId) errors.deviceCategoryId = 'Device type is required';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles.container}>
            <div style={formStyles.formGroup}>
                <label style={formStyles.label}>
                    Problem Description <span style={formStyles.required}>*</span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the problem in detail..."
                    style={{
                        ...formStyles.input,
                        ...formStyles.textarea,
                        ...(validationErrors.description && formStyles.inputError)
                    }}
                />
                {validationErrors.description && (
                    <div style={formStyles.error}>{validationErrors.description}</div>
                )}
            </div>

            <div style={formStyles.formGroup}>
                <label style={formStyles.label}>
                    Device Type <span style={formStyles.required}>*</span>
                </label>
                <div style={formStyles.selectContainer}>
                    <select
                        name="deviceCategoryId"
                        value={formData.deviceCategoryId}
                        onChange={handleChange}
                        style={{
                            ...formStyles.input,
                            ...formStyles.select,
                            ...(validationErrors.deviceCategoryId && formStyles.inputError)
                        }}
                    >
                        <option value="">Select device type</option>
                        {categories.map(category => (
                            <option
                                key={category.id || category.Id}
                                value={category.id || category.Id}
                            >
                                {category.categoryName || category.CategoryName || category.name}
                            </option>
                        ))}
                    </select>
                    <div style={formStyles.selectArrow}>▼</div>
                </div>
                {validationErrors.deviceCategoryId && (
                    <div style={formStyles.error}>{validationErrors.deviceCategoryId}</div>
                )}
            </div>

            <div style={formStyles.formGroup}>
                <label style={formStyles.label}>Attachment (Optional)</label>
                <div style={formStyles.fileUploadContainer}>
                    <label style={formStyles.fileUploadButton}>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*,.pdf,.doc,.docx"
                        />
                        <span style={formStyles.uploadIcon}>📁</span>
                        Choose File
                    </label>
                    {fileName ? (
                        <div style={formStyles.fileName}>{fileName}</div>
                    ) : (
                        <div style={formStyles.filePlaceholder}>No file selected</div>
                    )}
                </div>
                {validationErrors.attachment && (
                    <div style={formStyles.error}>{validationErrors.attachment}</div>
                )}
                <div style={formStyles.fileHint}>Supported formats: JPG, PNG, PDF, DOC (max 5MB)</div>
            </div>

            <button
                type="submit"
                style={{
                    ...formStyles.submitButton,
                    ...(isLoading && formStyles.submitButtonDisabled)
                }}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span style={formStyles.buttonSpinner}></span>
                        Processing...
                    </>
                ) : (
                    'Create Maintenance Ticket'
                )}
            </button>
        </form>
    );
};

// Enhanced responsive form styles
const formStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#2c3e50',
        display: 'flex',
        alignItems: 'center'
    },
    required: {
        color: '#e74c3c',
        marginLeft: '4px'
    },
    input: {
        width: '100%',
        padding: '14px',
        border: '1px solid #dcdfe6',
        borderRadius: '8px',
        fontSize: '15px',
        backgroundColor: '#fff',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box'
    },
    inputError: {
        borderColor: '#e74c3c',
        backgroundColor: '#fdeded'
    },
    textarea: {
        minHeight: '120px',
        resize: 'vertical'
    },
    selectContainer: {
        position: 'relative'
    },
    select: {
        appearance: 'none',
        paddingRight: '40px'
    },
    selectArrow: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: '#7f8c8d'
    },
    fileUploadContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center'
    },
    fileUploadButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 18px',
        backgroundColor: '#f8f9fa',
        border: '1px dashed #cbd5e0',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        color: '#2c3e50',
        transition: 'all 0.2s ease'
    },
    uploadIcon: {
        fontSize: '16px'
    },
    fileName: {
        fontSize: '14px',
        color: '#3498db',
        fontWeight: '500',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '250px'
    },
    filePlaceholder: {
        fontSize: '14px',
        color: '#95a5a6',
        fontStyle: 'italic'
    },
    fileHint: {
        fontSize: '12px',
        color: '#95a5a6',
        marginTop: '4px'
    },
    error: {
        color: '#e74c3c',
        fontSize: '13px',
        fontWeight: '500',
        marginTop: '4px'
    },
    submitButton: {
        padding: '16px',
        backgroundColor: '#3498db',
        background: 'linear-gradient(to right, #3498db, #2980b9)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 6px rgba(52, 152, 219, 0.2)',
        marginTop: '10px'
    },
    submitButtonDisabled: {
        background: '#bdc3c7',
        cursor: 'not-allowed',
        opacity: '0.8'
    },
    buttonSpinner: {
        width: '18px',
        height: '18px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderTop: '3px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }
};

export default TicketForm;



















































