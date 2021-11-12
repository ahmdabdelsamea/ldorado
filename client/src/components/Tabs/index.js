import React, { useState } from 'react';
import './tabs.css';

export const Tabs = ({ details }) => {
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const addCommas = (num) => {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	};

	const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<div className='tabs-container'>
			<div className='bloc-tabs'>
				<button
					className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => toggleTab(1)}
				>
					Overview
				</button>
				<button
					className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => toggleTab(2)}
				>
					Details
				</button>
				<button
					className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => toggleTab(3)}
				>
					P{'&'}L
				</button>
			</div>

			<div className='content-tabs'>
				<div
					className={
						toggleState === 1
							? 'tab-content  active-tab-content'
							: 'tab-content'
					}
				>
					<div className='property-info'>
						<div className='property-valuation '>
							<p>Valuation</p>
							<h3>
								{'$'}
								{addCommas(Number(Math.round(details.valuation)))}
							</h3>
						</div>
						<div className='property-share-price'>
							<h3>
								{'$'}
								{addDecimals(Number(details.sharePrice).toFixed(2))}
							</h3>
							<p>Share Price</p>
						</div>
					</div>
					<div className='property-overview'>
						<p>Location</p>
						<h3>
							{details.propertyNumber} {details.street}, {details.city},{' '}
							{details.state}, {details.country} | {details.zip}
						</h3>
						<p>Type</p>
						<h3>{details.subType}</h3>
						<p>Overview</p>
						<h3>{details.overview}</h3>
						<p>Listed by</p>
						<h3>
							{details.listedBy} | {details.createdBy}
						</h3>
					</div>
				</div>

				<div
					className={
						toggleState === 2
							? 'tab-content  active-tab-content'
							: 'tab-content'
					}
				>
					<div className='tabs-gird'>
						<p>Area </p>
						<h3>{details.area} Square Feet</h3>
						<p>Bedrooms </p>
						<h3>{details.noBeds}</h3>
						<p>Bathrooms </p>
						<h3>{details.noBath} </h3>
						<p>Flooring </p>
						<h3>{details.flooring}</h3>
						<p>Heating</p>
						<h3> {details.heating}</h3>
						<p>Cooling </p>
						<h3>{details.cooling}</h3>
						<p>Parking </p>
						<h3>{details.parking}</h3>
						<p>Appliances </p>
						<h3>{details.appliances}</h3>
						<p>Laundry </p>
						<h3>{details.laundry}</h3>
						<p>Interior Features </p>
						<h3>{details.interiorFeatures}</h3>
						<p>Exterior features </p>
						<h3>{details.exteriorFeatures}</h3>
						<p>Parcel number </p>
						<h3>{details.parcelNumber}</h3>
						<p>Year Built </p>
						<h3>{details.yearBuilt}</h3>
						<p>Price per Square Feet </p>
						<h3>
							{'$'}
							{addDecimals(Number(details.valuation / details.area).toFixed(2))}
						</h3>
					</div>
				</div>

				<div
					className={
						toggleState === 3
							? 'tab-content  active-tab-content'
							: 'tab-content'
					}
				>
					<div className='tabs-gird'>
						<h2>Monthly Revenues {'&'} Expenses</h2>

						<p>Property Taxes*</p>
						<h3>{`$${details.taxes}`}</h3>
						<p>Home Insurance*</p>
						<h3>{`$${details.insurance}`}</h3>
						<p>HOV Fees*</p>
						<h3>{`$${details.hov}`}</h3>
						<p>Utilities Fees*</p>
						<h3>{`$${details.utilities}`}</h3>
						<p>Monthly Expenses*</p>
						<h3>{`$${
							details.taxes +
							details.insurance +
							details.hov +
							details.utilities
						}`}</h3>
						<p>Monthly Rent*</p>
						<h3>{`$${details.rentalPrice}`}</h3>
						<p>Monthly Profit*</p>
						<h3>{`$${
							details.rentalPrice -
							details.taxes -
							details.insurance -
							details.hov -
							details.utilities
						}`}</h3>
						<p>*Estimated</p>
					</div>
				</div>
			</div>
		</div>
	);
};
