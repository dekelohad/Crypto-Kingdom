import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ProgressLoader } from '../../components';
import { Banner, ErrorFallback } from './components';

const CoinsTable = lazy(() => import('./components/CoinsTable/CoinsTable'));

const Homepage = () => {
  return (
    <div>
      <Banner />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<ProgressLoader />}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Homepage;
