import React, { useState, useEffect, useRef } from 'react';
import './EditableText.css';

const EditableText = ({ 
  text, 
  as: Component = 'span', 
  className = '', 
  style = {}, 
  onSave, 
  multiline = false 
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('aevora_admin_auth') === 'true');
  }, []);

  const handleBlur = (e) => {
    setIsEditing(false);
    const newText = e.target.innerText;
    if (newText !== text && onSave) {
      onSave(newText);
    }
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      textRef.current.blur();
    }
  };

  if (!isAdmin) {
    return <Component className={className} style={style}>{text}</Component>;
  }

  return (
    <Component
      ref={textRef}
      className={`${className} editable-text-wrapper ${isEditing ? 'is-editing' : ''}`}
      style={{ ...style }}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {text}
    </Component>
  );
};

export default EditableText;
