// nodes/textNode.js
import { Handle, Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const TextNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text Processor"
      icon="📝"
      color="#8B5CF6"
      fields={[
        {
          name: 'text',
          label: 'Content',
          type: 'textarea',
          rows: 4,
          placeholder: 'Enter text here... Use {{ variableName }} for dynamic variables',
          defaultValue: ''
        }
      ]}
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
    />
  );
};