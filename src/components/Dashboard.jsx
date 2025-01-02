import { useEffect, useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

import Header from './Header';
import Spinner from './Spinner';
import FileGrid from './FileGrid';
import NavigationBar from './NavigationBar';
import api from '../api/axiosInstance';

import UploadFileModal from './UploadFileModal';
import CreateFolderModal from './CreateFolderModal';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('/Cloud-Storage-Frontend-React/default-profile.png');
  const [profileLoading, setProfileLoading] = useState(true);

  const { handleLogout } = useContext(AuthContext);

  const [currentFolder, setcurrentFolder] = useState(null);

  const [subfolders, setSubfolders] = useState([]);
  const [files, setFiles] = useState([]);

  const [filesLoading, setFilesLoading] = useState(true);

  // 1) Fetch user profile info
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/me');
        setUserEmail(response.data.email);
        const profileImageBytes = response.data.profileImage;
        if (profileImageBytes) {
          setUserImage(`data:image/png;base64,${profileImageBytes}`);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to load user profile.');
        setUserImage('/Cloud-Storage-Frontend-React/default-profile.png');

      }
      finally {
        setProfileLoading(false);
      }
    }
    fetchUserProfile();
  }, [handleLogout]);

// 2) On first load, find the root folder
useEffect(()=>{
  if(!profileLoading && !currentFolder){
    (async () => {
      try{
        const response = await api.get('/folder/root');
        if(response.status == 200){
          console.log(response.data);
          setcurrentFolder(response.data);
        }
        
      }
      catch(error){
        console.error('Error fetching root folder:', error);
      }
    })();
  }
});

// 3) if currentFolder, fetch its contents
  useEffect(() => {
    const fetchFolderContents = async () => {
      if (!currentFolder) return;

      if (profileLoading) {
        return;
      }

      setFilesLoading(true);
      try {
        const response = await api.get(`/folder/all/${currentFolder.folder_id}`);
        setSubfolders(response.data.subfolders || []);
        setFiles(response.data.files || []);
      }
      catch (error) {
        console.error('Error fetching folder contents:', error);
        alert('Failed to load folder contents');
        setSubfolders([]);
        setFiles([]);
      }
      finally {
        setFilesLoading(false);
      }

    }
    if (!profileLoading) {
      fetchFolderContents();
    }

  }, [currentFolder, profileLoading, handleLogout]);

  const refreshProfileImage = async () => {
    try {
      const response = await api.get('/auth/me');
      const profileImageBytes = response.data.profileImage;
      if (profileImageBytes) {
        setUserImage(`data:image/png;base64,${profileImageBytes}`);
      } else {
        setUserImage('/default-profile.png');
      }
    } catch (error) {
      console.error('Error refreshing profile image:', error);
      setUserImage('/default-profile.png');
    }
  };

  const navigateToFolder = (folder) => {
    setcurrentFolder(folder);
  };

  const navigateUp = () => {
    if (!currentFolder || !currentFolder.parent_folder) return;
    try {
      const parent_folder = currentFolder.parent_folder;
      if (!parent_folder) return;
      const response = api.get(`/folder/${parent_folder}`);
      setcurrentFolder(response.data);
    }
    catch (error) {
      console.error('Error navigating up:', error);
      alert('Failed to navigate up');
    }
  }
  const downloadFile = async (file) => {
    console.log("Downloading file:", file);
    try {
      const response = await api.get(`/files/download/${file.file_id}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.file_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file');
    }
    
  }
  console.log(currentFolder);

  return (
    <>
      {!profileLoading && (<Header userEmail={userEmail} userImage={userImage} refreshProfileImage={refreshProfileImage} />)}
      {profileLoading && (<Spinner />)}

      <div className="container mt-3">
        <NavigationBar
          canGoBack={!!currentFolder && !!currentFolder.parent_folder}
          onGoBack={navigateUp}
        />
        {filesLoading ? <Spinner /> : <FileGrid subfolders={subfolders} files={files} onFolderClick={navigateToFolder} onFileDownload={downloadFile}/>}
      </div>

      {currentFolder && (
        <>
          <UploadFileModal
            currentFolderId={currentFolder.folder_id}
            refresh={() => setcurrentFolder({ ...currentFolder })}
          />
          <CreateFolderModal
            currentFolderId={currentFolder.folder_id}
            refresh={() => setcurrentFolder({ ...currentFolder })}
          />
        </>
      )}
    </>
  )
}