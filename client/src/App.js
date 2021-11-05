import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

//Components
import { Header } from './components';
import ScrollToTop from './components/ScrollToTop';

function App() {
	return (
		<div>
			<Router>
				<ScrollToTop />
				<Header />
				<Routes />
			</Router>
		</div>
	);
}

export default App;
