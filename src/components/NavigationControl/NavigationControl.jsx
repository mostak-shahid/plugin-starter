import React from 'react'

export default function NavigationControl({activeKeys=[], openKeys=[], menuType='vertical'}) {
    return (            
        <div
            className="myplugin-horizontal-menu"
            style={{ display: 'flex', gap: '1rem', position: 'relative' }}
        >
            <MenuGroup>
                <div style={{ position: 'relative' }}>
                    <MenuItem
                        onClick={() =>
                            setActiveSubmenu(activeSubmenu === 'home' ? null : 'home')
                        }
                    >
                        Home
                    </MenuItem>
                    {activeSubmenu === 'home' && (
                        <div
                            className="submenu"
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                background: '#fff',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                            }}
                        >
                            <MenuItem>Overview</MenuItem>
                            <MenuItem>Updates</MenuItem>
                        </div>
                    )}
                </div>

                <div style={{ position: 'relative' }}>
                    <MenuItem
                        onClick={() =>
                            setActiveSubmenu(activeSubmenu === 'about' ? null : 'about')
                        }
                    >
                        About
                    </MenuItem>
                    {activeSubmenu === 'about' && (
                        <div
                            className="submenu"
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                background: '#fff',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                            }}
                        >
                            <MenuItem>Team</MenuItem>
                            <MenuItem>History</MenuItem>
                        </div>
                    )}
                </div>
            </MenuGroup>
        </div>
    )
}
