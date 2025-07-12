import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/main/">Go to Home</Link>
    </div>
  );
}
