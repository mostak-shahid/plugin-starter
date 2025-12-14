import { __ } from "@wordpress/i18n";
import { IllustrationIdle, Illustration404, Logo } from '../lib/Illustrations';
import BackgroundControl from './BackgroundControl/BackgroundControl';
import BoxShadowControl from './BoxShadowControl/BoxShadowControl';
import PluginCard from './PluginCard/PluginCard';
import ColorPickerControl from './ColorPickerControl/ColorPickerControl';
import MediaUploaderControl from './MediaUploaderControl/MediaUploaderControl';
import UnitControl from './UnitControl/UnitControl';
import { Skeleton, } from '@douyinfe/semi-ui';
const NotFound = () => (
    <div style={{ textAlign: 'center', padding: '40px' }}>
        <Illustration404 style={{ width: 250, height: 250, display: 'inline-block' }} />
        <h3>{__("404 - Page Not Found", "plugin-starter")}</h3>
    </div>
);
const SkeletonPlaceholder = () => (
    <>
        <Skeleton.Title style={{ width: '60%', marginBottom: 5 }} />
        <Skeleton.Paragraph rows={1} style={{ width: '70%' }}/>
    </>
);

export {
    BackgroundControl,
    BoxShadowControl,
    SkeletonPlaceholder,
    NotFound,
    PluginCard,
    ColorPickerControl,
    MediaUploaderControl,
    UnitControl,
};