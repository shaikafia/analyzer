import React, { useState } from 'react';  
import axios from 'axios';  

function App() {  
    const [url, setUrl] = useState('');  
    const [metrics, setMetrics] = useState(null);  
    const [error, setError] = useState('');  

    const analyzeWebsite = async () => {  
        setError('');  
        try {  
            const response = await axios.post('http://localhost:5000/analyze', { url });  
            setMetrics(response.data);  
        } catch (error) {  
            setError('Error analyzing the website');  
        }  
    };  

    return (  
        <div style={{ padding: '20px' }}>  
            <h1>Website Performance Analyzer</h1>  
            <input  
                type="text"  
                value={url}  
                onChange={(e) => setUrl(e.target.value)}  
                placeholder="Enter website URL"  
                style={{ width: '300px', marginRight: '10px' }}  
            />  
            <button onClick={analyzeWebsite}>Analyze</button>  
            {error && <p style={{ color: 'red' }}>{error}</p>}  
            {metrics && (  
                <div>  
                    <h2>Performance Metrics</h2>  
                    <p>Load Time: {metrics.loadTime} ms</p>  
                    <p>Total Requests: {metrics.totalRequests}</p>  
                    <p>Total Request Size: {metrics.totalRequestSize} bytes</p>  
                </div>  
            )}  
        </div>  
    );  
}  

export default App;
