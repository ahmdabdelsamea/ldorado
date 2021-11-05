import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InvestCard, Loading, Failure } from '../../components';
import { listProperty } from '../../redux/actions';
import './invest.css';

const Invest = ({ history }) => {
	const dispatch = useDispatch();

	const propertyList = useSelector((state) => state.propertyList);
	const { loading, error, properties } = propertyList;

	useEffect(() => {
		dispatch(listProperty());
	}, [dispatch, history]);

	return (
		<div className='invest-scroll'>
			{loading ? (
				<Loading />
			) : error ? (
				<Failure>{error}</Failure>
			) : (
				<div className='property-list'>
					{properties.map((propertyCard) => (
						<div key={propertyCard._id}>
							<InvestCard property={propertyCard} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Invest;
