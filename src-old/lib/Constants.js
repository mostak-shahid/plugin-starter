// src/lib/Constants.js
import { __ } from "@wordpress/i18n";
export const OPTIONS = [
    { label: __('Big', 'plugin-starter'), value: '100%' },
    { label: __('Medium', 'plugin-starter'), value: '50%' },
    { label: __('Small', 'plugin-starter'), value: '25%' },
]; 
export const UNITS = [
    { value: 'px', label: 'px' },
    { value: '%', label: '%' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' },
    { value: 'vw', label: 'vw' },
];

export const DEFAULT_BORDER = {
    color: '#72aee6',
    style: 'dashed',
    width: '1px',
};
const FALLBACK_COLORS = [
    { name: __('Primary', 'plugin-starter'), color: '#0064fa' },
    { name: __('Secondary', 'plugin-starter'), color: '#0095ee' },
    { name: __('Info', 'plugin-starter'), color: '#0064fa' },
    { name: __('Success', 'plugin-starter'), color: '#3bb346' },
    { name: __('Warning', 'plugin-starter'), color: '#fc8800' },
    { name: __('Danger', 'plugin-starter'), color: '#f93920' },
    { name: __('Red', 'plugin-starter'), color: '#ff4747' },
    { name: __('Yellow', 'plugin-starter'), color: '#fcff41' },
    { name: __('Blue', 'plugin-starter'), color: '#000097' },
    { name: __('Red 20', 'plugin-starter'), color: '#ff7b72' },
    { name: __('Yellow 20', 'plugin-starter'), color: '#fff56e' },
    { name: __('Blue 20', 'plugin-starter'), color: '#72aee6' },
    { name: __('Pink Flare', 'plugin-starter'), color: '#E1C0C8' },
    { name: __('Carissma', 'plugin-starter'), color: '#EA88A8' },
    { name: __('Ash', 'plugin-starter'), color: '#A09998' }, 
];
export const COLORS = [  
    ...FALLBACK_COLORS,
    ...(plugin_starter_ajax_obj?.default_colors ?? [])
];

export const FONT_SIZES = [
    {
        name: __('H1'),
        slug: 'h1',
        size: 40,
    },
    {
        name: __('H2'),
        slug: 'h2',
        size: 32,
    },
    {
        name: __('H3'),
        slug: 'h3',
        size: 28,
    },
    {
        name: __('H4'),
        slug: 'h4',
        size: 24,
    },
    {
        name: __('H5'),
        slug: 'h5',
        size: 20,
    },
    {
        name: __('H6'),
        slug: 'H6',
        size: 16,
    },
    {
        name: __('P'),
        slug: 'p',
        size: 12,
    },
];
export const DUOTONE_PALETTE = [
    { colors: [ '#8c00b7', '#fcff41' ], name: __('Purple and yellow', 'plugin-starter'), slug: 'purple-yellow' },
    { colors: [ '#000097', '#ff4747' ], name: __('Blue and red', 'plugin-starter'), slug: 'blue-red' },
];

export const COLOR_PALETTE = [
    { color: '#ff4747', name: __('Red', 'plugin-starter'), slug: 'red' },
    { color: '#fcff41', name: __('Yellow', 'plugin-starter'), slug: 'yellow' },
    { color: '#000097', name: __('Blue', 'plugin-starter'), slug: 'blue' },
    { color: '#8c00b7', name: __('Purple', 'plugin-starter'), slug: 'purple' },
];
const FALLBACK_GRADIENTS =[
    { name: __('Blue to purple', 'plugin-starter'), gradient: 'linear-gradient(135deg, #72aee6 0%, #8c00b7 100%)', slug: 'blue-purple' },
    { name: __('Red to yellow', 'plugin-starter'), gradient: 'linear-gradient(135deg, #ff4747 0%, #fcff41 100%)', slug: 'red-yellow' },
    { name: __('Green to blue', 'plugin-starter'), gradient: 'linear-gradient(135deg, #47ff74 0%, #72aee6 100%)', slug: 'green-blue' },
    { name: __('Purple to pink', 'plugin-starter'), gradient: 'linear-gradient(135deg, #8c00b7 0%, #ff47d1 100%)', slug: 'purple-pink' },
    { name: __('Orange to yellow', 'plugin-starter'), gradient: 'linear-gradient(135deg, #ff8c00 0%, #fcff41 100%)', slug: 'orange-yellow' },
    { name: __('Pink to purple', 'plugin-starter'), gradient: 'linear-gradient(135deg, #ff47d1 0%, #8c00b7 100%)', slug: 'pink-purple' },
    { name: __('JShine', 'plugin-starter'), gradient: 'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)', slug: 'jshine'},
    { name: __('Cool Blues', 'plugin-starter'), gradient: 'linear-gradient(135deg,#2193b0 0%,#6dd5ed 100%)', slug: 'cool-blues'},
    { name: __('Warm Flame', 'plugin-starter'), gradient: 'linear-gradient(135deg,#ff9a9e 0%,#fecfef 99%,#fecfef 100%)', slug: 'warm-flame'},
    { name: __('Night Fade', 'plugin-starter'), gradient: 'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)', slug: 'night-fade'},
    { name: __('Spring Warmth', 'plugin-starter'), gradient: 'linear-gradient(135deg,#fad0c4 0%,#ffd1ff 100%)', slug: 'spring-warmth'},
    { name: __('Juicy Peach', 'plugin-starter'), gradient: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)', slug: 'juicy-peach'},
    { name: __('Young Passion', 'plugin-starter'), gradient: 'linear-gradient(135deg,#ff8177 0%,#ff867a 0%,#ff8c7f 0%,#f99185 50%,#cf556c 100%)', slug: 'young-passion'},
    { name: __('Lady Lips', 'plugin-starter'), gradient: 'linear-gradient(135deg,#ff9a9e 0%,#fecfef 99%,#fecfef 100%)', slug: 'lady-lips'},
    { name: __('Sunny Morning', 'plugin-starter'), gradient: 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)', slug: 'sunny-morning'},
    { name: __('Rainy Ashville', 'plugin-starter'), gradient: 'linear-gradient(135deg,#fbc2eb 0%,#a6c1ee 100%)', slug: 'rainy-ashville'},
    { name: __('Frozen Dreams', 'plugin-starter'), gradient: 'linear-gradient(135deg,#fdcbf1 0%,#e6dee9 100%)', slug: 'frozen-dreams'},
    { name: __('Winter Neva', 'plugin-starter'), gradient: 'linear-gradient(135deg,#a1c4fd 0%,#c2e9fb 100%)', slug: 'winter-neva'},
    { name: __('Dusty Grass', 'plugin-starter'), gradient: 'linear-gradient(135deg,#d4fc79 0%,#96e6a1 100%)', slug: 'dusty-grass'},
    { name: __('Tempting Azure', 'plugin-starter'), gradient: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)', slug: 'tempting-azure'},
    { name: __('Heavy Rain', 'plugin-starter'), gradient: 'linear-gradient(135deg,#cfd9df 0%,#e2ebf0 100%)', slug: 'heavy-rain'},
    { name: __('Amy Crisp', 'plugin-starter'), gradient: 'linear-gradient(135deg,#a6c0fe 0%,#f68084 100%)', slug: 'amy-crisp'},
    { name: __('Mean Fruit', 'plugin-starter'), gradient: 'linear-gradient(135deg,#fccb90 0%,#d57eeb 100%)', slug: 'mean-fruit'},
    { name: __('Deep Blue', 'plugin-starter'), gradient: 'linear-gradient(135deg,#e0eafc 0%,#cfdef3 100%)', slug: 'deep-blue'},
    { name: __('Ripe Malinka', 'plugin-starter'), gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)', slug: 'ripe-malinka'},
    { name: __('Cloudy Knoxville', 'plugin-starter'), gradient: 'linear-gradient(135deg,#fdfbfb 0%,#ebedee 100%)', slug: 'cloudy-knoxville'},
    { name: __('Morpheus Den', 'plugin-starter'), gradient: 'linear-gradient(135deg,#30cfd0 0%,#330867 100%)', slug: 'morpheus-den'},
    { name: __('Rare Wind', 'plugin-starter'), gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)', slug: 'rare-wind'},
    { name: __('Near Moon', 'plugin-starter'), gradient: 'linear-gradient(135deg,#5ee7df 0%,#b490ca 100%)', slug: 'near-moon'},
    { name: __('Wild Apple', 'plugin-starter'), gradient: 'linear-gradient(135deg,#d299c2 0%,#fef9d7 100%)', slug: 'wild-apple'},
    { name: __('Saint Petersburg', 'plugin-starter'), gradient: 'linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)', slug: 'saint-petersburg'},
    { name: __('Moonlit Asteroid', 'plugin-starter'), gradient: 'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)', slug: 'moonlit-asteroid'},
    { name: __('Rastafarie', 'plugin-starter'), gradient: 'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)', slug: 'rastafari'},      
];
export const GRADIENTS = [
    ...FALLBACK_GRADIENTS,
    ...(plugin_starter_ajax_obj?.default_gradients ?? [])    
];