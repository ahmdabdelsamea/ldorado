import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../redux/actions';
import FormikControl from '../../components/FormikComponents/FormikControl';
import { Failure, Loading } from '../../components';
import '../form.css';

function Register({ history }) {
	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error } = userRegister;

	const registerHandler = (values) => {
		dispatch(register(values, history));
	};

	const genders = [
		{ key: 'Male', value: 'male' },
		{ key: 'Female', value: 'female' },
	];

	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		gender: '',
		birthday: null,
	};

	// const PHONE_REGEX =
	// 	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const PASSWORD_REGEX = /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u;
	// const PASSWORD_REGEX =
	// 	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(3, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required!'),
		lastName: Yup.string()
			.min(3, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required!'),
		// phoneNumber: Yup.string()
		// 	.matches(PHONE_REGEX, 'Phone number is not valid')
		// 	.required('Required!'),
		email: Yup.string().email('Invalid Email!').required('Required!'),
		password: Yup.string()
			.min(8, 'must be at least 8 characters')
			.max(72, 'cannot be maximum 72 characters')
			.matches(
				PASSWORD_REGEX,
				'Password must contain one uppercase letter, one lowercase letter and one digit!'
			)
			.required('Required!'),

		// confirmPassword: Yup.string()
		// 	.oneOf([Yup.ref("password"), ""], "Password must match")
		// 	.required("Required"),
		passwordConfirmation: Yup.string().when('password', {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref('password')],
				'Password does not match'
			),
		}),
		gender: Yup.string().required('Required!'),
		birthday: Yup.date().required('Required!').nullable(),
	});

	return (
		<div className='form-page'>
			{loading && <Loading />}
			{error && <Failure failure={error} />}
			<div className='form-container'>
				<div className='router-wrapper'>
					<h1>Register</h1>
					<Link className='login-route' to='/login'>
						| LOGIN
					</Link>
				</div>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={registerHandler}
				>
					{(formik) => {
						return (
							<div>
								<Form className='form-grid'>
									<div className='one-column'>
										<FormikControl
											className='first-name'
											control='input'
											type='text'
											label='First Name'
											name='firstName'
										/>
									</div>
									<div className='one-column'>
										<FormikControl
											control='input'
											type='text'
											label='Last Name'
											name='lastName'
										/>
									</div>
									{/* <FormikControl
										control='phoneNumber'
										label='Phone Number'
										name='phoneNumber'
									/> */}
									<div className='two-columns'>
										<FormikControl
											control='input'
											type='email'
											label='Email'
											name='email'
										/>
									</div>
									<div className='two-columns'>
										<FormikControl
											control='input'
											type='password'
											label='Password'
											name='password'
										/>
									</div>
									<div className='two-columns'>
										<FormikControl
											control='input'
											type='password'
											label='Confirm Password'
											name='passwordConfirmation'
										/>
									</div>
									<FormikControl
										control='radio'
										label='Gender'
										name='gender'
										options={genders}
									/>
									<FormikControl
										control='date'
										label='Birthday'
										name='birthday'
									/>
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
										>
											Creat a new account
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
}

export default Register;
