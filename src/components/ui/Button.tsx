// Custom next.js button

import React from "react";

interface ButtonProps {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Click handler
    id?: string; // Class name for styling
    disabled?: boolean; // Disable button
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button onClick={props.onClick} id={props.id} disabled={props.disabled}>
            {props.label}
        </button>
    )
}

export default Button;