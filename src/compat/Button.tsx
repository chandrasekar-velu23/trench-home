import React from 'react';

export default function Button({ children, className, style, ...props }: any) {
  return (
    <button
      className={className}
      style={{
        padding: '10px 20px',
        borderRadius: '100px',
        border: '1px solid rgba(49, 82, 185, 0.25)',
        backgroundColor: '#3152B9',
        color: '#FFFFFF',
        fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
