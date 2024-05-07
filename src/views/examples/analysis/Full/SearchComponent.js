import React from 'react';
import Select from 'react-select';

function SearchComponent({ divisionOptions, universityOptions, departmentOptions, selectedDivision, selectedUniversity, selectedDepartment, onDivisionChange, onUniversityChange, onDepartmentChange, onSearchClick }) {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            minWidth: '200px',
            minHeight: '35px',
            height: '35px',
            margin: '10px'
        }),
        placeholder: (defaultStyles) => ({
            ...defaultStyles,
            fontSize: '12px',
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '12px',
            padding: '8px',
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '12px',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '12px',
        })
    };

    return (
        <div className="searchLayout">
            <div className="searchLineInputContainer">
                <span className="submitText">희망 계열:</span>
                <Select
                    value={selectedDivision}
                    onChange={onDivisionChange}
                    options={divisionOptions}
                    placeholder="키워드를 입력하세요!"
                    isClearable={true}
                    isSearchable={true}
                    styles={customStyles}
                    noOptionsMessage={() => null}
                />
            </div>
            <div className="searchUniversityInputContainer">
                <span className="submitText">희망 대학:</span>
                <Select
                    value={selectedUniversity}
                    onChange={onUniversityChange}
                    options={universityOptions}
                    placeholder="키워드를 입력하세요!"
                    isClearable={true}
                    isSearchable={true}
                    styles={customStyles}
                    noOptionsMessage={() => null}
                />
            </div>
            <div className="searchDepartmentInputContainer">
                <span className="submitText">희망 학과:</span>
                <Select
                    value={selectedDepartment}
                    onChange={onDepartmentChange}
                    options={departmentOptions}
                    placeholder="키워드를 입력하세요!"
                    isClearable={true}
                    isSearchable={true}
                    styles={customStyles}
                    noOptionsMessage={() => null}
                />
            </div>
            <button className="searchButton" onClick={onSearchClick}></button>
        </div>
    );
}

export default SearchComponent;