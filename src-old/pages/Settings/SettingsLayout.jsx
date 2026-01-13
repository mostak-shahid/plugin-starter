import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Row, Col, Layout, Typography } from '@douyinfe/semi-ui';
import { BreadcrumbControl } from '../../components';

const { Content } = Layout;
const { Title } = Typography;

const SettingsLayout = () => {
    const location = useLocation();
    
    return (
        <div className="settings-layout-wrapper">
            <Row type="flex" gutter={24} className="mb-4">
                <Col xs={24}>
                    <Title heading={3}>Settings</Title>
                </Col>
            </Row>
            <Content>
                <Outlet key={location.pathname} />
            </Content>
        </div>
    );
};

export default SettingsLayout;
