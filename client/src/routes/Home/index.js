import { Page, Footer } from '../../components';
import home from '../../data/home';
import './home.css';

const Home = () => {
	return (
		<div className='home-scroll'>
			<div className='home'>
				{home.map((content, index) => (
					<div key={index}>
						<Page page={content} />
					</div>
				))}
			</div>
			<Footer />
		</div>
	);
};
export default Home;
