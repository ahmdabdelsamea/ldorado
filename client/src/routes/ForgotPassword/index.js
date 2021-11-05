import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { forgotPasswordAction } from '../../redux/actions';
import { Failure, Loading } from '../../components';
import FormikControl from '../../components/FormikComponents/FormikControl';
import '../form.css';

const ForgotPassword = ({ history }) => {
	const dispatch = useDispatch();

	const forgotPassword = useSelector((state) => state.forgotPassword);
	const { loading, error } = forgotPassword;

	const initialValues = {
		email: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email!').required('Required!'),
	});

	const forgotHandler = (values) => {
		dispatch(forgotPasswordAction(values, history));
	};

	return (
		<div className='form-page'>
			{loading && <Loading />}
			{error && <Failure failure={error} />}
			<div className='form-container'>
				<div className='router-wrapper'>
					<h1>Forgot Password</h1>
					<Link className='login-route' to='/login'>
						|LOGIN
					</Link>
				</div>
				<p className='send-email-p'>
					Please enter your email and an email with instructions will be sent to
					your inbox to reset your password.
				</p>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={forgotHandler}
				>
					{(formik) => {
						return (
							<div>
								<Form>
									<FormikControl
										control='input'
										type='email'
										label='Email'
										name='email'
									/>
									<div className='send-email-btn'>
										<button
											className='create-btn'
											type='submit'
											disabled={!(formik.isValid && formik.dirty)}
										>
											Send Reset Password Link
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

export default ForgotPassword;
