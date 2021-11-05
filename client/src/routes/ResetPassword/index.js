import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import './reset.css';
import FormikControl from '../../components/FormikComponents/FormikControl';
import axios from 'axios';

const ResetPassword = ({ match }) => {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const initialValues = {
		password: '',
		confirmPassword: '',
	};

	const PASSWORD_REGEX = /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u;

	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.min(8, 'must be at least 8 characters')
			.max(72, 'cannot be maximum 72 characters')
			.matches(
				PASSWORD_REGEX,
				'Password must contain one uppercase letter, one lowercase letter and one digit!'
			)
			.required('Required!'),

		confirmPassword: Yup.string().when('password', {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref('password')],
				'Password does not match'
			),
		}),
	});

	const resetHandler = async (values) => {
		const config = {
			headers: {
				// prettier-ignore
				"Content-Type": "application/json",
			},
		};

		try {
			const { data } = await axios.put(
				`/reset/${match.params.resetToken}`,
				values,
				config
			);
			setSuccess(data.data);
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className='sign-page'>
			<div className='registration-form'>
				<h1>Reset Password</h1>
				{error && <div>{error}</div>}
				{success && (
					<div>
						{success} <Link to='/login'>Login</Link>
					</div>
				)}

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={resetHandler}
				>
					{(formik) => {
						return (
							<div>
								<Form>
									<FormikControl
										control='input'
										type='password'
										label='Password'
										name='password'
									/>
									<FormikControl
										control='input'
										type='password'
										label='Confirm Password'
										name='confirmPassword'
									/>
									<button
										className='create-btn'
										type='submit'
										disabled={!(formik.isValid && formik.dirty)}
									>
										Reset Password
									</button>
								</Form>
							</div>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default ResetPassword;
