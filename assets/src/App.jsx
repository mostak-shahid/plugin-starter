import React, { useState, useEffect, Suspense  } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";

import { Layout, Typography, Banner, Space, Badge, Button, SideSheet, Col, Row, Tag, Modal, } from '@douyinfe/semi-ui';
import { IconStar, IconSetting, IconHome, IconMember, IconBookStroked, IconHelpCircleStroked, IconBellStroked, IconSun, IconMoon, IconTemplate,IconCustomerSupport, IconFile, } from '@douyinfe/semi-icons';
import { LocaleProvider } from '@douyinfe/semi-ui';
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";

const { Title, Text, Paragraph } = Typography;

export default function App() {
    return (
        <LocaleProvider locale={en_US}>
            <div className="plugin-starter-settings-container semi-scope" style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
                    <Banner 
                        className="plugin-starter-promote-banner"
                        fullMode={false}
                        type="info"
                        description={
                            <>
                                <Text>{__('You\'re currently using the Free plan. ', 'plugin-starter')}</Text>
                                <Text>{__('Some settings and features are only available in ', 'plugin-starter')}</Text>
                                <b><Text link={{ href: 'https://semi.design', target: '_blank' }}>{__('Pro version.', 'plugin-starter')}</Text></b>
                            </>
                        }
                    />
                <Title heading={3}>Plugin Starter</Title>

                <div className="mt-4">
                    <Button type="primary">
                        Semi UI Button
                    </Button>
                </div>
            </div>

        </LocaleProvider>
    );
}
