import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../redux/actions';
import FormikControl from '../../components/FormikComponents/FormikControl';
import { Failure, Loading } from '../../components';
import '../form.css';

const Login = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error } = userLogin;

	const loginHandler = (values) => {
		dispatch(login(values, history));
	};

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email!').required('Required!'),
		password: Yup.string().required('Required!'),
	});

	return (
		<div className='form-page'>
			{loading && <Loading />}
			{error && <Failure failure={error} />}
			<div className='form-container'>
				<div className='router-wrapper'>
					<h1>LOGIN</h1>
					<Link className='login-route' to='/register'>
						| REGISTER
					</Link>
				</div>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={loginHandler}
				>
					{(formik) => {
						return (
							<div>
								<Form className='form-grid'>
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
									{/* <Link className='forget-route' to='/forgot'>
										Forgot Password
									</Link> */}
									<div className='two-columns'>
										<button
											className='create-btn'
											type='submit'
											disabled={!(formik.isValid && formik.dirty)}
										>
											Login
										</button>
									</div>
								</Form>
								{/* <div className='router-wrapper'>
									<Link className='login-route' to='/register'>
										Create a new account
									</Link>
								</div> */}
							</div>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
