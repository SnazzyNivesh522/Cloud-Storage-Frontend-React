
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div>
            <nav className="navbar navbar-light bg-light px-4">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src="/Cloud-Storage-Frontend-React/cloud-storage-logo.png" alt="Logo" />
                    <span className="ms-2">Free Storage Drive</span>
                </a>
                <button className="btn btn-outline-dark" onClick={()=>navigate('/login')}>LOGIN</button>
            </nav>

            {/* Hero Section */}
            <div className="px-4 py-5 my-5 text-center text-white hero-container">
                <h1 className="display-4">Store and share files online</h1>
                <div className="col-lg-6 mx-auto">
                    <img
                        src="/Cloud-Storage-Frontend-React/features.gif"
                        alt="Cloud Storage Features"
                        className="img-fluid my-4"
                        style={{ maxHeight: '300px' }}
                    />
                    <p className="lead">Cloud storage for seamless file sharing and enhanced collaboration..</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button className="btn btn-warning btn-lg me-3" onClick={() => navigate('/register')}>Get Started for Free</button>
                        {/* <button className="btn btn-outline-light btn-lg">Learn More</button> */}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-5">
                <div className="container text-center">
                    <h2 className="mb-4">Why Choose Us?</h2>
                    <div className="row">
                        <div className="col-md-3">
                            <i className="bi bi-shield-lock display-4 text-primary mb-3"></i>
                            <h5>Secure Storage</h5>
                            <p>Your files are protected with state-of-the-art encryption.</p>
                        </div>
                        <div className="col-md-3">
                            <i className="bi bi-cloud-arrow-down display-4 text-primary mb-3"></i>
                            <h5>Anywhere Access</h5>
                            <p>Access your data on all devices with seamless syncing.</p>
                        </div>
                        <div className="col-md-3">
                            <i className="bi bi-people display-4 text-primary mb-3"></i>
                            <h5>Sharing</h5>
                            <p>Easily share with your friends or anyone.</p>
                        </div>
                        <div className="col-md-3">
                            <i className="bi bi-bar-chart display-4 text-primary mb-3"></i>
                            <h5>Always Free tier</h5>
                            <p>Free storage for all your needs.</p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Footer */}
            <footer className="bg-dark text-white text-center py-4">
                <p>© 2024 Cloud Storage. All rights reserved.</p>
            </footer>
            {/* Credits Section */}
            <div className="container mt-5">
                <h3 className="text-center mb-4">Credits & Attributions</h3>
                <div className="list-group">
                    <a href="https://getbootstrap.com" className="list-group-item list-group-item-action" target="_blank">
                        <strong>Bootstrap</strong> - CSS framework used for styling and responsive design.
                    </a>
                    <a href="https://www.google.com/drive/" className="list-group-item list-group-item-action" target="_blank">
                        <strong>Google Drive</strong> - Icons and inspiration for design elements.
                    </a>
                    <a href="https://placeholder.com/" className="list-group-item list-group-item-action" target="_blank">
                        <strong>Placeholder.com</strong> - Used for placeholder images.
                    </a>
                    <a href="https://unsplash.com" className="list-group-item list-group-item-action" target="_blank">
                        <strong>Unsplash</strong> - Free images for illustrations.
                    </a>
                    <a href="https://www.flaticon.com/free-icons/storage" className="list-group-item list-group-item-action" title="storage icons" target="_blank">
                        Storage icons created by <strong>Hilmy Abiyyu A.</strong> - <strong>Flaticon</strong>
                    </a>
                </div>
            </div>

        </div>
    );
}


