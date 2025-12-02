import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuGroup, MenuItem, Icon } from '@wordpress/components';
import { chevronDown, chevronUp } from '@wordpress/icons';
import { urlToArr } from '../../lib/Helpers';
import './MultiLevelListGroup.scss';

const MultiLevelMenu = ({ data, level = 0 }) => {
	const [openKeys, setOpenKeys] = useState({});
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;
	const urlArr = urlToArr();

	const toggleSubMenu = (key) => {
		setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const handleItemClick = (key, item, e) => {
		if (item.sub) {
			e.preventDefault();
			toggleSubMenu(key);
		} else if (item.url) {
			navigate(item.url);
		}
	};

	const slugify = (text) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^\w\-]+/g, '')
			.replace(/\-\-+/g, '-');
	};

	useEffect(() => {
		if (urlArr.length === 0) return;
		const openKeysObj = urlArr.reduce((acc, key) => {
			acc[key] = true;
			return acc;
		}, {});
		setOpenKeys(openKeysObj);
	}, [urlArr]);

	return (
		<MenuGroup
			className={level > 0 ? 'plugin-starter-child-menu-group' : 'plugin-starter-top-menu-group'}
			label={level === 0 ? undefined : null}
		>
			{Object.entries(data).map(([key, item]) => {
				const hasSub = !!item.sub;
				const isOpen = openKeys[key];
				const isActive = currentPath === item.url || currentPath.startsWith(item.url);

				return (
					<div
						key={key}
						className={[
							'menu-item-wrapper',
							hasSub ? 'has-submenu' : '',
							isActive ? 'active' : '',
							isOpen ? 'open' : '',
						].join(' ')}
						// style={{ marginLeft: `${level * 1.25}rem` }}
						// style={{ marginLeft: `10px` }}
					>
						<MenuItem
							onClick={(e) => handleItemClick(key, item, e)}
							className={`menu-item menu-item-${slugify(item.title)}`}
							isSelected={isActive}
						>
							<span className="menu-title">{item.title}</span>
							{hasSub && (
								<Icon className='menu-icon' icon={isOpen ? chevronUp : chevronDown} />
							)}
						</MenuItem>

						{/* Recursive render for submenus */}
						{hasSub && isOpen && (
							<div className="submenu">
								<MultiLevelMenu data={item.sub} level={level + 1} />
							</div>
						)}
					</div>
				);
			})}
		</MenuGroup>
	);
};

export default MultiLevelMenu;
