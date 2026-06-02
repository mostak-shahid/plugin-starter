import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from '@wordpress/element';
const ComplexInputs = () => {
    return (
        <>
            <h2 className="h2">Complex Inputs</h2>
            <p>
                This page demonstrates the use of complex input components such as text fields, checkboxes, and radio buttons. These inputs are essential for collecting user data and preferences in a structured manner.
            </p>
            <p>
                The complex inputs are designed to be user-friendly and accessible, ensuring that users can easily interact with them. They are commonly used in forms, settings pages, and anywhere else where user input is required.
            </p>            
        </>
    );
};

export default ComplexInputs;