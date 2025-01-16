import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
//utils
import {ROUTER_URL} from 'utils/router-url';
//pages
const MainPage = lazy(() => import('./pages/Main'));

const App = () => {
	return (
		<div className="App">
			<Suspense fallback={<div>loader here</div>}>
				<BrowserRouter>
					<Routes>
						<Route path={ROUTER_URL.MAIN} element={<MainPage />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</div>
	);
};

export default App;
