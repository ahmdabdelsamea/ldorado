import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Select(props) {
	const { label, name, options, ...rest } = props;
	return (
		<div className='form-control'>
			<div className='label-error'>
				<label htmlFor={name}>{label}</label>
				<ErrorMessage name={name} component={TextError} />
			</div>
			<Field as='select' id={name} name={name} {...rest}>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.key}
						</option>
					);
				})}
			</Field>
		</div>
	);
}

export default Select;
