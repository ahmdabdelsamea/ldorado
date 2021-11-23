import { Page, Footer } from '../../components';
import learn from '../../data/learn';
import './learn.css';

const Learn = () => {
	return (
		<div className='learn-scroll'>
			<div className='learn'>
				{learn.map((content, index) => (
					<div key={index}>
						<Page page={content} />
					</div>
				))}
			</div>
			<Footer />
		</div>
	);
};
export default Learn;
