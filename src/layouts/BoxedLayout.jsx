
import { __ } from "@wordpress/i18n";
import { useSettingsBodyHeight } from "../lib/Helpers"; // Import utility function
import { Layout,} from '@douyinfe/semi-ui';
const BoxedLayout = (OriginalComponent, SidebarPosition='none', SidebarContent) => {   
    const { Sider, Content } = Layout;
    function NewComponent() {        
        const settingsBodyHeight = useSettingsBodyHeight();
        return (
            <>
                <div className="plugin-starter-settings container mx-auto px-4">
                    <Layout>
                        {SidebarPosition === 'left' &&
                            <Sider style={{ borderLeft: '1px solid var(--semi-color-border)' }}>
                                <SidebarContent/>
                            </Sider>
                        }
                        <Content style={{ padding: 24, minHeight: settingsBodyHeight}}>
                            {/* <OriginalComponent handleChange={handleChange} /> */}
                            <OriginalComponent />
                        </Content>
                        {SidebarPosition === 'right' &&
                            <Sider style={{ borderRight: '1px solid var(--semi-color-border)' }}>
                                <SidebarContent/>
                            </Sider>
                        }
                    </Layout>
                </div>
            </>
        )
    }
    return NewComponent;    
}
export default BoxedLayout;