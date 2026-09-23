import React from "react"

function Button({
    text,
    onClick,
    className
}) {
    return(
    <button
            onClick={onClick}
            className={className}
    style={{
        padding: "10px 16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        width: "150px"
    }}
    >{text}</button>
    )
    
}

export default Button;