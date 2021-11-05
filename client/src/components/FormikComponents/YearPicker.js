import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

function YearPicker(props) {
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
						<DateView
							className='datePicker'
							id={name}
							{...field}
							{...rest}
							showYearPicker
							selected={value}
							onChange={(val) => setFieldValue(name, val)}
							dateFormat='yyyy'
							dropdownMode='select'
							fixedHeight
							maxDate={new Date()}
							openToDate={new Date('2005/01/01')}
							// withPortal
						/>
					);
				}}
			</Field>
		</div>
	);
}

export default YearPicker;
