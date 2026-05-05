import React, { useEffect, useState, useRef } from 'react';
import './SearchableDropdown.css'

function SearchableDropdown({ options, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null)

    useEffect(() => {
        setFilteredOptions(options)
    }, [options])


    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value) {
            const filtered = options.filter(option =>
                option.name.toLowerCase().includes(value.toLowerCase())
            );
            console.log(filtered)
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(options);
        }
    };


    const handleSelect = (option) => {
        onSelect(option);
        setShowOptions(false);
        setSearchTerm('');
    };


    const handleFocus = () => {
        setShowOptions(true);
    }

    const handleBlur = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
            setShowOptions(false);
        }
    }

    return (
        <div className="searchable-dropdown" ref={dropdownRef}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Search to add more ..."
            />
            {showOptions && (
                <ul className="options-list">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(option)}
                            className="option-item"
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchableDropdown;
