import { createRoot } from 'react-dom/client'
import App from './Components/App'

import { Offline, Online } from "react-detect-offline";
import { Alert } from 'antd';

createRoot(document.getElementById('root')).render(
    <>
        <Online>
            <App />
        </Online>

        <Offline>
            <Alert message="No Internet Connection. Please check your network settings." type="error" />
        </Offline>
    </>
)
