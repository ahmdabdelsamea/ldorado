import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDashboard, logout } from '../../redux/actions';
import { InvestCard, PortfolioCard, Failure, Loading } from '../../components';
import './dashboard.css';

const Dashboard = ({ history }) => {
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { authToken } = userLogin;

	useEffect(() => {
		dispatch(getDashboard());
	}, [dispatch, authToken, history]);

	const dashboardDetails = useSelector((state) => state.dashboardDetails);
	const { loading, error, dashboard } = dashboardDetails;

	const handleLogout = () => {
		dispatch(logout(history));
	};

	const handleEdit = () => {
		history.push('/edit');
	};

	return (
		<div className='dashboard-scroll'>
			{loading ? (
				<Loading />
			) : error ? (
				<Failure>{error}</Failure>
			) : (
				<div className='dashboard-page'>
					<div className='wallet'>
						<div className='wallet-column-one'>
							<p>Your Wallet</p>
							<h2>
								{dashboard.firstName} {dashboard.lastName}
							</h2>

							<h3>USD {addDecimals(Number(dashboard.wallet).toFixed(2))}</h3>
							<button
								className='add-funds'
								onClick={() => history.push('/funds')}
							>
								+ Add Funds
							</button>
						</div>
					</div>
					<div className='yours'>
						<div className='tabs-container'>
							<div className='bloc-tabs'>
								<button
									className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
									onClick={() => toggleTab(1)}
								>
									Your Investments
								</button>
								<button
									className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
									onClick={() => toggleTab(2)}
								>
									Listed Properties
								</button>
							</div>

							<div className='content-tabs'>
								<div
									className={
										toggleState === 1
											? 'tab-content  active-tab-content'
											: 'tab-content'
									}
								>
									<div className='property-overview'>
										<div className='negative-margin'>
											<div className='property-list'>
												{dashboard.investedInProperties.map((propertyCard) => (
													<div key={propertyCard._id}>
														<PortfolioCard property={propertyCard} />
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
								<div
									className={
										toggleState === 2
											? 'tab-content  active-tab-content'
											: 'tab-content'
									}
								>
									<div className='property-overview'>
										<div className='negative-margin'>
											<div className='property-list'>
												{dashboard.listedProperties.map((propertyCard) => (
													<div key={propertyCard._id}>
														<InvestCard property={propertyCard} />
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='logout-edit-container'>
						<button className='logout-edit-btn' onClick={handleEdit}>
							Edit
						</button>
						<button className='logout-edit-btn' onClick={handleLogout}>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
