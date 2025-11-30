import { useMain } from '../../contexts/MainContext';
import { useLocation } from 'react-router-dom';
import { Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;



/**
 * Recursive page finder
 */
const findPageInfo = (menuArray, path) => {
    for (const item of menuArray) {

        if (item.url === path) {
            return {
                title: item.text,
                description: item.description,
            };
        }

        if (item.items && Array.isArray(item.items)) {
            const found = findPageInfo(item.items, path);
            if (found) return found;
        }
    }

    return null;
};

/**
 * Page Info Component
 */
const PageInfo = ({ url }) => {
    const { settingsMenu } = useMain();    // ⚡ now reading array, not object
    const location = useLocation();
    
    // Prefer explicit URL, fallback to router's actual path
    const currentPath = url || location.pathname;

    const pageInfo = findPageInfo(settingsMenu, currentPath);

    if (!pageInfo) return null;

    return (
        <div className="page-info">
            <Title heading={3} className="page-title">
                {pageInfo.title}
            </Title>

            {pageInfo.description && (
                <Paragraph className="page-description">
                {pageInfo.description}
                </Paragraph>
            )}
        </div>
    );
};

export default PageInfo;
