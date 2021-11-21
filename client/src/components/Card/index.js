import './card.css';
import { Link } from 'react-router-dom';

import { ProgressBar } from '../ProgressBar';

export const InvestCard = ({ property }) => {
	const addDecimals = (num) => {
		return (Math.floor(num * 100) / 100).toFixed(2);
	};

	const addCommas = (num) => {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<Link className='card' to={`/invest/${property._id}`}>
			<img className='card-img' src={property.files[0].image} alt='' />

			<div className='card-info'>
				<div className='valuation'>
					<p>Valuation</p>
					<h3>
						{'$'}
						{addCommas(Number(Math.round(property.valuation)))}
					</h3>
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
				{property.propertyNumber} {property.street}, {property.city},{' '}
				{property.state}, {property.country} | {property.zip}
			</div>
			<div className='card-progress'>
				<ProgressBar noSharesLeft={addCommas(property.noSharesLeft)} />
			</div>
		</Link>
	);
};

export const PortfolioCard = ({ property }) => {
	const addDecimals = (num) => {
		return (Math.floor(num * 100) / 100).toFixed(2);
	};

	const addCommas = (num) => {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<Link className='card' to={`/invest/${property._id}`}>
			<img className='card-img' src={property.files[0].image} alt='' />

			<div className='card-info'>
				<div className='valuation'>
					<p>Valuation</p>
					<h3>
						{'$'}
						{addCommas(Number(Math.round(property.valuation)))}
					</h3>
				</div>
				<div className='share-price'>
					<h3>
						{'$'}
						{addDecimals(Number(property.sharePrice.toFixed(2)))}
					</h3>
					<p>Share Price</p>
				</div>
			</div>

			<div className='investments-container'>
				<div className='info-container'>
					<h3>
						{'$'}
						{addCommas(
							Number(Math.round(property.investments[0].totalInvestment))
						)}
					</h3>
					<p>Total</p>
					<p>Investment</p>
				</div>
				<div className='info-container'>
					<h3>{Number(property.investments[0].ownedShares)}</h3>
					<p>Owned</p>
					<p>Shares</p>
				</div>
				<div className='info-container'>
					<h3>
						{'$'}
						{addCommas(
							Number(
								(property.rentalPrice * property.investments[0].ownedShares) /
									property.totalShares
							).toFixed(3)
						)}
					</h3>
					<p>Monthly</p>
					<p>Dividends*</p>
				</div>
			</div>

			<div className='card-progress'>
				<ProgressBar noSharesLeft={addCommas(property.noSharesLeft)} />
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
