// baseNode.js
import { useState } from 'react';
import { Handle } from 'reactflow';
import { useStore } from './store';

export const BaseNode = ({               //accepts
  id,                          
  data, 
  title, 
  fields = [], 
  handles = [], 
  style = {},
  icon = '🔮',
  color = '#3b82f6'
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [fieldValues, setFieldValues] = useState(() => {              //default values are filled first
    const initial = {};
    fields.forEach(field => {
      initial[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initial;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  const defaultStyle = {
    minWidth: 260,
    minHeight: 140,
    background: '#ffffff',
    border: `2px solid ${color}`,
    borderRadius: '16px',
    padding: '0',
    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    ...style
  };

  return (
    <div 
      style={defaultStyle}
      onMouseEnter={(e) => {                             //hover effects
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.15)`;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)`;
        e.currentTarget.style.borderColor = `${color}`;
      }}
    >
      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            width: '14px',
            height: '14px',
            background: color,
            border: '3px solid white',
            boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15)`,
            transition: 'all 0.2s ease',
            ...handle.style
          }}
        />
      ))}
      
      {/* Header */}
      <div style={{ 
        background: color,
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        borderBottom: `1px solid ${color}20`
      }}>
        {/* Icon Container */}
        <div style={{
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          {icon}
        </div>
        
        <div style={{ 
          fontWeight: '800', 
          color: 'white',
          fontSize: '20px',
          letterSpacing: '0.4px',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
        }}>
          {title}
        </div>
      </div>
      
      {/* Fields Container */}
      <div style={{ padding: '24px' }}>
        {fields.map((field, index) => (
          <div key={index} style={{ marginBottom: index === fields.length - 1 ? 0 : '20px' }}>
            <label style={{ 
              display: 'block',
              fontSize: '15px',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px'
            }}>
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select 
                value={fieldValues[field.name]} 
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontWeight: '600'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = color;
                  e.target.style.boxShadow = `0 0 0 3px ${color}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={fieldValues[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder || ''}
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  background: 'white',
                  color: '#374151',
                  resize: 'vertical',
                  minHeight: '90px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontWeight: '600'
                }}
                rows={field.rows || 3}
                onFocus={(e) => {
                  e.target.style.borderColor = color;
                  e.target.style.boxShadow = `0 0 0 3px ${color}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={fieldValues[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder || ''}
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  background: 'white',
                  color: '#374151',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontWeight: '600'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = color;
                  e.target.style.boxShadow = `0 0 0 3px ${color}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};