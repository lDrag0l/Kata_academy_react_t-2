import { createRoot } from 'react-dom/client'
import App from './Components/App'

import { Offline, Online } from "react-detect-offline";
import { Alert } from 'antd';
import { GenresProvider } from './Contexts/genresContext';

createRoot(document.getElementById('root')).render(
    <>
        <GenresProvider>
            <Online>
                <App />
            </Online>

            <Offline>
                <Alert message="No Internet Connection. Please check your network settings." type="error" />
            </Offline>
        </GenresProvider>
    </>
)
