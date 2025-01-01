import { useRef } from 'react';
import api from '../api/axiosInstance';

export default function UploadFileModal({ currentFolderId, refresh }) {
    const fileInputRef = useRef();
    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!fileInputRef.current.files.length) {
            alert('Please select a file to upload');
            return;
        }
        if (!currentFolderId) {
            alert('Please select a folder to upload the file');
            return;
        }
        const formData = new FormData();
        for (let i = 0; i < fileInputRef.current.files.length; i++) {
            formData.append('files', fileInputRef.current.files[i]);
        }
        try {
            const response = await api.post(`/files/upload/${currentFolderId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status !== 201) {
                throw new Error('Failed to upload file(s)');
            }
            alert('File(s) uploaded successfully.');
            refresh();
            // const uploadFileModal = window.bootstrap.Modal.getInstance(document.getElementById('uploadFileModal'));
            // uploadFileModal.hide();
        }
        catch (error) {
            console.error('Error uploading file(s):', error);
            alert('Failed to upload file(s). Please try again.');
        }
    }
    return (
        <>
            <div
                className="modal fade"
                id="uploadFileModal"
                tabIndex="-1"
                aria-labelledby="uploadFileModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleFileUpload}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="uploadFileModalLabel">
                                    Upload File
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="file"
                                    className="form-control"
                                    ref={fileInputRef}
                                    multiple
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}