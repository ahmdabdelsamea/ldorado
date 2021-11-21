import axios from 'axios';

export const getPublishableKey = async () => {
	try {
		const { data } = await axios.get('/getPublishableKey');
		return data;
	} catch (error) {
		console.log(error);
	}
};
