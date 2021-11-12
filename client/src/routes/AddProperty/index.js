import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { addPropertyAction } from '../../redux/actions';

import FormikControl from '../../components/FormikComponents/FormikControl';
import { Failure, Loading, Dropzone } from '../../components';
import '../form.css';

const AddProperty = ({ history }) => {
	const dispatch = useDispatch();

	const addProperty = useSelector((state) => state.addProperty);
	const { loading, error } = addProperty;

	const [realType, setRealType] = useState('');

	const measurement = [
		{ key: '', value: '' },
		{ key: 'sqft', value: 'sqft' },
		{ key: 'm2', value: 'm2' },
	];

	const states = [
		{ key: '', value: '' },
		{ key: 'AL', value: 'AL' },
		{ key: 'AK', value: 'AK' },
		{ key: 'AZ', value: 'AZ' },
		{ key: 'AR', value: 'AR' },
		{ key: 'CA', value: 'CA' },
		{ key: 'CO', value: 'CO' },
		{ key: 'CT', value: 'CT' },
		{ key: 'DC', value: 'DC' },
		{ key: 'DE', value: 'DE' },
		{ key: 'FL', value: 'FL' },
		{ key: 'GA', value: 'GA' },
		{ key: 'HI', value: 'HI' },
		{ key: 'ID', value: 'ID' },
		{ key: 'IL', value: 'IL' },
		{ key: 'IN', value: 'IN' },
		{ key: 'IA', value: 'IA' },
		{ key: 'KS', value: 'KS' },
		{ key: 'KY', value: 'KY' },
		{ key: 'LA', value: 'LA' },
		{ key: 'ME', value: 'ME' },
		{ key: 'MD', value: 'MD' },
		{ key: 'MA', value: 'MA' },
		{ key: 'MI', value: 'MI' },
		{ key: 'MN', value: 'MN' },
		{ key: 'MS', value: 'MS' },
		{ key: 'MO', value: 'MO' },
		{ key: 'MT', value: 'MT' },
		{ key: 'NE', value: 'NE' },
		{ key: 'NV', value: 'NV' },
		{ key: 'NH', value: 'NH' },
		{ key: 'NJ', value: 'NJ' },
		{ key: 'NM', value: 'NM' },
		{ key: 'NY', value: 'NY' },
		{ key: 'NC', value: 'NC' },
		{ key: 'ND', value: 'ND' },
		{ key: 'OH', value: 'OH' },
		{ key: 'OK', value: 'OK' },
		{ key: 'OR', value: 'OR' },
		{ key: 'PA', value: 'PA' },
		{ key: 'RI', value: 'RI' },
		{ key: 'SC', value: 'SC' },
		{ key: 'SD', value: 'SD' },
		{ key: 'TN', value: 'TN' },
		{ key: 'TX', value: 'TX' },
		{ key: 'UT', value: 'UT' },
		{ key: 'VT', value: 'VT' },
		{ key: 'VA', value: 'VA' },
		{ key: 'WA', value: 'WA' },
		{ key: 'WV', value: 'WV' },
		{ key: 'WI', value: 'WI' },
		{ key: 'WY', value: 'WY' },
	];

	const listedBy = [
		{ key: '', value: '' },
		{ key: 'Real Estate Agent', value: 'Real Estate Agent' },
		{ key: 'Property Owner', value: 'Property Owner' },
	];

	const rentalProperty = [
		{ key: '', value: '' },
		{ key: 'True', value: 'True' },
		{ key: 'False', value: 'False' },
	];

	const realEstateType = [
		{ key: '', value: '' },
		{ key: 'Residential', value: 'Residential' },
		{ key: 'Commercial', value: 'Commercial' },
		{ key: 'Industrial', value: 'Industrial' },
		{ key: 'Land', value: 'Land' },
	];

	const listSubTypes = (types) => {
		switch (types) {
			case 'Residential':
				return [
					{ key: '', value: '' },
					{ key: 'Single Family Home', value: 'Single Family Home' },
					{ key: 'Condominium', value: 'Condominium' },
					{ key: 'Townhouse', value: 'Townhouse' },
					{ key: 'Cooperative Housing', value: 'Cooperative Housing' },
					{ key: 'Duplex', value: 'Duplex' },
					{ key: 'Triplex', value: 'Triplex' },
					{ key: 'Fourplex', value: 'Fourplex' },
				];

			case 'Commercial':
				return [
					{ key: '', value: '' },
					{ key: 'Apartment Complex', value: 'Apartment Complex' },
					{ key: 'Office', value: 'Office' },
					{ key: 'Retail', value: 'Retail' },
				];
			case 'Industrial':
				return [
					{ key: '', value: '' },
					{ key: 'Manufacturing', value: 'Manufacturing' },
					{ key: 'Production', value: 'Production' },
					{ key: 'Distribution', value: 'Distribution' },
					{ key: 'Storage', value: 'Storage' },
					{
						key: 'Research and Development',
						value: 'Research and Development',
					},
				];
			case 'Land':
				return [
					{ key: '', value: '' },
					{ key: 'Vacant Land', value: 'Vacant Land' },
					{ key: 'Undeveloped Property', value: 'Undeveloped Property' },
					{ key: 'Agricultural Land', value: 'Agricultural Land' },
				];
			default:
				return [];
		}
	};

	const subType = listSubTypes(realType);

	const initialValues = {
		overview: '',
		realEstateType: '',
		subType: '',
		propertyNumber: '',
		street: '',
		city: '',
		state: '',
		country: 'United States',
		zip: '',
		area: '',
		measurement: '',
		noBeds: '',
		noBath: '',
		flooring: '',
		heating: '',
		cooling: '',
		parking: '',
		appliances: '',
		laundry: '',
		interiorFeatures: '',
		exteriorFeatures: '',
		parcelNumber: '',
		yearBuilt: '',
		totalPrice: '',
		rentalPrice: '',
		taxes: '',
		hov: '',
		utilities: '',
		more: '',
		listedBy: '',
		rentalProperty: '',
		files: [],
	};

	const validationSchema = Yup.object().shape({
		subType: Yup.string().required('Required!'),
		overview: Yup.string()
			.min(3, 'Too Short!')
			.max(1500, 'Too Long!')
			.required('Required!'),
		propertyNumber: Yup.number().required('Required!'),
		street: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required!'),
		city: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required!'),
		state: Yup.string().required('Required!'),
		zip: Yup.string()
			.matches(/^[0-9]+$/, 'Must be only digits')
			.min(5, 'Must be exactly 5 digits')
			.max(5, 'Must be exactly 5 digits')
			.required('Required!'),
		area: Yup.number().required('Required!'),
		noBeds: Yup.number().required('Required!'),
		noBath: Yup.number().required('Required!'),
		flooring: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
		heating: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
		cooling: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
		parking: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
		appliances: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
		laundry: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
		interiorFeatures: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!'),
		exteriorFeatures: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!'),
		parcelNumber: Yup.number().required('Required!'),
		yearBuilt: Yup.string().required('Required!'),
		totalPrice: Yup.number().required('Required!'),
		rentalPrice: Yup.number(),
		taxes: Yup.number(),
		hov: Yup.number(),
		utilities: Yup.number(),
		listedBy: Yup.string().required('Required!'),
		rentalProperty: Yup.string().required('Required!'),
		more: Yup.string(),
		files: Yup.array(Yup.object({ url: Yup.string().required('Required!') })),
	});

	const addPropertyHandler = (values) => {
		dispatch(addPropertyAction(values, history));
	};

	return (
		<div className='form-page'>
			{loading && <Loading />}
			{error && <Failure failure={error} />}
			<div className='form-container'>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={addPropertyHandler}
				>
					{(formik) => {
						return (
							<div>
								<Form className='form-grid'>
									<div className='two-columns'>
										<h2>Overview *</h2>
									</div>

									<div className='one-column'>
										<FormikControl
											control='select'
											label='Property Type'
											name='realEstateType'
											options={realEstateType}
											value={realType}
											onChange={(e) => {
												setRealType(e.target.value);
											}}
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='select'
											label='Type'
											name='subType'
											options={subType}
										/>
									</div>
									<div className='two-columns'>
										<FormikControl
											control='textarea'
											type='text'
											label='Overview'
											name='overview'
										/>
									</div>
									<div className='two-columns'>
										<h2>Address *</h2>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											min='0'
											label='Property Number'
											name='propertyNumber'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Street'
											name='street'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='City'
											name='city'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='select'
											type='text'
											label='State'
											name='state'
											options={states}
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Country'
											name='country'
											value='United States'
											disabled
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											min='0'
											label='Zip Code'
											name='zip'
										/>
									</div>

									<div className='two-columns'>
										<h2>Details</h2>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='Area *'
											name='area'
											min='0'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='select'
											label='Measurement *'
											name='measurement'
											options={measurement}
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='Parcel Number *'
											name='parcelNumber'
											min='0'
										/>
									</div>
									{/* <div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='Year Built'
											name='yearBuilt'
											min='0'
										/>
									</div> */}
									<div className='one-column'>
										<FormikControl
											control='year'
											label='Year Built *'
											name='yearBuilt'
										/>
									</div>

									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='No. Beds *'
											name='noBeds'
											min='0'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='No. Bath *'
											name='noBath'
											min='0'
										/>
									</div>

									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Flooring'
											name='flooring'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Heating'
											name='heating'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Cooling'
											name='cooling'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Parking'
											name='parking'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Appliances'
											name='appliances'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Laundry'
											name='laundry'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Interior Features'
											name='interiorFeatures'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Exterior Features'
											name='exteriorFeatures'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='select'
											label='Listed By *'
											name='listedBy'
											options={listedBy}
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='select'
											label='Rental Property *'
											name='rentalProperty'
											options={rentalProperty}
										/>
									</div>

									<div className='two-columns'>
										<h2>Prices</h2>
									</div>
									<div className='two-columns'>
										<FormikControl
											control='input'
											type='number'
											label='Total Price *'
											name='totalPrice'
											min='0'
										/>
									</div>
									<div className='two-columns'>
										<FormikControl
											control='input'
											type='number'
											label='Estimated Rental Price'
											name='rentalPrice'
											min='0'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='Taxes'
											name='taxes'
											min='0'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='Insurance'
											name='insurance'
											min='0'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='HOV'
											name='hov'
											min='0'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='number'
											label='Utilities'
											name='utilities'
											min='0'
										/>
									</div>

									<div className='two-columns'>
										<h2>More</h2>
									</div>
									<div className='two-columns'>
										<FormikControl
											control='textarea'
											type='text'
											label='Highlights'
											name='more'
										/>
									</div>

									<div className='two-columns'>
										<Dropzone name='files' />
									</div>

									<div className='two-columns'>
										<p className='terms'>
											By clicking this button, you agree to Ldorado's
											<Link to='/terms'> Terms </Link> and
											<Link to='privacy'> Privacy Policy</Link>
										</p>
									</div>
									<div className='two-columns'>
										<button
											className='create-btn'
											type='submit'
											disabled={!(formik.isValid && formik.dirty)}
											// disabled={
											// 	!(formik.isValid && formik.dirty) || formik.isSubmitting
											// }
										>
											List Property
										</button>
									</div>
								</Form>
							</div>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default AddProperty;
