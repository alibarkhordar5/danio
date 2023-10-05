import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'src/assets/fonts/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//
import App from './App';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HelmetProvider>
        <BrowserRouter>
            <Suspense>
                <App />
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
);

serviceWorkerRegistration.register();
