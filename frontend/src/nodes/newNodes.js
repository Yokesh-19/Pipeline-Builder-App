// filterNode.js
import { Handle, Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Filter"
      icon="🔍"
      color="#14B8A6"
      fields={[
        {
          name: 'condition',
          label: 'Filter Condition',
          type: 'select',
          options: ['equals', 'contains', 'greater_than', 'less_than', 'not_empty'],
          defaultValue: 'equals'
        },
        {
          name: 'value',
          label: 'Threshold Value',
          type: 'text',
          defaultValue: ''
        }
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
          style: { top: '40%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-filtered`,
          style: { top: '60%' }
        }
      ]}
    />
  );
};

// mathNode.js
export const MathNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Math Engine"
      icon="🧮"
      color="#0EA5A4"
      fields={[
        {
          name: 'operation',
          label: 'Operation Type',
          type: 'select',
          options: ['add', 'subtract', 'multiply', 'divide', 'power', 'sqrt'],
          defaultValue: 'add'
        }
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-a`,
          style: { top: '30%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-b`,
          style: { top: '70%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-result`
        }
      ]}
    />
  );
};

// timerNode.js
export const TimerNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Time Controller"
      icon="⏱️"
      color="#EF4444"
      fields={[
        {
          name: 'delay',
          label: 'Delay (ms)',
          type: 'number',
          defaultValue: '1000'
        },
        {
          name: 'repeat',
          label: 'Execution Mode',
          type: 'select',
          options: ['once', 'continuous', 'interval'],
          defaultValue: 'once'
        }
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-trigger`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
    />
  );
};

// apiNode.js
export const ApiNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Gateway"
      icon="🌐"
      color="#22C55E"
      fields={[
        {
          name: 'url',
          label: 'Endpoint URL',
          type: 'text',
          defaultValue: 'https://api.example.com'
        },
        {
          name: 'method',
          label: 'HTTP Method',
          type: 'select',
          options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          defaultValue: 'GET'
        },
        {
          name: 'headers',
          label: 'Request Headers',
          type: 'textarea',
          rows: 2,
          defaultValue: '{}'
        }
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-data`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`,
          style: { top: '40%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-error`,
          style: { top: '60%' }
        }
      ]}
    />
  );
};

// conditionNode.js
export const ConditionNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Logic Gate"
      icon="🧠"
      color="#A855F7"
      fields={[
        {
          name: 'expression',
          label: 'Condition Expression',
          type: 'text',
          defaultValue: 'x > 0'
        }
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-true`,
          style: { top: '40%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: { top: '60%' }
        }
      ]}
    />
  );
};