import { Page } from '../../components';

import notFound from '../../data/notFound';

const NotFound = () => {
	return (
		<div className='notFound'>
			{notFound.map((notFound) => (
				<div key={notFound._id}>
					<Page page={notFound} />
				</div>
			))}
		</div>
	);
};

export default NotFound;
