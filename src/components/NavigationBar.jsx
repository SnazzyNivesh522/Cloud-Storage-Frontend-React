import "./NavigationBar.css";
const NavigationBar = ({ canGoBack, onGoBack }) => {
  console.log('NavigationBar rendered');
  console.log('canGoBack:', canGoBack);
  return (
    <div className="navbar-container d-flex justify-content-between align-items-center mb-3">
      <h3 className="navbar-title">My Drive</h3>
      <div className="navbar-buttons">
        <button
          className="btn btn-primary me-2"
          onClick={onGoBack}
          disabled={!canGoBack}
        >
          &uarr; Back
        </button>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#uploadFileModal"
        >
          Upload File
        </button>
        <button
          className="btn btn-secondary ms-2"
          data-bs-toggle="modal"
          data-bs-target="#createFolderModal"
        >
          + New Folder
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;