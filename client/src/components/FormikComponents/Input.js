import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Input(props) {
	const { name, label, ...rest } = props;
	return (
		<div className='form-control'>
			<div className='label-error'>
				<label htmlFor={name}>{label}</label>
				<ErrorMessage name={name} component={TextError} />
			</div>
			<Field id={name} name={name} {...rest} />
		</div>
	);
}

export default Input;
