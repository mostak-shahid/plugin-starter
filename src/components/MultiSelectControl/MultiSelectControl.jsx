import { Dropdown, CheckboxControl, Button, TextControl } from '@wordpress/components';
import { useState, useMemo, useEffect } from 'react';
import { __ } from "@wordpress/i18n";

const MultiSelectControl = ({
    className,
    options = [],
    defaultValues = [],
    placeholder = __("Select options", "plugin-starter"),
    search = true,
    onChange,
}) => {
    const [selected, setSelected] = useState(defaultValues);
    const [searchTerm, setSearchTerm] = useState('');

    // Normalize options (support string or {value,label})
    const normalizedOptions = useMemo(() => {
        return options.map((opt) =>
            typeof opt === 'string'
                ? { value: opt, label: opt }
                : opt
        );
    }, [options]);

    // Filter options by search term (on label, case-insensitive)
    const filteredOptions = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return normalizedOptions.filter((opt) =>
            opt.label.toLowerCase().includes(term)
        );
    }, [searchTerm, normalizedOptions]);

    // Toggle selection
    const toggleOption = (value) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    // Notify parent
    useEffect(() => {
        onChange && onChange(selected);
    }, [selected]);

    // Get label for display in button
    const selectedLabels = useMemo(() => {
        return normalizedOptions
            .filter((opt) => selected.includes(opt.value))
            .map((opt) => opt.label);
    }, [selected, normalizedOptions]);

    return (
        <div className={`plugin-startermultiselect-wrapper ${className}`}>
            <Dropdown
                className="plugin-startermultiselect"
                position="bottom left"
                renderToggle={({ onToggle }) => (
                    <Button onClick={onToggle} variant="secondary">
                        {selectedLabels.length > 0
                            ? selectedLabels.join(', ')
                            : placeholder}
                    </Button>
                )}
                renderContent={() => (
                    <div style={{ padding: '8px', minWidth: '220px' }}>
                        {search && (
                            <TextControl
                                placeholder={__("Search...", "plugin-starter")}
                                value={searchTerm}
                                onChange={setSearchTerm}
                            />
                        )}
                        <div
                            style={{
                                maxHeight: '180px',
                                overflowY: 'auto',
                                marginTop: '6px',
                            }}
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <CheckboxControl
                                        key={opt.value}
                                        label={opt.label}
                                        checked={selected.includes(opt.value)}
                                        onChange={() => toggleOption(opt.value)}
                                    />
                                ))
                            ) : (
                                <p
                                    style={{
                                        fontStyle: 'italic',
                                        opacity: 0.7,
                                        textAlign: 'center',
                                    }}
                                >
                                    {__("No results", "plugin-starter")}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default MultiSelectControl;
/*
<MultiSelectControl 
    className= ''
    options={
        [
            { value: 'apple', label: '🍎 Apple' },
            { value: 'banana', label: '🍌 Banana' },
            { value: 'cherry', label: '🍒 Cherry' },
            { value: 'mango', label: '🥭 Mango' },
        ]
    }
    defaultValues={selected}
    placeholder={__("Select fruits", "plugin-starter")}
    search={true}
    onChange={(vals) => setSelected(vals)}
/>
*/