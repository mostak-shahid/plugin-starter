import React, {useMemo} from 'react'
import { __ } from "@wordpress/i18n";
import { Typography, Card, Space,  Table, Button, Carousel, } from '@douyinfe/semi-ui';
import { IconVerify, IconCrown, IconClose } from '@douyinfe/semi-icons';
export default function FreeVsPro() {
    const { Text, Paragraph, Title } = Typography;
    const columns = [
        {
            title: 'Features',
            dataIndex: 'feature',
        },
        {
            title: 'Free',
            dataIndex: 'free',
        },
        {
            title: <Space><IconCrown /><Text>Pro</Text></Space>,
            dataIndex: 'pro',
        },
    ];
    const data = [
        {
            key: '1',
            feature: 'Semi Design design draft.fig',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '2',
            feature: 'Semi Design share docs',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '3',
            feature: 'Design docs',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '4',
            feature: 'Semi Design design draft.fig',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '5',
            feature: 'Semi Design share docs',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '6',
            feature: 'Design docs',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '7',
            feature: 'Semi Design design draft.fig',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '8',
            feature: 'Semi Design share docs',
            free: <IconClose />,
            pro: <IconVerify />,
        },
        {
            key: '9',
            feature: 'Design docs',
            free: <IconClose />,
            pro: <IconVerify />,
        },
    ];
    //slider
    const items = [
        { id: 1, title: "Item 1" },
        { id: 2, title: "Item 2" },
        { id: 3, title: "Item 3" },
        { id: 4, title: "Item 4" },
        { id: 5, title: "Item 5" },
        { id: 6, title: "Item 6" },
    ];

    // Make "grouped" slides where each slide contains 3 items
    const groupedSlides = useMemo(() => {
        let result = [];
        for (let i = 0; i < items.length; i++) {
            result.push(items.slice(i, i + 3)); // 3 visible items
        }
        return result;
    }, [items]);
    return (
        <div className="plugin-starter-settings container mx-auto p-6">
            <Card
                className="mb-6"
                title={__('Free vs Pro Comparison', "plugin-starter")}
            >
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={false}
                    bordered
                    />
            </Card>
            <Card
                className="text-center"
            >
                <Title 
                    heading={2}
                    style={{marginBottom: 8}}
                >
                    {__("Ready to Upgrade to Pro?", "plugin-starter")}
                </Title>
                <Paragraph style={{marginBottom: 4}}>
                    {__("Unlock the full potential of Plugin Starter by upgrading to the Pro version. Enjoy advanced features, premium support, and exclusive updates designed to enhance your website.", "plugin-starter")}    
                </Paragraph>
                <Paragraph>
                    {__("Don't miss out on the benefits of Plugin Starter Pro. Upgrade today and take your website to the next level!", "plugin-starter")}
                </Paragraph>
                <Space style={{marginTop: 8}}>
                    <Button
                        theme="solid"
                        type="primary"
                         icon={<IconCrown />}
                    >
                        {__("Upgrade to Pro Now!", "plugin-starter")}
                    </Button>
                    <Button
                        theme="outline"
                        type="primary"
                    >
                        {__("See All Features", "plugin-starter")}
                    </Button>
                    <Button
                        theme="outline"
                        type="warning"
                    >
                        {__("Pro Live Demo", "plugin-starter")}
                    </Button>
                </Space>
            </Card>
        </div>
    )
}
