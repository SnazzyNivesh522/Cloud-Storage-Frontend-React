import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import imageCompression from 'browser-image-compression';

const ProfileImageUploader = ({ onUploadSuccess }) => {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState('');

    // Cleanup file preview on unmount
    useEffect(() => {
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
            }
        };
    }, [filePreview]);

    // Helper to reset state
    const resetState = () => {
        setSelectedFile(null);
        setFilePreview('');
        setUploadError('');
        setUploadSuccess('');
        setUploadProgress(0);
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        resetState();
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setUploadError('Invalid file type. Please select a JPEG, PNG, or GIF image.');
                return;
            }

            // Validate file size (optional, e.g., max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                setUploadError('File size exceeds 5MB.');
                return;
            }

            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    // Handle file upload
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadError('Please select a file to upload.');
            return;
        }

        try {
            setUploading(true);
            setUploadError('');
            setUploadSuccess('');
            setUploadProgress(0);

            // Compress the image (optional)
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 500,
                useWebWorker: true,
            };

            let compressedFile;
            try {
                compressedFile = await imageCompression(selectedFile, options);
            } catch (compressionError) {
                console.error('Image compression error:', compressionError);
                setUploadError('Image compression failed. Please try again.');
                return;
            }

            const formData = new FormData();
            formData.append('file', compressedFile);

            const response = await api.post('/user/upload-profile-picture/', formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });

            if (response.status === 200) {
                setUploadSuccess('Profile picture updated successfully.');
                if (onUploadSuccess) {
                    onUploadSuccess();
                }
                resetState();
            } else {
                setUploadError('Failed to upload profile picture.');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            if (error.response?.data?.detail) {
                setUploadError(error.response.data.detail);
            } else {
                setUploadError('An error occurred while uploading. Please try again.');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="modal fade" id="updateProfilePictureModal" tabIndex="-1" aria-labelledby="updateProfilePictureModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form onSubmit={handleUpload} className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateProfilePictureModalLabel">Update Profile Picture</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={resetState}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="profilePicture" className="form-label">Select an image:</label>
                            <input
                                className="form-control"
                                type="file"
                                id="profilePicture"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        {selectedFile && (
                            <div className="mb-3">
                                <p>Selected file: {selectedFile.name}</p>
                                <img
                                    src={filePreview}
                                    alt="Selected Preview"
                                    className="img-thumbnail"
                                    style={{ maxWidth: '200px' }}
                                />
                            </div>
                        )}
                        {uploadProgress > 0 && (
                            <div className="mb-3">
                                <label htmlFor="uploadProgress" className="form-label">Uploading:</label>
                                <div className="progress">
                                    <div
                                        className="progress-bar progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        style={{ width: `${uploadProgress}%` }}
                                        aria-valuenow={uploadProgress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        {uploadProgress}%
                                    </div>
                                </div>
                            </div>
                        )}
                        {uploadError && <div className="alert alert-danger" role="alert">{uploadError}</div>}
                        {uploadSuccess && <div className="alert alert-success" role="alert">{uploadSuccess}</div>}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={resetState}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={uploading || !selectedFile}
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileImageUploader;
