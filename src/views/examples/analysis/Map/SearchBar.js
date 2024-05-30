import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from 'reactstrap';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <>
            <div className="text-center" style={{ fontSize: "17px", marginTop: "2rem" }}>
                원하는 지역이나 장소를 입력하여 검색하세요.
            </div>
            <Form onSubmit={handleSubmit} className="d-flex mt-3 mb-4">
                <FormGroup className="flex-grow-1 mr-2">
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        className="form-control"
                    />
                </FormGroup>
                <Button type="submit" color="primary" style={{ width: "100px" }}>검색</Button>
            </Form>
        </>
    );
};

export default SearchBar;
