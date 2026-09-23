import React from "react";

function TextPole({value, onChange, placeholder, className}) {
    return(
        <input 
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "200px" }}
        ></input>
    )
}

export default TextPole;