import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import './Certificates.css';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await userAPI.getCertificates();
            setCertificates(response.data);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadCertificate = (certificate) => {
        // Generate and download certificate PDF
        const certificateData = {
            ...certificate,
            issueDate: new Date().toLocaleDateString(),
            studentName: `${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')}`
        };
        
        // This would typically generate a PDF
        alert(`Downloading certificate for ${certificate.course_title}`);
        console.log('Certificate data:', certificateData);
    };

    if (loading) return <div className="loading-spinner"></div>;

    return (
        <div className="certificates-page">
            <div className="container">
                <div className="page-header">
                    <h1>My Certificates 🏆</h1>
                    <p>Your earned certificates and achievements</p>
                </div>

                {certificates.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📜</div>
                        <h3>No Certificates Yet</h3>
                        <p>Complete courses to earn certificates!</p>
                        <a href="/courses" className="cta-button primary">Browse Courses</a>
                    </div>
                ) : (
                    <div className="certificates-grid">
                        {certificates.map(certificate => (
                            <div key={certificate.certificate_id} className="certificate-card">
                                <div className="certificate-header">
                                    <div className="certificate-icon">🏆</div>
                                    <div className="certificate-info">
                                        <h3>{certificate.course_title}</h3>
                                        <p>Completed on {new Date(certificate.completed_at).toLocaleDateString()}</p>
                                        {certificate.quiz_score && (
                                            <span className="score">Score: {certificate.quiz_score}%</span>
                                        )}
                                    </div>
                                </div>
                                <div className="certificate-actions">
                                    <button 
                                        className="cta-button primary"
                                        onClick={() => downloadCertificate(certificate)}
                                    >
                                        Download Certificate
                                    </button>
                                    <button className="cta-button secondary">
                                        Share Achievement
                                    </button>
                                </div>
                                <div className="certificate-id">
                                    ID: {certificate.certificate_id}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="achievements-section">
                    <h2>Your Learning Journey</h2>
                    <div className="achievements-stats">
                        <div className="stat">
                            <h3>{certificates.length}</h3>
                            <p>Certificates Earned</p>
                        </div>
                        <div className="stat">
                            <h3>{Math.floor(certificates.length * 4.5)}</h3>
                            <p>Learning Hours</p>
                        </div>
                        <div className="stat">
                            <h3>{certificates.filter(c => c.quiz_score > 85).length}</h3>
                            <p>Excellent Scores</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificates;