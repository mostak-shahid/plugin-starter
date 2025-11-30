import React from 'react';
import { InputGroup, InputNumber, Select, Typography } from '@douyinfe/semi-ui';

export default function UnitControl({
    label,
    value,
    onChange,
    units = [],
}) {

    // Extract number + unit from the string (e.g., "20px")
    const parseValue = (val) => {
        if (!val) {
            return {
                number: '',
                unit: units[0]?.value || '',
            };
        }

        const number = parseFloat(val);
        const unit = val.replace(String(number), '') || units[0]?.value;
        return { number, unit };
    };

    const { number, unit } = parseValue(value);

    const handleNumberChange = (num) => {
        const numeric = num ? parseFloat(num) : '';
        onChange(numeric === '' ? '' : `${numeric}${unit}`);
    };

    const handleUnitChange = (newUnit) => {
        onChange(number === '' ? newUnit : `${number}${newUnit}`);
    };

    return (
        <div className="unit-control" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {label && <label className='font-semibold block'><Typography.Text>{label}</Typography.Text></label>}

            <InputGroup style={{ width: '100%' }}>
                <InputNumber
                    type="number"
                    value={number}
                    onChange={handleNumberChange}
                    placeholder="0"
                    style={{ flex: 1 }}
                />

                <Select
                    value={unit}
                    onChange={handleUnitChange}
                    // style={{ width: 75 }}
                >
                    {units.map((u) => (
                        <Select.Option key={u.value} value={u.value}>
                            {u.label}
                        </Select.Option>
                    ))}
                </Select>
            </InputGroup>
        </div>
    );
}
