import FileCard from './FileCard';

export default function FileGrid({ subfolders, files, onFolderClick, onFileDownload }) {
  // If we want them in a single list
  // we can create a combined array with a "type" field:
  const folderItems = subfolders.map((f) => ({
    type: 'folder',
    id: f.folder_id,
    name: f.folder_name,
    parent_folder: f.parent_folder,
    updated_at: f.updated_at,

  }));
  const fileItems = files.map((f) => ({
    type: 'file',
    id: f.file_id,
    name: f.file_name,
    file_type: f.file_type,
    updated_at: f.updated_at,

  }));

  const items = [...folderItems, ...fileItems];

  if (!items || items.length === 0) {
    return <p>No files or folders found.</p>;
  }

  return (
    <div className="row">
      {items.map((item) => (
        <FileCard
          key={item.id}
          item={item}
          onFolderClick={onFolderClick}
          onFileDownload={onFileDownload}
        />
      ))}
    </div>
  );
}