import React from 'react';
import PropTypes from 'prop-types';


const CustomButton = ({ text, onClick, icon: Icon, variant = 'primary', size = 'medium', disabled = false, style = {}, className = '', ...props }) => {

    const variantStyles = {
        primary: 'bg-c-purple text-white',
        secondary: 'bg-gray-300 text-black',
        danger: 'bg-red-500 text-white',
    };

    const sizeStyles = {
        small: 'px-4 py-1 text-sm',
        medium: 'px-6 py-2 text-base',
        large: 'px-8 py-3 text-lg',
    };

    const combinedStyles = `${variantStyles[variant] || ''} ${sizeStyles[size] || ''} ${className}`;
        
  return (
    <button
      className={`w-fit flex gap-5 items-center self-end rounded-full ${combinedStyles}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
      {Icon && <Icon size={30} />}
    </button>
  );
};

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.elementType,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
  };
export default CustomButton;
