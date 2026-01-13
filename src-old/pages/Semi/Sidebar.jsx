import { useState, useEffect } from 'react';
import { 
    Nav, 
} from '@douyinfe/semi-ui';
import {
    IconStar,
    IconUser,
    IconUserGroup,
    IconSetting,
    IconEdit,
} from '@douyinfe/semi-icons';

const items = [
    { itemKey: 'user', text: 'User Management', icon: <IconUser />, url:'/semi/user' },
    { itemKey: 'union', text: 'Union Center', icon: <IconStar />, url:'/semi/union' },
    {
        itemKey: 'union-management',
        text: 'Union Management',
        icon: <IconUserGroup />,
        url:'/semi/union-management',
        items: [
            { itemKey: 'announcement-settings', text: 'Announcement Settings', url:'/semi/union-management/announcement-settings' },
            { itemKey: 'union-query', text: 'Union Query', url:'/semi/union-management/union-query' },
            { itemKey: 'entry-information', text: 'Entry Information', url:'/semi/union-management/entry-information' },
        ],
    },
    {
        itemKey: 'approve-management',
        text: 'Approval Management',
        icon: <IconEdit />, 
        url:'/semi/approve-management',
        items: [
            // 'Check-in Review',
            { itemKey: 'check-in-review', text: 'Check-in Review', url:'/semi/approve-management/check-in-review' },
            {
                itemKey: 'operation-management',
                text: 'Operations Management',
                url:'/semi/approve-management/operation-management',
                items: [
                    { itemKey: 'personnel-management', text: 'Personnel Management', url:'/semi/approve-management/operation-management/personnel-management' },
                    { itemKey: 'personnel-change', text: 'Personnel Change', url:'/semi/approve-management/operation-management/personnel-change' },
                ],
            },
        ],
    },
    {
        text: 'Task Platform',
        icon: <IconSetting />,
        itemKey: 'job', 
        url:'/semi/job',
        items: [
            { itemKey: 'task-management', text: 'Task Management', url:'/semi/job/task-management' },
            { itemKey: 'user-task-query', text: 'User Task Query', url:'/semi/job/user-task-query' },
        ],
    },
];

export default function Sidebar() {
    const MOBILE_BREAKPOINT = 782;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
    // Handle responsive change
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <Nav
                isCollapsed={isMobile}
                items={items}
                onSelect={(key) => console.log(key)}
                footer={{
                    collapseButton: true,
                }}
            />
        </>
    )
}
