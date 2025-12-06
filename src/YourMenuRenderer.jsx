import React from "react";
import { useMenu } from "./contexts/MenuContext";

export default function YourMenuRenderer() {
    const { menu } = useMenu();

    return (
        <div>
            <MenuList items={menu} level={0} />
        </div>
    );
}

function MenuList({ items, level }) {
    return (
        <ul style={{ paddingLeft: level * 20 }}>
            {items.map((item) => (
                <li key={item.itemKey} style={{ marginBottom: "6px" }}>
                    <a href={item.url}>{item.text}</a>

                    {/* Render child items if exists */}
                    {item.items?.length > 0 && (
                        <MenuList items={item.items} level={level + 1} />
                    )}
                </li>
            ))}
        </ul>
    );
}
