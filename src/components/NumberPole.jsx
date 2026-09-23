import React from "react";

function NumberPole({
    value,
    onChange,
    placeholder,
    className
}) {
    return(
        <input
            type="number"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "80px"}}
        >

        </input>
    )
}

export default NumberPole;