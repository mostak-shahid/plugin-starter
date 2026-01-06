import React, { useState, useEffect } from '@wordpress/element';
import { Card, CardBody, CardHeader, Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalLogs: 0,
        recentActivity: []
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const response = await apiFetch({
                path: '/plugin-starter/v1/settings',
                method: 'GET',
            });
            
            // Simulate loading stats (you can extend this with real data)
            setStats({
                totalLogs: 125,
                recentActivity: [
                    { id: 1, message: 'Settings updated', time: '2 hours ago' },
                    { id: 2, message: 'Plugin activated', time: '1 day ago' },
                    { id: 3, message: 'User logged in', time: '2 days ago' }
                ]
            });
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <Spinner />
                <p>{__('Loading dashboard...', 'plugin-starter')}</p>
            </div>
        );
    }

    return (
        <div className="plugin-starter-dashboard">
            <div className="dashboard-header">
                <h2>{__('Welcome to Plugin Starter', 'plugin-starter')}</h2>
                <p>{__('Manage your plugin settings and view activity.', 'plugin-starter')}</p>
            </div>

            <div className="dashboard-grid">
                <Card className="dashboard-card">
                    <CardHeader>
                        <h3>{__('Quick Stats', 'plugin-starter')}</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="stat-item">
                            <span className="stat-label">{__('Total Logs:', 'plugin-starter')}</span>
                            <span className="stat-value">{stats.totalLogs}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">{__('Plugin Version:', 'plugin-starter')}</span>
                            <span className="stat-value">{window.pluginStarterData?.version || '1.0.0'}</span>
                        </div>
                    </CardBody>
                </Card>

                <Card className="dashboard-card">
                    <CardHeader>
                        <h3>{__('Recent Activity', 'plugin-starter')}</h3>
                    </CardHeader>
                    <CardBody>
                        <ul className="activity-list">
                            {stats.recentActivity.map(activity => (
                                <li key={activity.id} className="activity-item">
                                    <span className="activity-message">{activity.message}</span>
                                    <span className="activity-time">{activity.time}</span>
                                </li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>

                <Card className="dashboard-card">
                    <CardHeader>
                        <h3>{__('Quick Actions', 'plugin-starter')}</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="action-buttons">
                            <Button 
                                variant="primary"
                                href={window.pluginStarterData?.baseInputsUrl}
                            >
                                {__('Base Settings', 'plugin-starter')}
                            </Button>
                            <Button 
                                variant="secondary"
                                href={window.pluginStarterData?.arrayInputsUrl}
                            >
                                {__('Array Settings', 'plugin-starter')}
                            </Button>
                            <Button 
                                variant="secondary"
                                href={window.pluginStarterData?.feedbackUrl}
                            >
                                {__('Send Feedback', 'plugin-starter')}
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                <Card className="dashboard-card full-width">
                    <CardHeader>
                        <h3>{__('Getting Started', 'plugin-starter')}</h3>
                    </CardHeader>
                    <CardBody>
                        <ol className="getting-started-list">
                            <li>{__('Configure your base input settings', 'plugin-starter')}</li>
                            <li>{__('Set up array inputs for advanced configuration', 'plugin-starter')}</li>
                            <li>{__('Customize the plugin to fit your needs', 'plugin-starter')}</li>
                            <li>{__('Send us feedback to help improve the plugin', 'plugin-starter')}</li>
                        </ol>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;