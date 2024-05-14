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
            <DropdownMenu style={{ maxHeight: '250px', overflowY: 'auto', overflowX: 'hidden', width: '100%' }}>
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

export function MajorSelect({
    selectedKeyword,
    setSelectedKeyword,
    selectedKeywords,
    toggleDropdown,
    isOpen,
    setSearch,
    search,
}) {
    return (
        <Dropdown isOpen={isOpen} toggle={toggleDropdown} style={{ width: '100%' }}>
            <DropdownToggle caret style={{ width: '100%' }}>
                {selectedKeyword || '학과 키워드 선택'}
            </DropdownToggle>
            <DropdownMenu style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <Input
                    type="search"
                    placeholder="학과 검색창"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ margin: '1rem', width: 'auto' }}
                />
                {selectedKeywords.filter(keyword => keyword.toLowerCase().includes(search.toLowerCase())).map((keyword, index) => (
                    <DropdownItem
                        key={index}
                        onClick={() => {
                            setSelectedKeyword(keyword);
                            toggleDropdown();
                        }}
                        style={{ paddingLeft: '1rem' }}
                    >
                        {keyword}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export default function MajorSelection({ onSelectionComplete }) {
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleTypeSelected = (keywords) => {
        setSelectedKeywords(keywords);
    };

    const handleSubmit = () => {
        if (onSelectionComplete && selectedKeyword) {
            onSelectionComplete(selectedKeyword);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={6}> {/* 계열 선택창 */}
                    <TypeSelect onTypeSelected={handleTypeSelected} />
                </Col>
                <Col md={6}> {/* 학과 키워드 선택창 */}
                    <MajorSelect {...{ setSelectedKeyword, selectedKeyword, selectedKeywords, toggleDropdown, isOpen, setSearch, search }} />
                </Col>
            </Row>
            <div className="text-center">
                <Button onClick={handleSubmit} color="primary" style={{ marginTop: '1rem', width: "120px" }}>
                    적용하기
                </Button>
            </div>
        </Container>
    );
}
