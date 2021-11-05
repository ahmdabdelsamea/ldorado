import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';

function PhoneNumber(props) {
	const { label, name, ...rest } = props;
	return (
		<div className='form-control'>
			<div className='label-error'>
				<label htmlFor={name}>{label}</label>
				<ErrorMessage name={name} component={TextError} />
			</div>
			<Field name={name}>
				{({ form, field }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return (
						<PhoneInput
							id={name}
							{...field}
							{...rest}
							country={'us'}
							value={value}
							enableSearch={true}
							countryCodeEditable={false}
							onChange={(val) => setFieldValue(name, val)}
							inputProps={{
								required: true,
							}}
						/>
					);
				}}
			</Field>
		</div>
	);
}

export default PhoneNumber;
