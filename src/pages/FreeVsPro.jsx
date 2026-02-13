import { __ } from "@wordpress/i18n";
import * as Bootstrap from 'react-bootstrap';
const { Card, Table, Button } = Bootstrap;
import { BoxedLayout } from '../layouts';

const FreeVsPro = () => {
    const columns = [
        { title: 'Features', dataIndex: 'feature', key: 'feature' },
        { title: 'Free', dataIndex: 'free', key: 'free' },
        { title: 'Pro', dataIndex: 'pro', key: 'pro' },
    ];
    const data = [
        { key: '1', feature: 'Semi Design design draft.fig', free: '❌', pro: '✅' },
        { key: '2', feature: 'Semi Design share docs', free: '❌', pro: '✅' },
        { key: '3', feature: 'Design docs', free: '❌', pro: '✅' },
        { key: '4', feature: 'Semi Design design draft.fig', free: '❌', pro: '✅' },
        { key: '5', feature: 'Semi Design share docs', free: '❌', pro: '✅' },
        { key: '6', feature: 'Design docs', free: '❌', pro: '✅' },
        { key: '7', feature: 'Semi Design design draft.fig', free: '❌', pro: '✅' },
        { key: '8', feature: 'Semi Design share docs', free: '❌', pro: '✅' },
        { key: '9', feature: 'Design docs', free: '❌', pro: '✅' },
    ];
    return (
        <BoxedLayout>
            <Table columns={columns} dataSource={data} pagination={false} bordered className="mb-4" />
            
            <Card className="text-center rounded-0">
                <h2 className="mb-2">{__("Ready to Upgrade to Pro?", "plugin-starter")}</h2>
                <p className="mb-2">
                    {__("Unlock the full potential of Plugin Starter by upgrading to the Pro version. Enjoy advanced features, premium support, and exclusive updates designed to enhance your website.", "plugin-starter")}
                </p>
                <p className="mb-3">
                    {__("Don't miss out on the benefits of Plugin Starter Pro. Upgrade today and take your website to the next level!", "plugin-starter")}
                </p>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <Button variant="primary">👑 {__("Upgrade to Pro Now!", "plugin-starter")}</Button>
                    <Button variant="outline-primary">{__("See All Features", "plugin-starter")}</Button>
                    <Button variant="outline-warning">{__("Pro Live Demo", "plugin-starter")}</Button>
                </div>
            </Card>
        </BoxedLayout>
    );
};

export default FreeVsPro;
