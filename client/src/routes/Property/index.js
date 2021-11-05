import React, { useEffect } from 'react';
import { Carousel } from 'react-carousel-minimal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import FormikControl from '../../components/FormikComponents/FormikControl';
import { Tabs, Loading, Failure, ProgressBar } from '../../components';
import { listPropertyDetails, investAction } from '../../redux/actions';
import './property.css';

const Property = ({ match, history }) => {
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const dispatch = useDispatch();

	const propertyDetails = useSelector((state) => state.propertyDetails);
	const { loading, error, property } = propertyDetails;

	useEffect(() => {
		dispatch(listPropertyDetails(match.params.id));
	}, [dispatch, match, history]);

	const invest = useSelector((state) => state.invest);
	const { investLoading, investError } = invest;

	const handleInvest = (values) => {
		dispatch(investAction(match.params.id, values, history));
	};

	const initialValues = {
		shares: 0,
	};

	const validationSchema = Yup.object().shape({
		shares: Yup.number()
			.positive('Invalid!')
			.integer('Invalid!')
			.min(1)
			.max(property.noSharesLeft)
			.required('Required!'),
	});

	const loadingImg = [
		{ image: 'https://source.unsplash.com/jf1EomjlQi0/1600x1100' },
	];

	return (
		<div className='property-scroll'>
			{loading || investLoading ? (
				<Loading />
			) : error || investError ? (
				<div>
					<Failure>{error}</Failure>
					<Failure>{investError}</Failure>
				</div>
			) : (
				<div className='property'>
					<div className='progress-bar'>
						<ProgressBar noSharesLeft={property.noSharesLeft} />
					</div>
					<div className='invest-form'>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleInvest}
						>
							{(formik) => {
								return (
									<div>
										<Form className='shares-input'>
											<FormikControl
												control='input'
												type='number'
												label='Shares QTY'
												name='shares'
												step='1'
												min='1'
												max={property.noSharesLeft}
											/>
											<div className='total-investment'>
												<h3>
													{'$'}
													{addDecimals(
														Number(
															formik.values.shares * property.sharePrice
														).toFixed(2)
													)}
												</h3>
												<p>Total Investment</p>
											</div>
											<div className='invest-btn-container'>
												<p>One Click to </p>
												<button
													className='invest-btn'
													type='submit'
													disabled={!formik.isValid}
													// disabled={!formik.isValid || formik.isSubmitting}
												>
													Invest
												</button>
											</div>
										</Form>
									</div>
								);
							}}
						</Formik>
					</div>
					<div className='imgs-tabs-invest'>
						<Carousel
							data={property.files ? property.files : loadingImg}
							width='100%'
							height='100%'
							radius='10px'
							dots={true}
							pauseIconColor='white'
							pauseIconSize='40px'
							slideImageFit='cover'
							thumbnails={false}
							thumbnailWidth='0'
							style={{
								textAlign: 'center',
								margin: '0',
							}}
						/>
						<div className='column-2'>
							<Tabs details={property} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Property;
