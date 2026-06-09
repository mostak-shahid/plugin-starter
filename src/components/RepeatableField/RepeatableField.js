import { __ } from "@wordpress/i18n";
import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import accordionDelete from "../../assets/images/accordion-delete.svg";
// import accordionMove from "../../assets/images/accordion-move.svg";

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faArrowsUpDownLeftRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./RepeatableField.css";
const ITEM_TYPE = "REPEATABLE_ITEM";

const RepeatableField = ({ 
    name, 
    options, 
    defaultValues = [], 
    onChange = () => {}, 
}) => {
    const sectionsFirstRender = useRef(true);

    const [sections, setSections] = useState(
        defaultValues.length > 0
            ? defaultValues.map((data, index) => ({ id: index + 1, values: data }))
            : [{ id: 1, values: {} }] // Initialize with empty object instead of empty string
    );

    const moveSection = (dragIndex, hoverIndex) => {
        const updatedSections = [...sections];
        const [movedItem] = updatedSections.splice(dragIndex, 1);
        updatedSections.splice(hoverIndex, 0, movedItem);
        setSections(updatedSections);
    };

    const updateField = (sectionId, fieldName, value) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        values: fieldName
                            ? { ...section.values, [fieldName]: value }
                            : value // Handle both object values and direct string values
                    }
                    : section
            )
        );
    };

    const addSection = () => {
        setSections([...sections, { id: Date.now(), values: {} }]); // Initialize with empty object
    };

    const removeSection = (id) => {
        // Update sections and trigger the change handler
        const updatedSections = sections.filter((section) => section.id !== id);
        setSections(updatedSections);
    };

    useEffect(() => {
        if (sectionsFirstRender.current) {
            sectionsFirstRender.current = false;
            return;
        }

        // Extract the `values` objects from the data
        const valuesArray = sections.map((item) => item.values);

        // Call onChange with updated values
        onChange( valuesArray || []);
    }, [sections]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="repeatable-field-container">
                <button onClick={addSection} className="add-btn text-purple-40">
                    {options?.addButton || __("Add New Field", "store-addons-for-woocommerce")}
                </button>
                {sections.map((section, index) => (
                    <DraggableAccordionItem
                        key={section.id}
                        index={index}
                        section={section}
                        moveSection={moveSection}
                        updateField={updateField}
                        removeSection={removeSection}
                        options={options}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

const DraggableAccordionItem = ({ index, section, moveSection, updateField, removeSection, options }) => {
    const [expanded, setExpanded] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveSection(draggedItem.index, index);
                draggedItem.index = index;
            }
        }
    });

    // Helper function to get display value
    const getDisplayValue = () => {
        if (typeof section.values === 'string') {
            return section.values;
        } else if (typeof section.values === 'object' && section.values !== null) {
            // If it's an empty object, return blank
            if (Object.keys(section.values).length === 0) {
                return '';
            }
            // Avoid returning '[object Object]' for plain objects with default toString
            if (section.values.toString && section.values.toString !== Object.prototype.toString) {
                return section.values.toString();
            }
            return '';
        }
        return '';
    };

    // Stop event propagation for delete button to prevent accordion toggle
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        removeSection(section.id);
    };

    return (
        <div ref={drop} className="accordion-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div ref={drag} className="accordion-header" onClick={() => setExpanded(!expanded)}>
                <div className="left-part">
                    <input
                        type="text"
                        value={getDisplayValue()}
                        onChange={(e) => updateField(section.id, '', e.target.value)}
                        onClick={(e) => e.stopPropagation()} // Prevent accordion toggle when clicking input
                    />
                </div>
                <div className="right-part">
                    <span
                        onClick={handleDeleteClick}
                        className="remove-btn"
                    >
                        {/* <img src={accordionDelete} alt="Delete" /> */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                    <span className="drag-handle">
                        {/* <img src={accordionMove} alt="Move" /> */}
                        <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RepeatableField;
/*
Uses
<RepeatableField
    name="inputs.complex_inputs.repeater"
    defaultValues={settings?.inputs?.complex_inputs?.repeater}
    onChange={(value) => {
        console.log(value);
        handleChange('inputs.complex_inputs.repeater', value);
    }}
/>
*/