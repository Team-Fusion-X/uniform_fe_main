import React, { useState } from 'react';
import { Container, Dropdown, DropdownToggle, DropdownMenu, Input, Button, CustomInput, DropdownItem, Row, Col } from 'reactstrap';
import data from './json/fields_keyword.json';

export function TypeSelect({ onTypeSelected }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("계열 선택");

    const toggle = () => setIsOpen(!isOpen);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        const selectedData = data.find(item => item.fields === type);
        const keywords = selectedData && selectedData.keywords ? selectedData.keywords.split(',') : [];
        onTypeSelected(keywords); // 선택된 키워드를 상위 컴포넌트로 전달
    };

    return (
        <Dropdown isOpen={isOpen} toggle={toggle} style={{ width: '100%' }}> {/* 여기에 width: 100% 추가 */}
            <DropdownToggle caret style={{ width: '100%' }}> {/* 토글 버튼도 너비 100%로 설정 */}
                {selectedType}
            </DropdownToggle>
            <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden', width: '100%' }}>
                {data.map((item) => (
                    <DropdownItem key={item.fields} onClick={() => handleTypeSelect(item.fields)}>
                        {item.fields}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export function useSelectMajors() {
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedMajors(
            event.target.checked
                ? [...selectedMajors, value]
                : selectedMajors.filter(major => major !== value)
        );
    };

    const handleRemoveMajor = (majorToRemove) => {
        setSelectedMajors(selectedMajors.filter(major => major !== majorToRemove));
    };

    return {
        handleSelectChange,
        selectedMajors,
        toggleDropdown,
        isOpen,
        setSearch,
        search,
        handleRemoveMajor,
    };
}

export function SelectedMajorsDisplay({ selectedMajors, onRemove }) {
    return (
        <Container style={{ border: '1px solid #ccc', padding: '0.625rem', marginTop: '1rem' }}>
            {selectedMajors.length > 0 ? (
                selectedMajors.map((major, index) => (
                    <div key={index} style={{ padding: '0.1rem 0.625rem', border: '1px solid #ccc', margin: '0.3125rem', display: 'inline-block', marginLeft: '0.625rem', height: '3rem', lineHeight: '2.5' }}>
                        <span style={{ flex: '1' }}>{major}</span>
                        <Button close onClick={() => onRemove(major)} />
                    </div>
                ))
            ) : (
                <div>선택된 전공이 없습니다.</div>
            )}
        </Container>
    );
}

export function MajorSelect({
    handleSelectChange,
    selectedMajors,
    selectedKeywords, // 새로 생성
    toggleDropdown,
    isOpen,
    setSearch,
    search
}) {
    return (
        <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
                학과 키워드 선택
            </DropdownToggle>
            <DropdownMenu>
                <Input
                    type="search"
                    placeholder="학과 검색창"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ margin: '1rem', width: 'auto' }}
                />
                {selectedKeywords.filter(keyword => keyword.toLowerCase().includes(search.toLowerCase())).map((keyword, index) => (
                    <div style={{ paddingLeft: '1rem' }}>
                        <CustomInput
                            key={`${keyword}-${index}`}
                            type="checkbox"
                            id={`keyword-${index}`}
                            label={keyword}
                            value={keyword}
                            checked={selectedMajors.includes(keyword)}
                            onChange={handleSelectChange}
                        />
                    </div>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export default function MajorSelection({ onSelectionComplete }) {
    const { handleSelectChange, selectedMajors, toggleDropdown, isOpen, setSearch, search, handleRemoveMajor } = useSelectMajors();
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const handleTypeSelected = (keywords) => {
        setSelectedKeywords(keywords);
    };

    const handleSubmit = () => {
        if (onSelectionComplete) {
            onSelectionComplete(selectedMajors);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={6}> {/* 계열 선택창 */}
                    <TypeSelect onTypeSelected={handleTypeSelected} />
                </Col>
                <Col md={6}> {/* 학과 키워드 선택창 */}
                    <MajorSelect {...{ handleSelectChange, selectedMajors, selectedKeywords, toggleDropdown, isOpen, setSearch, search }} />
                </Col>
            </Row>
            <SelectedMajorsDisplay selectedMajors={selectedMajors} onRemove={handleRemoveMajor} />
            <div className="text-center">
                <Button onClick={handleSubmit} color="primary" style={{ marginTop: '1rem', width: "120px" }}>
                    적용하기
                </Button>
            </div>
        </Container>
    );
}
