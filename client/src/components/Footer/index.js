import './footer.css';
import { Link } from 'react-router-dom';
import {
	FaFacebook,
	FaInstagram,
	FaYoutube,
	FaTwitter,
	FaLinkedin,
} from 'react-icons/fa';

import apple from '../../assets/images/appStore.svg';
import google from '../../assets/images/googlePlay.svg';

export const Footer = () => {
	return (
		<footer>
			<div className='footer-wrap'>
				<div className='footer-grid-container'>
					<div className='footer-grid-items'>
						<h1 className='footer-link-title'>Navigate</h1>
						<Link to='/'>L dorado</Link>
						<Link to='/learn'>Learn</Link>
						<Link to='/invest'>Invest</Link>
						<Link to='/sell'>sell</Link>
						{/* <Link to='/rent'>Rent</Link> */}
						<Link to='/about'>About</Link>
					</div>
					<div className='footer-grid-items'>
						<h1 className='footer-link-title'> Don't Contact Us</h1>
						<h1 className='footer-link-title'> It's not working yet</h1>
						<a href='mailto: support@dorado.com'>support@dorado.com</a>
						<a href='mailto: agents@dorado.com'>agents@dorado.com</a>
						<a href='mailto: investors@dorado.com'>investors@dorado.com</a>
					</div>
					<div className='footer-grid-items'>
						<h1 className='footer-link-title'>Follow Us</h1>
						<div className='social-icons'>
							<a href='/' target='_blank' aria-label='Facebook'>
								<FaFacebook />
							</a>
							<a href='/' target='_blank' aria-label='Instagram'>
								<FaInstagram />
							</a>
							<a href='/' target='_blank' aria-label='Youtube'>
								<FaYoutube />
							</a>
							<a href='/' target='_blank' aria-label='Twitter'>
								<FaTwitter />
							</a>
							<a href='/' target='_blank' aria-label='Linkedin'>
								<FaLinkedin />
							</a>
						</div>
					</div>
					<div className='footer-grid-items'>
						<h1 className='footer-link-title'>Download the App</h1>
						<a href='/'>
							<img border='0' alt='app store' src={apple} width='150px' />
						</a>
						<a href='/'>
							<img border='0' alt='google store' src={google} width='150px' />
						</a>
					</div>
				</div>
				<section className='website-rights'>
					<small>
						Copyright &copy; {new Date().getFullYear()} L dorado, Inc
					</small>
					<Link to='/privacy'>Privacy Policy</Link>
					<Link to='/terms'>Terms of Servicer</Link>
					<Link to='/disclosure'>Disclosure</Link>
				</section>
			</div>
		</footer>
	);
};
