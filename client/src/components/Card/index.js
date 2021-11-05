import './card.css';
import { Link } from 'react-router-dom';

import { ProgressBar } from '../ProgressBar';

export const InvestCard = ({ property }) => {
	const addDecimals = (num) => {
		return (Math.floor(num * 100) / 100).toFixed(2);
	};

	// const loadingImg = [
	// 	{ image: 'https://source.unsplash.com/UuGGxuBfYic/1600x1100' },
	// ];

	return (
		<Link className='card' to={`/invest/${property._id}`}>
			<img className='card-img' src={property.files[0].image} alt='' />

			<div className='card-info'>
				<div className='valuation'>
					<p>Valuation</p>
					<h3>{`$${property.valuation}`}</h3>
				</div>
				<div className='share-price'>
					<h3>
						{'$'}
						{addDecimals(Number(property.sharePrice.toFixed(2)))}
					</h3>
					<p>Share Price</p>
				</div>
			</div>
			<div className='card-type'>{property.subType}</div>
			<div className='card-details'>
				{property.area} Square Feet | {property.noBeds} beds | {property.noBath}{' '}
				bath
			</div>
			<div className='card-address'>
				{property.propertyNumber} {property.street} {property.city}{' '}
				{property.state} {property.country} | {property.zip}
			</div>
			<div className='card-progress'>
				<ProgressBar noSharesLeft={property.noSharesLeft} />
			</div>
		</Link>
	);
};

export const RentCard = ({ property }) => {
	return (
		<Link className='card' to={`/rent/${property._id}`}>
			<img className='card-img' src={property.imgUrl} alt='property' />

			<div className='card-type'>
				{property.realEstateType}: {property.subType}
			</div>
			<div className='card-details'>
				{property.area} Square Feet | {property.noBeds} beds | {property.noBath}{' '}
				bath
			</div>
			<div className='card-address'>
				{property.propertyNumber} {property.street} {property.city}{' '}
				{property.state} {property.country} | {property.zip}
			</div>
			<div className='card-price'>{`$${property.rentalPrice}/month`}</div>
		</Link>
	);
};

export const BuyCard = ({ property }) => {
	return (
		<Link className='card' to={`/buy/${property._id}`}>
			<img className='card-img' src={property.imgUrl} alt='property' />

			<div className='card-type'>
				{property.realEstateType}: {property.subType}
			</div>
			<div className='card-details'>
				{property.area} Square Feet | {property.noBeds} beds | {property.noBath}{' '}
				bath
			</div>
			<div className='card-address'>
				{property.propertyNumber} {property.street} {property.city}{' '}
				{property.state} {property.country} | {property.zip}
			</div>
			<div className='card-price'>{`$${property.valuation}`}</div>
		</Link>
	);
};
