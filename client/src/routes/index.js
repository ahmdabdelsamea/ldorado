import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Learn from './Learn';
import Invest from './Invest';
import Buy from './Buy';
import Sell from './Sell';
import Rent from './Rent';

import Property from './Property';
import AddProperty from './AddProperty';

import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Checkout from './Checkout';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import PrivateRoute from './PrivateRoute';

import About from './About';
import NotFound from './NotFound';
import Disclosure from './Disclosure';
import Privacy from './Privacy';
import Terms from './Terms';

const Routes = () => {
	return (
		<div className='content'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/learn' component={Learn} />
				<Route exact path='/invest' component={Invest} />
				<Route exact path='/buy' component={Buy} />

				<Route exact path='/rent' component={Rent} />
				<Route path='/invest/:id' component={Property} />

				<PrivateRoute exact path='/sell' component={Sell} />
				<Route exact path='/sell/add' component={AddProperty} />

				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/forgot' component={ForgotPassword} />
				<Route exact path='/reset/:resetToken' component={ResetPassword} />

				<Route exact path='/about' component={About} />
				<Route exact path='/disclosure' component={Disclosure} />
				<Route exact path='/terms' component={Terms} />
				<Route exact path='/privacy' component={Privacy} />
				<Route exact path='/checkout' component={Checkout} />
				<Route path='*' component={NotFound} />
			</Switch>
		</div>
	);
};

export default Routes;
