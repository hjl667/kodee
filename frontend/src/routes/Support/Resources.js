import React from 'react';

const Resources = () => {
    // Use relative URLs for the files since they're stored locally in the public directory
    const excelDownloadLink = '/downloads/health.xlsx';
    const audioDownloadLink = '/downloads/test_audio.mp3';
    const cymoWebsiteLink = 'https://www.cymo.io/en/audiodriver.html';
    const loopbackWebsiteLink = 'https://rogueamoeba.com/loopback/';

    return (
        <div className="ResourceContainer">
            <div className="download-buttons">
                <a href={excelDownloadLink} download>
                    <button className="FileDownload">Download Sample Glossary</button>
                </a>
                <a href={audioDownloadLink} download>
                    <button className="FileDownload">Download Sample Audio</button>
                </a>
            </div>
            <div className="website-links">
                <a href={cymoWebsiteLink} target="_blank" rel="noopener noreferrer">Cymo Audio Driver</a>
                <a href={loopbackWebsiteLink} target="_blank" rel="noopener noreferrer">Loopback</a>
            </div>
        </div>

    );
};

export default Resources;
