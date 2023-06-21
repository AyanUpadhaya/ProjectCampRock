import { Link } from 'react-router-dom';
import './../../styles/Pages.css'
const NotFound = () => {
    return (
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2 className='py-8'>404 - Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<Link to="/">Go To Homepage</Link>
		</div>
	</div>
    );
};

export default NotFound;