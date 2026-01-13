import { __ } from "@wordpress/i18n";
import { 
    Layout,
    Typography,
    Banner, 
    Breadcrumb,
    Card,
} from '@douyinfe/semi-ui';
import { IconInfoCircle } from '@douyinfe/semi-icons';
import VerticalMenu from './VerticalMenu';
import HorizontalMenu from './HorizontalMenu';
import './Semi.scss';

import {Logo} from '../../lib/Illustrations';
import Sidebar from "./Sidebar";
import BasicDemoWithInit from "./BasicDemoWithInit";

import Details from '../../data/details.json';

export default function Semi() {
    const { Header, Footer, Sider, Content } = Layout;
    const { Title, Text } = Typography;
    const routes = ['Home', 'The is a very very very very long title', 'Detail'];
    
    return ( 
        <>
            <Banner 
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
            <Layout className="components-layout-demo">
                <Header>                    
                    <HorizontalMenu/>
                </Header>
                <Layout>
                    <Sider>
                        <VerticalMenu />
                    </Sider>
                    <Content style={{ padding: 24, minHeight: 280, backgroundColor: 'var(--semi-color-bg-4)'}}>                        
                        <Breadcrumb
                            routes={routes}
                            style={{ padding: 10, backgroundColor: 'var(--semi-color-bg-3)', border: '1px solid var(--semi-color-border)', marginBottom: 24 }}
                        />
                        <Card 
                            title={
                                <>
                                <Title heading={6} style={{ margin: '8px 0' }} >h6. Semi Design</Title>
                                <Text>Welcome to Semi Design</Text>
                                </>
                            }
                            style={{ borderRadius: 0 }}
                            headerExtraContent={
                                <Text link>
                                    More
                                </Text>
                            }
                        >
                            <BasicDemoWithInit />
                        </Card>
                    </Content>
                </Layout>
                <Footer 
                    style={{borderTop: '1px solid var(--semi-color-border)', padding: '15px 0', backgroundColor: 'var(--semi-color-fill-0)'}}
                >
                    Footer
                </Footer>
            </Layout>
        </>       
    )
}
