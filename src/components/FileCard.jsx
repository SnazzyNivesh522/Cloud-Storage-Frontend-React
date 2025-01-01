import { FaFolder, FaFile } from 'react-icons/fa';

export default function FileCard({ item, onFolderClick, onFileDownload }) {
  const isFolder = item.type === 'folder';

  return (
    <div className="col-md-3 mb-3">
      <div className="card h-100 text-center">
        <div className="card-body">
          {isFolder ? (
            <FaFolder
              size={50}
              className="mb-2 text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => onFolderClick({ folder_id: item.id, folder_name: item.name,parent_folder: item.parent_folder, updated_at: item.updated_at })}
            />
          ) : (
            <FaFile size={50} className="mb-2 text-secondary" />
          )}
          <h6 className="card-title text-truncate" title={item.name}>
            {item.name}
          </h6>
        </div>
        <div className="card-footer">
          {!isFolder && (
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => onFileDownload({ file_id: item.id, file_name: item.name, file_type: item.file_type, updated_at: item.updated_at })}
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}