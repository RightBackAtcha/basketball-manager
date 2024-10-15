import { useState } from "react";

interface InputProps {
    inputValue: string;
    onChange: (value: string) => void;
    min?: number;
    max?: number;
}

const InputNumber: React.FC<InputProps> = ( props: InputProps) => {

    // Function to handle change in input value
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Empty value will clear input
        if (value === '') {
            props.onChange(value);
            return;
        }

        // Use regex to only allow integers
        const numberPattern = /^[0-9]*$/;
        if (numberPattern.test(value)) {
            const numberValue = Number(value);

            // Only update if valid number
            if ((props.min === undefined || numberValue >= props.min) &&
                (props.max === undefined || numberValue <= props.max)
            ) {
                props.onChange(value);
            }
        }
    };

    // Render input field and display value
    return (
        <div>
            <input
                type='text'
                value={props.inputValue}
                onChange={handleInputChange}
                min={props.min}
                max={props.max}
                style={{
                    marginTop: '12px',
                    marginLeft: '10px',
                    height: '31px',
                }}
            />
        </div>)
}

export default InputNumber;