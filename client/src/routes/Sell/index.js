import { Page, Footer } from '../../components';
import sell from '../../data/sell';
import './sell.css';

const Sell = () => {
	return (
		<div className='sell-scroll'>
			<div className='sell'>
				{sell.map((content, index) => (
					<div key={index}>
						<Page page={content} />
					</div>
				))}
			</div>
			<Footer />
		</div>
	);
};
export default Sell;
