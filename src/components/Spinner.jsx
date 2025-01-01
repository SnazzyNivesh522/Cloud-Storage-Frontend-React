import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <BootstrapSpinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  </div>
);

export default Spinner;