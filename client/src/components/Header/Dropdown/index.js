import './dropdown.css';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Dropdown = ({ isOpen, toggle }) => {
	return (
		<aside
			className={isOpen ? 'dropdown-container' : 'dropdown-container is-open'}
			onClick={toggle}
		>
			<div className='icon' onClick={toggle}>
				<FaTimes className='close-icon' />
			</div>
			<div className='dropdown-wrapper'>
				<ul className='dropdown-menu'>
					<li className='dropdown-item'>
						<Link className='dropdown-link' to='/learn' onClick={toggle}>
							Learn
						</Link>
					</li>
					<li className='dropdown-item'>
						<Link className='dropdown-link' to='/invest' onClick={toggle}>
							Invest
						</Link>
					</li>
					<li className='dropdown-item'>
						<Link className='dropdown-link' to='/sell' onClick={toggle}>
							Sell
						</Link>
					</li>
					{/* <li className='dropdown-item'>
						<Link className='dropdown-link' to='/rent' onClick={toggle}>
							Rent
						</Link>
					</li>
					<li className='dropdown-item'>
						<Link className='dropdown-link' to='/buy' onClick={toggle}>
							Buy
						</Link>
					</li> */}

					<li className='dropdown-item'>
						<Link
							className='dropdown-link profile'
							to='/dashboard'
							onClick={toggle}
						>
							Dashboard
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default Dropdown;
