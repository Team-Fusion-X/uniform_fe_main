import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };
    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="대학명을 입력해 주세요!"
                value={searchTerm}
                onChange={handleChange}
                style={{
                    flex: 1,
                    padding: "15px",
                    border: "none",
                    borderRadius: "5px 0 0 5px",
                    fontSize: "16px",
                    height: "50px"
                }}
            />
            <button type="submit" style={{
                backgroundColor: "#646EFF",
                color: "white",
                border: "none",
                padding: "15px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "0 5px 5px 0",
                height: "50px"
            }}>
                검색
            </button>
        </form>
    );
};

export default SearchBar;