import React from 'react'
import { withForm } from '../../pages/withForm'
import BoxedLayout from '../../layouts/BoxedLayout';
const BoxedNoSidebar = () => {
    return (
        <>BoxedNoSidebar</>
    )
}
const Sidebar = () => {
    return (
        <>Sidebar</>
    )
}
export default BoxedLayout(BoxedNoSidebar, 'none', Sidebar);
