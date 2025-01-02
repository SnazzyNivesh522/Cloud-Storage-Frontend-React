// Header.js
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import ProfileImageUploader from './ProfileImageUploader';


const Header = ({ userEmail, userImage, refreshProfileImage }) => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);

  // Handle logout
  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <>
      <header className="py-3 mb-3 border-bottom">
        <div
          className="container-fluid d-grid gap-3 align-items-center"
          style={{ gridTemplateColumns: '1fr 2fr' }}
        >
          {/* Logo Dropdown */}
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="bi me-2"
                src="/Cloud-Storage-Frontend-React/cloud-storage-logo.png"
                alt="Logo"
                style={{ height: '32px', width: '40px' }}
              />
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li>
                <a className="dropdown-item active" href="#" aria-current="page">
                  Overview
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  My Drive
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Recents
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Trash
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Storage
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Search and User Profile */}
          <div className="d-flex align-items-center">
            {/* Search Form */}
            <form className="w-100 me-3" role="search">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            {/* User Profile Dropdown */}
            <div className="flex-shrink-0 dropdown">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={userImage} // Dynamic user profile image
                  alt="User Profile"
                  width="40"
                  height="40"
                  className="rounded-circle"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-profile.png';
                  }} // Fallback if image fails
                />
              </a>
              <ul className="dropdown-menu text-small shadow">
                {/* Display user's email address */}
                <li>
                  <span className="dropdown-item-text">{userEmail}</span>
                </li>
                <hr className="dropdown-divider" />
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#updateProfilePictureModal"
                  >
                    Update Profile Picture
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={onLogout}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Image Uploader Modal */}
      <ProfileImageUploader onUploadSuccess={refreshProfileImage} />
    </>
  );
};

export default Header;