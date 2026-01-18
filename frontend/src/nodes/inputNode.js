// nodes/inputNode.js
import { Handle, Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Input"
      icon="📥"
      color="#3B82F6"
      fields={[
        {
          name: 'inputName',
          label: 'Input Name',
          type: 'text',
          defaultValue: id.replace('customInput-', 'input_')
        },
        {
          name: 'inputType',
          label: 'Data Type',
          type: 'select',
          options: ['Text', 'File', 'Number', 'Boolean'],
          defaultValue: 'Text'
        }
      ]}
      handles={[
        {
          type: 'source',
          position: Position.Right,     
          id: `${id}-value`
        }
      ]}
    />
  );
};
