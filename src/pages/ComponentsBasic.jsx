// import '@coreui/icons/css/all.css';
import { __ } from "@wordpress/i18n";
import React, {useState} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    Panel, 
    PanelBody, 
    AlignmentMatrixControl, 
    AnglePickerControl,
    BorderBoxControl,
    BorderControl,
    BoxControl,
    // Button
    Button, 
    ButtonGroup,
    ClipboardButton,
    Composite,
    DatePicker,
    DateTimePicker,
    // Button
    // Card
    Card,
    CardHeader,
    CardBody,
    CardMedia,
    CardDivider,
    CardFooter,
    // Card
    // Form Elements
    CheckboxControl,
    TextControl,
    CustomSelectControl,
    FormFileUpload,
    FormToggle,
    TextareaControl,
    // Form Elements
    // Color
    ColorIndicator,
    ColorPalette,
    ColorPicker,
    DuotonePicker, 
    DuotoneSwatch,
    GradientPicker,
    // Color
    ComboboxControl,
    Dashicon,
    Draggable,
    DropZone,
    //Menu
    DropdownMenu, 
    MenuGroup, 
    MenuItem,
    MenuItemsChoice,
    Dropdown,
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
    //Menu
    ExternalLink,
    // Flex
    Flex, 
    FlexBlock, 
    FlexItem,
    // Flex
    FocalPointPicker,
    FocusableIframe,
    FontSizePicker,

    FormTokenField,
    Guide,
    navigateRegions,
    IsolatedEventContainer,
    Modal,
    NavigableMenu,
    TabbableContainer,
    Navigator,
    Notice,
    Placeholder,
    Popover,
    ProgressBar,
    RadioControl,
    RangeControl,
    SandBox,
    ScrollLock,
    SearchControl,
    SelectControl,
    Snackbar,
    Spinner,
    TabPanel,
    TextHighlight,
    ToggleControl,
    Tooltip,

    Toolbar, 
    ToolbarButton,
    ToolbarDropdownMenu,
    ToolbarGroup, 
    ToolbarItem,

    __experimentalTruncate as Truncate,

    __experimentalInputControl as InputControl,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    __experimentalConfirmDialog as ConfirmDialog,
    __experimentalDimensionControl as DimensionControl,
    __experimentalDivider as Divider,
    __experimentalElevation as Elevation,
    __experimentalSurface as Surface,
    __experimentalGrid as Grid,
    __experimentalHStack as HStack,
    __experimentalNavigation as Navigation,
    __experimentalNavigationGroup as NavigationGroup,
    __experimentalNavigationItem as NavigationItem,
    __experimentalNavigationMenu as NavigationMenu,
    __experimentalNumberControl as NumberControl,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalScrollable as Scrollable,
    __experimentalSpacer as Spacer,
    __experimentalView as View,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,


} from '@wordpress/components';
import { 
    Icon, 
    more, 
    envelope, 
    rotateRight, 
    check, 
    trash, 
    formatLowercase, 
    formatUppercase, 
    pencil,
    arrowLeft,
    arrowRight,
    arrowUp,
    arrowDown,
    paragraph, 
    formatBold, 
    formatItalic, 
    link,
    help,
} from '@wordpress/icons'; // Example icon
import { UNITS, GRADIENTS, COLORS, DUOTONE_PALETTE, COLOR_PALETTE, DEFAULT_BORDER, FONT_SIZES, OPTIONS } from '../lib/Constants';
const onTabSelect = ( tabName ) => {
    console.log( 'Selecting tab', tabName );
};

const ComponentsBasic = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [ processing, setProcessing ] = useState('normal');
    const [ alignment, setAlignment ] = useState( 'center center' );
    const [ angle, setAngle ] = useState( 0 );
    const [ borders, setBorders ] = useState( {
        top: DEFAULT_BORDER,
        right: DEFAULT_BORDER,
        bottom: DEFAULT_BORDER,
        left: DEFAULT_BORDER,
    } );
    const [ border, setBorder ] = useState();
    const [ values, setValues ] = useState( {
        top: '50px',
        left: '10%',
        right: '10%',
        bottom: '50px',
    } );
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ toggle, setToggle ] = useState( true );
    const [ hasCopied, setHasCopied ] = useState( false );
    const [ color, setColor ] = useState ( '#f00' );
    const [ duotone, setDuotone ] = useState( [ '#000000', '#ffffff' ] );
    const [ gradient, setGradient ] = useState( null );

    
    //ComboboxControl
    const options = [
        { value: 'small', label: 'Small' },
        { value: 'normal', label: 'Normal' },
        { value: 'large', label: 'Large' },
    ];
    const [ fontSize, setFontSize ] = useState('');
    const [ filteredOptions, setFilteredOptions ] = useState( options );
    const [ isLoading, setIsLoading ] = useState(false);

    //ComboboxControl
    // CustomSelectControl
    const optionsCustomSelectControl = [
        {
            key: 'small',
            name: 'Small',
            style: { fontSize: '50%' },
        },
        {
            key: 'normal',
            name: 'Normal',
            style: { fontSize: '100%' },
        },
        {
            key: 'large',
            name: 'Large',
            style: { fontSize: '200%' },
        },
        {
            key: 'huge',
            name: 'Huge',
            style: { fontSize: '300%' },
        },
    ];
    // CustomSelectControl
    const [ paddingSize, setPaddingSize ] = useState( '' );
    const [ hasDropped, setHasDropped ] = useState( false );

    // FocalPointPicker
    const [ focalPoint, setFocalPoint ] = useState( {
        x: 0.5,
        y: 0.5,
    } );

    const url = `${plugin_starter_ajax_obj.image_url}feedback.jpg`; // Example image URL

    /* Example function to render the CSS styles based on Focal Point Picker value */
    const style = {
        backgroundImage: `url(${ url })`,
        backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
    };
    // FocalPointPicker
    // const [ fontSize, setFontSize ] = useState( 12 );
    const fallbackFontSize = 12;

    // FormTokenField
    const continents = [
        'Africa',
        'America',
        'Antarctica',
        'Asia',
        'Europe',
        'Oceania',
    ];
    const [ selectedContinents, setSelectedContinents ] = useState( [] );
    // FormTokenField
    const [ isOpen, setIsOpen ] = useState( true );
    const [ value, setValue ] = useState( '' );
    // MenuGroup
    const [ mode, setMode ] = useState( 'visual' );
    const choices = [
        {
            value: 'visual',
            label: 'Visual editor',
        },
        {
            value: 'text',
            label: 'Code editor',
        },
    ];
    // MenuGroup

    // Modal
    const [ modalOpen, setModalOpen ] = useState( false );
    const openModal = () => setModalOpen( true );
    const closeModal = () => setModalOpen( false );
    // Modal
    // Popover
    const [ popoverVisible, setPopoverVisible ] = useState( false );
    const togglePopoverVisible = () => {
        setPopoverVisible( ( state ) => ! state );
    };
    // Popover
    const [ radioOption, setRadioOption ] = useState( 'a' );

    const [ isScrollLocked, setIsScrollLocked ] = useState( false );

    const toggleLock = () => {
        setIsScrollLocked( ( locked ) => ! locked );
    };


    const onNavigate = ( index, target ) => {
        console.log( `Navigates to ${ index }`, target );
    }
    const [ searchInput, setSearchInput ] = useState( '' );
    const [ size, setSize ] = useState( '50%' );
    const [ text, setText ] = useState( '' );
    // ToolsPanel
    const [ height, setHeight ] = useState();
    const [ width, setWidth ] = useState();
    const [ padding, setPadding ] = useState();
    const [ margin, setMargin ] = useState();

    const resetAll = () => {
        setHeight( undefined );
        setWidth( undefined );
        setPadding( undefined );
        setMargin( undefined );
    };
    // ToolsPanel



    const handleButtonClick = () => {
        setProcessing('processing');
        // Simulate an async operation (e.g., form submission)
        setTimeout(() => {
            setProcessing('done');
            // Reset to normal state after a short delay
            setTimeout(() => {
                setProcessing('normal');
            }, 2000);
        }, 3000);
    }
    const clickHandler = () => {
        console.log('xyz')
    }
    const onSelect = () => {
        console.log( 'Select clicked' );
    };
    const onMove = () => {
        console.log( 'Move clicked' );
    };
    return (
        <>
            <h4>{__("SelectControl", "plugin-starter")}</h4>
            <Panel>
                <PanelBody title={__('AlignmentMatrixControl', 'plugin-starter')} initialOpen={ true }>                    
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("AlignmentMatrixControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-auto">
                                    <AlignmentMatrixControl
                                        value={ alignment }
                                        onChange={ setAlignment }
                                    />                           
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('AnglePickerControl', 'plugin-starter')} initialOpen={ false }>                    
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("AnglePickerControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-auto">
                                    <AnglePickerControl
                                        value={ angle }
                                        onChange={ setAngle }
                                    />                          
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('Border', 'plugin-starter')} initialOpen={ false }>                    
                    <div className="setting-unit border-bottom py-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("BorderBoxControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <BorderBoxControl
                                        __next40pxDefaultSize
                                        colors={ COLORS }
                                        label={ __( 'Borders' ) }
                                        onChange={ ( newBorders ) => setBorders( newBorders ) }
                                        value={ borders }
                                    />                       
                                </div>
                            }
                        </div>
                    </div> 
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("BorderControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <BorderControl
                                        __next40pxDefaultSize
                                        colors={ COLORS }
                                        label={ __( 'Border' ) }
                                        onChange={ setBorder }
                                        value={ border }
                                    />                      
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('BoxControl', 'plugin-starter')} initialOpen={ false }>                    
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("BoxControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <BoxControl
                                        __next40pxDefaultSize
                                        values={ values }
                                        onChange={ setValues }
                                    />                        
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('Button', 'plugin-starter')} initialOpen={ false }>                    
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ButtonGroup & Button", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-auto">
                                    <ButtonGroup>
                                        <Button variant="primary">Button 1</Button>
                                        <Button variant="primary">Button 2</Button>
                                    </ButtonGroup>                      
                                </div>
                            }
                        </div>
                    </div>  
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Button", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-auto">                                    
                                    <Button
                                        isDestructive={ processing=='processing'?true:false } // Red button
                                        isBusy={ processing!='normal'?true:false  } // Show loading indicator
                                        disabled={ processing!='normal'?true:false } // Disable the button
                                        isPressed={ false } // Appear pressed, Become black  
                                        icon={ processing=='processing'?rotateRight:processing=='done'?check:envelope} // Button icon
                                        iconPosition="left" // Icon position (left, right)
                                        iconSize={ 20 } // Icon size
                                        size="medium" // Button size (small, medium, large)
                                        style={ { marginRight: '8px' } } // Custom styles
                                        className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                        variant="primary"
                                        onClick={ handleButtonClick }
                                    >
                                        {
                                            processing == 'processing' ? __( "Sending...", "plugin-starter" ) : __( "Send", "plugin-starter" )
                                        }
                                    </Button>                    
                                </div>
                            }
                        </div>
                    </div>                   
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ClipboardButton", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-auto">                                
                                    <ClipboardButton
                                        variant="primary"
                                        text="Text to be copied."
                                        onCopy={ () => setHasCopied( true ) }
                                        onFinishCopy={ () => setHasCopied( false ) }
                                    >
                                        { hasCopied ? 'Copied!' : 'Copy Text' }
                                    </ClipboardButton>                   
                                </div>
                            }
                        </div>
                    </div>                   
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Composite", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-auto">                                
                                    <Composite>
                                        <Composite.Group>
                                            <Composite.GroupLabel>Label</Composite.GroupLabel>
                                            <Composite.Item>Item 1</Composite.Item>
                                            <Composite.Item>Item 2</Composite.Item>
                                        </Composite.Group>
                                    </Composite>                   
                                </div>
                            }
                        </div>
                    </div>     
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("NavigableMenu, TabbableContainer", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <div>
                                        <span>Navigable Menu:</span>
                                        <NavigableMenu onNavigate={ onNavigate } orientation="horizontal">
                                            <Button variant="secondary">Item 1</Button>
                                            <Button variant="secondary">Item 2</Button>
                                            <Button variant="secondary">Item 3</Button>
                                        </NavigableMenu>

                                        <span>Tabbable Container:</span>
                                        <TabbableContainer onNavigate={ onNavigate }>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 1
                                            </Button>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 2
                                            </Button>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 3
                                            </Button>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 4
                                            </Button>
                                        </TabbableContainer>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                
                </PanelBody>
                <PanelBody title={__('Calendar', 'plugin-starter')} initialOpen={ false }>                    
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DatePicker", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <DatePicker currentDate={ selectedDate } onChange={ setSelectedDate } />                    
                                </div>
                            }
                        </div>
                    </div>  
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DateTimePicker", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <DateTimePicker
                                        currentDate={ selectedDate }
                                        onChange={ setSelectedDate }
                                        is12Hour={ true }
                                    />                    
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Card', 'plugin-starter')} initialOpen={ false }>               
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Card", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <Card>
                                        <CardHeader>
                                            <Heading level={ 4 }>{__("CardHeader", "plugin-starter")}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{__("CardBody", "plugin-starter")}</Text>
                                        </CardBody>
                                        <CardFooter>
                                            <Text>{__("CardFooter", "plugin-starter")}</Text>
                                        </CardFooter>
                                    </Card>                   
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Card with media and seperator", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <Card>
                                        <CardMedia>
                                            <img className="img-fluid" src={`${plugin_starter_ajax_obj.image_url}default-login-right.png`} alt=""  />
                                        </CardMedia>
                                        <CardBody>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae eveniet quas vero ut perspiciatis doloribus?</CardBody>
                                        <CardDivider />
                                        <CardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia blanditiis fuga soluta adipisci, incidunt reiciendis beatae! Natus, deleniti molestias!</CardBody>
                                    </Card>                  
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Toggle', 'plugin-starter')} initialOpen={ false }>                                               
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FormToggle", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FormToggle
                                        checked={ toggle }
                                        onChange={ () => setToggle( ( state ) => ! state ) }
                                    />               
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ToggleControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ToggleControl
                                        __nextHasNoMarginBottom
                                        label="Fixed Background"
                                        help={
                                            toggle
                                                ? 'Has fixed background.'
                                                : 'No fixed background.'
                                        }
                                        checked={ toggle }
                                        onChange={ (newValue) => {
                                            setToggle( newValue );
                                        } }
                                    />             
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ToggleGroupControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ToggleGroupControl __nextHasNoMarginBottom __next40pxDefaultSize>
                                        <ToggleGroupControlOptionIcon
                                            value="uppercase"
                                            icon={ formatUppercase }
                                            label="Uppercase"
                                        />
                                        <ToggleGroupControlOptionIcon
                                            value="lowercase"
                                            icon={ formatLowercase }
                                            label="Lowercase"
                                        />
                                    </ToggleGroupControl>   
                                    <hr/>
                                    <ToggleGroupControl
                                        label="my label"
                                        value="vertical"
                                        isBlock
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                    >
                                        <ToggleGroupControlOption
                                            value="horizontal"
                                            label="Horizontal"
                                            showTooltip={ true }
                                        />
                                        <ToggleGroupControlOption value="vertical" label="Vertical" />
                                    </ToggleGroupControl>           
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Color', 'plugin-starter')} initialOpen={ false }>                                               
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ColorIndicator", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ColorIndicator colorValue={color} />                     
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ColorPalette", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ColorPalette
                                        colors={ COLORS }
                                        value={ color }
                                        onChange={ ( color ) => setColor( color ) }
                                    />                    
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ColorPicker", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ColorPicker
                                        color={color}
                                        onChange={setColor}
                                        enableAlpha
                                        defaultValue="#000"
                                    />                   
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DuotonePicker, DuotoneSwatch", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <>
                                        <DuotonePicker
                                            duotonePalette={ DUOTONE_PALETTE }
                                            colorPalette={ COLOR_PALETTE }
                                            value={ duotone }
                                            onChange={ setDuotone }
                                        />
                                        <Divider />
                                        <DuotoneSwatch values={ duotone } />
                                    </>                  
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("GradientPicker, DuotoneSwatch", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <GradientPicker
                                        value={ gradient }
                                        onChange={ ( currentGradient ) => setGradient( currentGradient ) }
                                        gradients={GRADIENTS}
                                        />                 
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('ComboboxControl', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ComboboxControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ComboboxControl
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                        label="Font Size"
                                        value={fontSize}
                                        onChange={setFontSize}
                                        isLoading={isLoading}
                                        options={filteredOptions}
                                        onFilterValueChange={(inputValue) => {
                                            setIsLoading(true);

                                            // Simulate async filtering (optional)
                                            setTimeout(() => {
                                                const filtered = options.filter((option) =>
                                                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                                                );
                                                setFilteredOptions(filtered);
                                                setIsLoading(false);
                                            }, 200);
                                        }}
                                    />                  
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('ConfirmDialog', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ConfirmDialog", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ConfirmDialog onConfirm={ () => console.debug( ' Confirmed! ' ) }>
                                        Are you sure? <strong>This action cannot be undone!</strong>
                                    </ConfirmDialog>  
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Form Elements', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("CustomSelectControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <CustomSelectControl
                                        __next40pxDefaultSize
                                        label="Font Size"
                                        options={ optionsCustomSelectControl }
                                        onChange={ ( { selectedItem } ) => setFontSize( selectedItem ) }
                                    />
                                    <hr /> 
                                    <CustomSelectControl
                                        __next40pxDefaultSize
                                        label="Font Size"
                                        options={ optionsCustomSelectControl }
                                        onChange={ ( { selectedItem } ) => setFontSize( selectedItem ) }
                                        value={ options.find( ( option ) => option.key === fontSize.key ) }
                                    />
                                </div>
                            }
                        </div>
                    </div>  
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("InputControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <InputControl
                                        __next40pxDefaultSize
                                        value={ value }
                                        onChange={ ( nextValue ) => setValue( nextValue ?? '' ) }
                                    />
                                </div>
                            }
                        </div>
                    </div> 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("NumberControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <NumberControl
                                        __next40pxDefaultSize
                                        isShiftStepEnabled={ true }
                                        onChange={ setValue }
                                        shiftStep={ 10 }
                                        value={ value }
                                    />
                                </div>
                            }
                        </div>
                    </div>  
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("CheckboxControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <CheckboxControl
                                        __nextHasNoMarginBottom
                                        label="Is author"
                                        help="Is the user a author or not?"
                                        checked={ toggle }
                                        onChange={ setToggle }
                                    />                
                                </div>
                            }
                        </div>
                    </div>                                
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("SelectControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <SelectControl
                                        label="Size"
                                        value={ size }
                                        options={OPTIONS}
                                        onChange={ ( newSize ) => setSize( newSize ) }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />              
                                </div>
                            }
                        </div>
                    </div>                                
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("RadioControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <RadioControl
                                        label="User type"
                                        help="The type of the current user"
                                        selected={ radioOption }
                                        options={ [
                                            { label: 'Author', value: 'a' },
                                            { label: 'Editor', value: 'e' },
                                        ] }
                                        onChange={ ( value ) => setRadioOption( value ) }
                                    />               
                                </div>
                            }
                        </div>
                    </div>                                
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("RadioGroup, Radio", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <RadioGroup label="User type" onChange={ setRadioOption } checked={ radioOption }>
                                        <Radio __next40pxDefaultSize value="a">Author</Radio>
                                        <Radio __next40pxDefaultSize value="e">Editor</Radio>
                                    </RadioGroup>              
                                </div>
                            }
                        </div>
                    </div>                                
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("SearchControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <SearchControl
                                        __nextHasNoMarginBottom
                                        label={ __( 'Search posts' ) }
                                        value={ searchInput }
                                        onChange={ setSearchInput }
                                    />            
                                </div>
                            }
                        </div>
                    </div>                                
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("TextareaControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <TextareaControl
                                        __nextHasNoMarginBottom
                                        label="Text"
                                        help="Enter some text"
                                        value={ text }
                                        onChange={ ( value ) => setText( value ) }
                                    />           
                                </div>
                            }
                        </div>
                    </div>                                
                </PanelBody>
                <PanelBody title={__('Icons', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Dashicon", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Dashicon icon="admin-home" />
                                    <Dashicon icon="products" />
                                    <Dashicon icon="wordpress" />
                                    <Placeholder icon={ more } label="Placeholder" />
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('DimensionControl', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DimensionControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("'DimensionControl' is deprecated.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <DimensionControl
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                        label={ 'Padding' }
                                        icon={ 'desktop' }
                                        onChange={ ( value ) => setPaddingSize( value ) }
                                        value={ paddingSize }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Draggable', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Draggable", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Need usable example.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <div id="draggable-panel">
                                        <Panel header="Draggable panel">
                                            <PanelBody>
                                                <Draggable elementId="draggable-panel" transferData={ {} }>
                                                    { ( { onDraggableStart, onDraggableEnd } ) => (
                                                        <div
                                                            className="example-drag-handle"
                                                            draggable
                                                            onDragStart={ onDraggableStart }
                                                            onDragEnd={ onDraggableEnd }
                                                        >
                                                            <Icon icon={ more } />
                                                        </div>
                                                    ) }
                                                </Draggable>
                                            </PanelBody>
                                        </Panel>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('DropZone', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DropZone", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Need usable example", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <div>
                                        { hasDropped ? 'Dropped!' : 'Drop something here' }
                                        <DropZone
                                            onFilesDrop={ () => setHasDropped( true ) }
                                            onHTMLDrop={ () => setHasDropped( true ) }
                                            onDrop={ () => setHasDropped( true ) }
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Menu & Dropdown', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DropdownMenu, MenuGroup, MenuItem", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <DropdownMenu icon={ more } label="Select a direction">
                                        { ( { onClose } ) => (
                                            <>
                                                <MenuGroup>
                                                    <MenuItem icon={ arrowUp } onClick={ onClose }>
                                                        Move Up
                                                    </MenuItem>
                                                    <MenuItem icon={ arrowDown } onClick={ onClose }>
                                                        Move Down
                                                    </MenuItem>
                                                </MenuGroup>
                                                <MenuGroup>
                                                    <MenuItem icon={ trash } onClick={ onClose }>
                                                        Remove
                                                    </MenuItem>
                                                </MenuGroup>
                                            </>
                                        ) }
                                    </DropdownMenu>
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Button, Dropdown", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Dropdown
                                        className="my-container-class-name"
                                        contentClassName="my-popover-content-classname"
                                        popoverProps={ { placement: 'bottom-start' } }
                                        renderToggle={ ( { isOpen, onToggle } ) => (
                                            <Button
                                                variant="primary"
                                                onClick={ onToggle }
                                                aria-expanded={ isOpen }
                                            >
                                                Toggle Popover!
                                            </Button>
                                        ) }
                                        renderContent={ () => <div>This is the content of the popover.</div> }
                                    />
                                </div>
                            }
                        </div>
                    </div>                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ItemGroup, Item", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    
                                    <ItemGroup>
                                        <Item>Code</Item>
                                        <Item>is</Item>
                                        <Item>Poetry</Item>
                                    </ItemGroup>
                                </div>
                            }
                        </div>
                    </div> 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("MenuGroup, MenuItemsChoice", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <MenuGroup label="Editor">
                                        <MenuItemsChoice
                                            choices={ choices }
                                            value={ mode }
                                            onSelect={ ( newMode ) => setMode( newMode ) }
                                        />
                                    </MenuGroup>
                                </div>
                            }
                        </div>
                    </div>  
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Navigation, NavigationMenu", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("'Navigation' is deprecated. 'NavigationMenu' is deprecated. 'NavigationItem' is deprecated. 'NavigationGroup' is deprecated.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Navigation>
                                        <NavigationMenu title="Home">
                                            <NavigationGroup title="Group 1">
                                                <NavigationItem item="item-1" title="Item 1" />
                                                <NavigationItem item="item-2" title="Item 2" />
                                            </NavigationGroup>
                                            <NavigationGroup title="Group 2">
                                                <NavigationItem
                                                    item="item-3"
                                                    navigateToMenu="category"
                                                    title="Category"
                                                />
                                            </NavigationGroup>
                                        </NavigationMenu>

                                        <NavigationMenu
                                            backButtonLabel="Home"
                                            menu="category"
                                            parentMenu="root"
                                            title="Category"
                                        >
                                            <NavigationItem badge="1" item="child-1" title="Child 1" />
                                            <NavigationItem item="child-2" title="Child 2" />
                                        </NavigationMenu>
                                    </Navigation>
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Elevation, Surface', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Elevation, Surface", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Surface>
                                        <Text>Code is Poetry</Text>
                                        <Elevation value={ 5 } />
                                    </Surface>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('ExternalLink', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ExternalLink", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ExternalLink href="https://wordpress.org">WordPress.org</ExternalLink>

                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Flex, Grid, HStack', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Flex, FlexBlock, FlexItem", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Flex>
                                        <FlexItem>
                                            <p>Code</p>
                                        </FlexItem>
                                        <FlexBlock>
                                            <p>Poetry</p>
                                        </FlexBlock>
                                    </Flex>
                                    <Flex className="input-group-plugin-starter">
                                        <FlexItem className="input-group-text">
                                            <span>{plugin_starter_ajax_obj.home_url}/</span>
                                        </FlexItem>
                                        <FlexBlock>
                                            <TextControl
                                                __nextHasNoMarginBottom
                                                __next40pxDefaultSize
                                                // label="Additional CSS Class"
                                                value={ settingData?.customizer?.settings?.login_url }
                                                onChange={ ( value ) => handleChange('customizer.settings.login_url', value) }
                                            />
                                        </FlexBlock>
                                    </Flex> 
                                </div>
                            }
                        </div>
                    </div>                                     
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Grid", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Grid columns={ 3 }>
                                        <Text>Code</Text>
                                        <Text>is</Text>
                                        <Text>Poetry</Text>
                                    </Grid>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("HStack", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <HStack>
                                        <Text>Code</Text>
                                        <Text>is</Text>
                                        <Text>Poetry</Text>
                                    </HStack>
                                </div>
                            }
                        </div>
                    </div>                                      
                </PanelBody>
                <PanelBody title={__('FocalPointPicker', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FocalPointPicker", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <>
                                        <FocalPointPicker
                                        __nextHasNoMarginBottom
                                            url={ url }
                                            value={ focalPoint }
                                            onDragStart={ setFocalPoint }
                                            onDrag={ setFocalPoint }
                                            onChange={ setFocalPoint }
                                        />
                                        <div style={ style } />
                                    </>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FocusableIframe', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FocusableIframe", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FocusableIframe
                                        src="https://mostak-shahid.github.io/"
                                        onFocus={ () => console.log( 'iframe is focused' ) }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FontSizePicker', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FontSizePicker", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FontSizePicker
                                        __next40pxDefaultSize
                                        fontSizes={ FONT_SIZES }
                                        value={ fontSize }
                                        fallbackFontSize={ fallbackFontSize }
                                        onChange={ ( newFontSize ) => {
                                            setFontSize( newFontSize );
                                        } }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FormFileUpload', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FormFileUpload", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FormFileUpload
                                        __next40pxDefaultSize
                                        accept="image/*"
                                        onChange={ ( event ) => console.log( event.currentTarget.files ) }
                                    >
                                        Upload
                                    </FormFileUpload>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FormTokenField', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FormTokenField", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FormTokenField
                                        __next40pxDefaultSize
                                        value={ selectedContinents }
                                        suggestions={ continents }
                                        onChange={ ( tokens ) => setSelectedContinents( tokens ) }
                                        __nextHasNoMarginBottom
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Guide', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Guide", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Guide
                                        onFinish={ () => setIsOpen( false ) }
                                        pages={ [
                                            {
                                                content: <p>Welcome to the ACME Store!</p>,
                                            },
                                            {
                                                image: <img src="https://acmestore.com/add-to-cart.png" />,
                                                content: (
                                                    <p>
                                                        Click <i>Add to Cart</i> to buy a product.
                                                    </p>
                                                ),
                                            },
                                        ] }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('IsolatedEventContainer', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("IsolatedEventContainer", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("IsolatedEventContainer is deprecated since version 5.7.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <IsolatedEventContainer
                                        className="component-some_component"
                                        onClick={ clickHandler }
                                    >
                                        <p>This is an isolated component</p>
                                    </IsolatedEventContainer>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Modal', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Modal", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <>
                                        <Button variant="secondary" onClick={ openModal }>
                                            Open Modal
                                        </Button>
                                        { modalOpen && (
                                            <Modal title="This is my modal" onRequestClose={ closeModal }>
                                                <Button variant="secondary" onClick={ closeModal }>
                                                    My custom close button
                                                </Button>
                                            </Modal>
                                        ) }
                                    </>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Navigator', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Navigator", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("'Navigation' is deprecated. 'NavigationMenu' is deprecated. 'NavigationItem' is deprecated. 'NavigationGroup' is deprecated.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Navigator initialPath="/">
                                        <Navigator.Screen path="/">
                                            <p>This is the home screen.</p>
                                            <Navigator.Button path="/child">
                                                Navigate to child screen.
                                            </Navigator.Button>
                                        </Navigator.Screen>
                                        <Navigator.Screen path="/child">
                                            <p>This is the child screen.</p>
                                            <Navigator.BackButton>Go back</Navigator.BackButton>
                                        </Navigator.Screen>
                                    </Navigator>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Notice', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Notice", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("status: warning | success | error | info", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Notice status="error">An unknown error occurred.</Notice>
                                </div>
                            }
                        </div>
                    </div>                                     
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Snackbar", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, nam.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Snackbar>Post published successfully.</Snackbar>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Popover', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Popover", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Button variant="secondary" onClick={ togglePopoverVisible }>
                                        Toggle Popover!
                                        { popoverVisible && <Popover>Popover is toggled!</Popover> }
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('ProgressBar', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ProgressBar", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ProgressBar 
                                        value={ 50 } 
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('SandBox', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("SandBox", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <SandBox html="<p>Content</p>" title="SandBox" type="embed" />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('RangeControl', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("RangeControl", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <RangeControl
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                        label="Columns"
                                        value={ value }
                                        onChange={ ( value ) => setValue( value ) }
                                        min={ 2 }
                                        max={ 10 }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Scroll', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ScrollLock", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <div>
                                        <Button variant="secondary" onClick={ toggleLock }>
                                            Toggle scroll lock
                                        </Button>
                                        { isScrollLocked && <ScrollLock /> }
                                        <p>
                                            Scroll locked:
                                            <strong>{ isScrollLocked ? 'Yes' : 'No' }</strong>
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                                     
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Scrollable", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Scrollable style={ { maxHeight: 200 } }>
                                        <div style={ { height: 500 } }>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti id minima temporibus, inventore laboriosam, molestias repudiandae officiis quidem saepe earum culpa soluta nobis? Deleniti amet, quibusdam earum illum dolorem et? Eaque, quas porro! Rem in cumque architecto consequuntur temporibus, nisi laborum cum, quaerat ullam, modi aliquam provident repudiandae. Error, itaque veritatis minima eos est in repudiandae architecto neque unde sunt ducimus quos aliquam, quibusdam explicabo quaerat repellat soluta cum asperiores praesentium dolor, labore dolorum iste odio. Odit beatae ad exercitationem delectus culpa cum in, vero sapiente vitae repellat vel laboriosam earum pariatur? Debitis doloremque, fugiat autem consectetur quas sequi veniam perspiciatis tempore voluptates, dignissimos cumque. Non, minima, optio earum nemo numquam ex cumque ut inventore laborum perspiciatis velit accusamus ipsa atque quia rerum veritatis beatae natus quibusdam ipsam exercitationem quisquam, eius voluptatibus. Officia adipisci maiores accusantium culpa? Rerum illum cum mollitia, consectetur quaerat, reprehenderit, a libero aspernatur voluptatibus laudantium facilis.</div>
                                    </Scrollable>
                                    
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('View, Spacer, Surface', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("View, Spacer", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <View>
                                        <Spacer marginBottom={10}>
                                            <Heading>WordPress.org</Heading>
                                        </Spacer>
                                        <Text>Code is Poetry</Text>
                                    </View>
                                </div>
                            }
                        </div>
                    </div>                                          
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Surface", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Surface borderBottom={true}>
                                        <Heading>WordPress.org</Heading>
                                    </Surface>
                                    <Text>Code is Poetry</Text>
                                </div>
                            }
                        </div>
                    </div>                                          
                </PanelBody>
                <PanelBody title={__('Spinner', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Spinner", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Spinner />
                                </div>
                            }
                        </div>
                    </div>                                          
                </PanelBody>
                <PanelBody title={__('TabPanel', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("TabPanel", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                        <TabPanel
                                            className="my-tab-panel"
                                            activeClass="active-tab"
                                            onSelect={ onTabSelect }
                                            tabs={ [
                                                {
                                                    name: 'tab1',
                                                    title: 'Tab 1',
                                                    className: 'tab-one',
                                                },
                                                {
                                                    name: 'tab2',
                                                    title: 'Tab 2',
                                                    className: 'tab-two',
                                                },
                                            ] }
                                        >
                                            { ( tab ) => <p>{ tab.title }</p> }
                                        </TabPanel>
                                </div>
                            }
                        </div>
                    </div>                                          
                </PanelBody>
                <PanelBody title={__('TextHighlight', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("TextHighlight", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                        <TextHighlight
                                            text="Why do we like Gutenberg? Because Gutenberg is the best!"
                                            highlight="Gutenberg"
                                        />
                                </div>
                            }
                        </div>
                    </div>                                          
                </PanelBody>
                <PanelBody title={__('Toolbar', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ToolbarButton", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                        <Toolbar label="Options">
                                            <ToolbarButton
                                                icon={ pencil }
                                                label="Edit"
                                                onClick={ () => alert( 'Editing' ) }
                                            />
                                        </Toolbar>
                                </div>
                            }
                        </div>
                    </div>                                          
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ToolbarDropdownMenu", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                        <Toolbar label="Options">
                                            <ToolbarDropdownMenu
                                                icon={ more }
                                                label="Select a direction"
                                                controls={ [
                                                    {
                                                        title: 'Up',
                                                        icon: arrowUp,
                                                        onClick: () => console.log( 'up' ),
                                                    },
                                                    {
                                                        title: 'Right',
                                                        icon: arrowRight,
                                                        onClick: () => console.log( 'right' ),
                                                    },
                                                    {
                                                        title: 'Down',
                                                        icon: arrowDown,
                                                        onClick: () => console.log( 'down' ),
                                                    },
                                                    {
                                                        title: 'Left',
                                                        icon: arrowLeft,
                                                        onClick: () => console.log( 'left' ),
                                                    },
                                                ] }
                                            />
                                        </Toolbar>
                                </div>
                            }
                        </div>
                    </div>                                          
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ToolbarGroup", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Toolbar label="Options">
                                        <ToolbarGroup>
                                            <ToolbarButton icon={ paragraph } label="Paragraph" />
                                        </ToolbarGroup>
                                        <ToolbarGroup>
                                            <ToolbarButton icon={ formatBold } label="Bold" />
                                            <ToolbarButton icon={ formatItalic } label="Italic" />
                                            <ToolbarButton icon={ link } label="Link" />
                                        </ToolbarGroup>
                                    </Toolbar>
                                </div>
                            }
                        </div>
                    </div>                                          
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ToolbarItem", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Toolbar label="Options">
                                        <ToolbarItem as={ Button }>I am a toolbar button</ToolbarItem>
                                        <ToolbarItem as="button">I am another toolbar button</ToolbarItem>
                                    </Toolbar>
                                </div>
                            }
                        </div>
                    </div>                                          
                </PanelBody>
                <PanelBody title={__('Tooltip', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Tooltip", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                        <Tooltip text="More information">
                                            <Dashicon icon="products" />
                                        </Tooltip>
                                </div>
                            }
                        </div>
                    </div>                                  
                </PanelBody>
                <PanelBody title={__('Truncate', 'plugin-starter')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Truncate", "plugin-starter")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Truncate
                                        ellipsizeMode="auto"
                                    >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex
                                        neque, vulputate a diam et, luctus convallis lacus. Vestibulum ac
                                        mollis mi. Morbi id elementum massa.
                                    </Truncate>
                                </div>
                            }
                        </div>
                    </div>                                  
                </PanelBody>
            </Panel>
            
        </>
    )
}
export default withForm(ComponentsBasic);