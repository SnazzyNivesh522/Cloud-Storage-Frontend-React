import api from "../api/axiosInstance";
import { useRef } from 'react';

export default function CreateFolderModal({ currentFolderId, refresh }) {
    const folderNameRef = useRef(null);
    const handleCreateFolder = async (e) => {
        e.preventDefault();
        const folderName = folderNameRef.current.value.trim();
        if (!folderName) {
            alert('Folder name cannot be empty');
            return;
        }
        try {
            const response = await api.post('/folder/', null, {
                params: {
                    folder_name: folderName,
                    parent_folder: currentFolderId || null,

                }
            }
            );
            if (response.status !== 201) {
                throw new Error('Failed to create folder');
            }
            alert('Folder created successfully');
            folderNameRef.current.value = '';
            refresh(); //re-fetch folder contents
            // const createFolderModal = window.bootstrap.Modal.getInstance(document.getElementById('createFolderModal'));
            // createFolderModal.hide();
        }
        catch (error) {
            console.error('Error creating folder:', error);
            alert('Failed to create folder. Please try again.');
        }
    }
    return <>
        <div
            className="modal fade"
            id="createFolderModal"
            tabIndex="-1"
            aria-labelledby="createFolderModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleCreateFolder}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="createFolderModalLabel">
                                Create New Folder
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
                                type="text"
                                ref={folderNameRef}
                                className="form-control"
                                placeholder="Folder Name"
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
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}