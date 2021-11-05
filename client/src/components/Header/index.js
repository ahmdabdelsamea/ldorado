import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Navbar from './Navbar';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			{/* <Dropdown isOpen={isOpen} toggle={toggle} /> */}
			<Navbar toggle={toggle} />
		</div>
	);
};
