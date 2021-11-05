import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

function DatePicker(props) {
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
							selected={value}
							onChange={(val) => setFieldValue(name, val)}
							maxDate={new Date().setDate(new Date().getDate() - 6574)}
							// maxDate={subDays(new Date(), 6574)}
							dropdownMode='select'
							scrollableMonthYearDropdown
							showDisabledMonthNavigation
							withPortal
							fixedHeight
							// peekNextMonth
							showMonthDropdown
							showYearDropdown
						/>
					);
				}}
			</Field>
		</div>
	);
}

export default DatePicker;
