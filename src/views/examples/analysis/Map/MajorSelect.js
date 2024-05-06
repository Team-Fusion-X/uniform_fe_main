import { useState } from 'react';
import styled from 'styled-components';

const checkboxesList = [
    '전체',
    '인문계열',
    '사회계열',
    '교육계열',
    '공학계열',
    '자연계열',
    '의학계열',
    '예체능계열'
];

const getDefaultCheckboxes = () =>
    checkboxesList.map(checkbox => ({
        name: checkbox,
        checked: false,
    }));

export function useCheckboxes(defaultCheckboxes) {
    const [checkboxes, setCheckboxes] = useState(
        defaultCheckboxes || getDefaultCheckboxes(),
    );

    function setCheckbox(index, checked) {
        const newCheckboxes = [...checkboxes];
        if (checkboxes[index].name === '전체') {
            newCheckboxes.forEach((box, idx) => {
                newCheckboxes[idx].checked = checked;
            });
        } else {
            newCheckboxes[index].checked = checked;
            newCheckboxes[0].checked = newCheckboxes.slice(1).every(box => box.checked);
        }
        setCheckboxes(newCheckboxes);
    }

    return {
        setCheckbox,
        checkboxes,
    };
}

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;
const Checkbox = styled.input`
  margin: 0px 10px 0px !important;
  cursor: pointer;
`;
const CheckboxLabel = styled.label`
  cursor: pointer;
  display: block;
  font-weight: normal;
`;

export function Checkboxes({ checkboxes, setCheckbox }) {
    return (
        <>
            <div style={{ marginTop: "30px" }}>
                <div style={{ marginBottom: "15px", fontSize: "18px" }}>
                    전공계열로 분석하기
                </div>
                <CheckboxContainer>
                    {checkboxes.map((checkbox, i) => (
                        <CheckboxLabel key={i}>
                            <Checkbox
                                type="checkbox"
                                checked={checkbox.checked}
                                onChange={e => {
                                    setCheckbox(i, e.target.checked);
                                }}
                            />
                            {checkbox.name}
                        </CheckboxLabel>
                    ))}
                </CheckboxContainer>
            </div>
        </>
    );
}

export default function CheckboxRadioExample({ onSelectionComplete }) {
    const { checkboxes, setCheckbox } = useCheckboxes();

    const handleSubmit = () => {
        const selectedNames = checkboxes.filter(c => c.checked && c.name !== '전체').map(c => c.name);
        if (onSelectionComplete) {
            onSelectionComplete(selectedNames);
        }
    };

    return (
        <div>
            <Checkboxes {...{ checkboxes, setCheckbox }} />
            <button onClick={handleSubmit} style={{ marginTop: '10px', marginLeft: '150px', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', backgroundColor: '#646EFF', border: 'none' }}>
                적용하기
            </button>
        </div>
    );
}
