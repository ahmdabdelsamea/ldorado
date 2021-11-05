import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
// import { FaBars, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
	return (
		<div>
			<nav>
				<div className='nav-container'>
					<Link className='logo' to='/'>
						l.dorado
					</Link>
					{/* <div className='mobile-icon' onClick={toggle}>
						<FaBars />
					</div> */}
					<ul className='nav-menu'>
						<li className='nav-item'>
							<Link className='nav-link' to='/learn'>
								Learn
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/invest'>
								Invest
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/sell'>
								Sell
							</Link>
						</li>
						{/* <li className='nav-item'>
							<Link className='nav-link' to='/rent'>
								Rent
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/buy'>
								Buy
							</Link>
						</li> */}

						<li className='nav-item'>
							<Link className='nav-profile-link' to='/dashboard'>
								<FaUserCircle />
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
