import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import Timeline from './Timeline';
import html2canvas from 'html2canvas';

import { useLocation, useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [username, setUsername] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    // Load dark mode state from localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.body.classList.toggle('dark-mode', savedMode);
    }, []);

    // Toggle dark mode and persist state
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.body.classList.toggle('dark-mode', newMode);
        localStorage.setItem('darkMode', newMode);
    };

    // Fetch boards and manage the loader timing
    useEffect(() => {
        const fetchBoards = async () => {
            const minLoadingTime = 3000; // Minimum time for loading screen
            const startTime = Date.now();

            try {
                const response = await fetch('http://localhost:4000/api/pinterest/fetchAllPins', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the request content type is set correctly
                        'Authorization': `${token}`, // Add token from localStorage
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch boards');
                const data = await response.json();
                console.log(data);
                setBoards(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(minLoadingTime - elapsedTime, 0);
                setTimeout(() => setLoading(false), remainingTime);
            }
        };

        fetchBoards();
    }, []);

   
    const captureScreenshot = () => {
        // Select the Save button, toggle switch, and h1 tag
        const saveButton = document.querySelector('.screenshot-button');
        const toggleSwitch = document.querySelector('.dark-mode-switch');
        const h1Tag = document.querySelector('.timeline-title'); // Assuming your h1 tag has the class 'timeline-title'
        const header = document.querySelector('.header-container'); // Assuming your header has the class 'header-container'
    
        // Store the original display values of the save button and toggle switch
        const saveButtonOriginalDisplay = saveButton ? saveButton.style.display : 'block';
        const toggleSwitchOriginalDisplay = toggleSwitch ? toggleSwitch.style.display : 'block';
    
        // Hide the Save button and toggle switch for the screenshot
        if (saveButton) saveButton.style.display = 'none';
        if (toggleSwitch) toggleSwitch.style.display = 'none';
    
        // Get the height of the header to position the h1 tag below it
        const headerHeight = header ? header.offsetHeight : 0; // Default to 0 if header is not found
    
        // Position the h1 tag just below the header
        if (h1Tag) {
            // Temporarily adjust the position of the h1 tag
            const originalPosition = h1Tag.style.position;
            const originalMarginTop = h1Tag.style.marginTop;
    
            h1Tag.style.position = 'relative';  // Make it relative so we can position it from the top
            h1Tag.style.marginTop = `${headerHeight}px`;  // Position below the header
            h1Tag.style.zIndex = '1000';  // Ensure it appears on top of other elements
    
            // Capture the screenshot of the visible viewport
            const isDarkMode = document.body.classList.contains('dark-mode');  // Check if dark mode is applied
            const backgroundColor = isDarkMode ? '#121212' : '#ffffff';  // Set background color based on dark mode
    
            html2canvas(document.body, {
                scrollX: 0,  // Ignore horizontal scroll
                scrollY: 0,  // Ignore vertical scroll
                backgroundColor: backgroundColor,  // Set background color based on mode
                width: window.innerWidth,  // Capture the width of the viewport
                height: window.innerHeight,  // Capture the height of the viewport
                x: window.scrollX,  // Capture starting position of horizontal scroll
                y: window.scrollY,  // Capture starting position of vertical scroll
                useCORS: true,  // Ensure external resources are included properly
            }).then((canvas) => {
                // Convert the canvas to an image
                const image = canvas.toDataURL('image/png');
    
                // Create a link to download the image
                const link = document.createElement('a');
                link.href = image;
                link.download = 'viewport_screenshot.png';  // Name of the downloaded image
                link.click();
    
                // Restore the visibility of the Save button and toggle switch
                if (saveButton) saveButton.style.display = saveButtonOriginalDisplay;
                if (toggleSwitch) toggleSwitch.style.display = toggleSwitchOriginalDisplay;
    
                // Restore the original position of the h1 tag
                if (h1Tag) {
                    h1Tag.style.position = originalPosition;
                    h1Tag.style.marginTop = originalMarginTop;
                }
            });
        }
    };
    
    
    
    
    
    
    
    


    return (
        <div>
            {/* Header */}
            <div className="header-container">
                <div className="app-name">SnapVoyage</div>
                <div className="dark-mode-switch">
                    <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    <label className="switch">
                        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-container">
                {/* Main title for Your Timeline */}
                <h1 className="timeline-title">Your Memories in Focus: A Journey Through Time</h1>

                {loading ? (
                    <div className="loading-screen">
                        <div className="spinner"></div>
                        <p>Loading your Pinterest Boards...</p>
                    </div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div className="timeline-container">
                        <Timeline events={boards} />
                    </div>
                )}
            </div>

            {/* Screenshot button with dynamic class for light/dark mode */}
            <button
                className={`screenshot-button ${darkMode ? 'dark-mode' : 'light-mode'}`}
                onClick={captureScreenshot}
            >
                Save
            </button>
        </div>
    );
};

export default Dashboard;
