import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function RadioButton(props) {
	const { label, name, options, ...rest } = props;
	return (
		<div className='form-control'>
			<div className='label-error'>
				<label>{label}</label>
				<ErrorMessage name={name} component={TextError} />
			</div>
			<Field name={name} {...rest}>
				{({ field }) => {
					return options.map((option) => {
						return (
							<React.Fragment key={option.key}>
								<input
									type='radio'
									id={option.value}
									{...field}
									value={option.value}
									checked={field.value === option.value}
								/>
								<label htmlFor={option.value}>{option.key}</label>
							</React.Fragment>
						);
					});
				}}
			</Field>
		</div>
	);
}

export default RadioButton;
