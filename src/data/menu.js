import menuData from './menu.json';

function injectMenu(menu, item) {
    // 1. Insert before specific itemKey
    if (item.insertBefore) {
        const index = menu.findIndex(m => m.itemKey === item.insertBefore);
        if (index >= 0) {
            menu.splice(index, 0, cleanItem(item));
            return [...menu];
        }
    }

    // 2. Insert after specific itemKey
    if (item.insertAfter) {
        const index = menu.findIndex(m => m.itemKey === item.insertAfter);
        if (index >= 0) {
            menu.splice(index + 1, 0, cleanItem(item));
            return [...menu];
        }
    }

    // 3. Insert as a submenu under a free menu item
    if (item.parentKey) {
        const parent = menu.find(m => m.itemKey === item.parentKey);
        if (parent) {
            parent.items = parent.items || [];
            parent.items.push(cleanItem(item));
            return [...menu];
        }
    }

    // 4. Insert at a defined index
    if (typeof item.position === "number") {
        menu.splice(item.position, 0, cleanItem(item));
        return [...menu];
    }

    // 5. Default = append to root level
    return [...menu, cleanItem(item)];
}

function cleanItem(item) {
    const copy = { ...item };
    delete copy.insertBefore;
    delete copy.insertAfter;
    delete copy.parentKey;
    delete copy.position;
    return copy;
}

export function getMenu({ proItems = [], remoteItems = [] }) {        
    let menu = [...menuData];

    // Add flat pro items (default: append)
    if (proItems.length) {
        proItems.forEach(item => {
            menu = injectMenu(menu, item);
        });
    }

    // Optional remote dynamic items
    if (remoteItems.length) {
        remoteItems.forEach(item => {
            menu = injectMenu(menu, item);
        });
    }

    return menu;
}