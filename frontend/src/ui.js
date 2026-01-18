// ui.js
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode, MathNode, TimerNode, ApiNode, ConditionNode } from './nodes/newNodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  math: MathNode,
  timer: TimerNode,
  api: ApiNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  initializeHistory: state.initializeHistory,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      initializeHistory,
    } = useStore(selector, shallow);

    // Initialize history on mount
    useEffect(() => {
      initializeHistory();
    }, [initializeHistory]);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div style={{
          margin: '16px 32px 24px',
          height: '65vh',
          minHeight: '500px',
          background: '#ffffff',
          border: '2px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(20, 184, 166, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          overflow: 'hidden',
          position: 'relative'
        }}>
            {/* Canvas Header */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: '18px 24px',
              background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
              borderBottom: '2px solid rgba(20, 184, 166, 0.2)',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#14B8A6',
                boxShadow: '0 0 12px rgba(20, 184, 166, 0.5)',
                animation: 'pulse 2s ease-in-out infinite'
              }} />
              <span style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#1e293b'
              }}>
                Pipeline Canvas
              </span>
              <div style={{
                marginLeft: 'auto',
                display: 'flex',
                gap: '10px',
                fontSize: '14px',
                color: '#64748b'
              }}>
                <span style={{
                  padding: '8px 14px',
                  background: 'rgba(20, 184, 166, 0.1)',
                  borderRadius: '10px',
                  fontWeight: '700',
                  color: '#14B8A6',
                  border: '1px solid rgba(20, 184, 166, 0.2)'
                }}>
                  {nodes.length} nodes
                </span>
                <span style={{
                  padding: '8px 14px',
                  background: 'rgba(14, 165, 164, 0.1)',
                  borderRadius: '10px',
                  fontWeight: '700',
                  color: '#0EA5A4',
                  border: '1px solid rgba(14, 165, 164, 0.2)'
                }}>
                  {edges.length} connections
                </span>
              </div>
            </div>

            <div ref={reactFlowWrapper} style={{width: '100%', height: '100%', paddingTop: '56px'}}>
              <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onInit={setReactFlowInstance}
                  nodeTypes={nodeTypes}
                  proOptions={proOptions}
                  snapGrid={[gridSize, gridSize]}
                  connectionLineType='smoothstep'
                  defaultEdgeOptions={{
                    style: { 
                      strokeWidth: 3, 
                      stroke: '#14B8A6'
                    },
                    type: 'smoothstep',
                    animated: true,
                    markerEnd: {
                      type: 'arrowclosed',
                      width: 22,
                      height: 22,
                      color: '#14B8A6'
                    }
                  }}
                  deleteKeyCode={null} // Disable default delete behavior (we handle it in ToolbarControls)
              >
                  <Background 
                    color="#14B8A6" 
                    gap={gridSize} 
                    size={1.5}
                    style={{ opacity: 0.3 }}
                  />
                  <Controls 
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                    showInteractive={false}
                  />
                  <MiniMap 
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden'
                    }}
                    maskColor="rgba(0, 0, 0, 0.05)"
                    nodeColor={(node) => {
                      const colors = {
                        customInput: '#3B82F6',
                        customOutput: '#10B981',
                        llm: '#F97316',
                        text: '#8B5CF6',
                        filter: '#14B8A6',
                        math: '#0EA5A4',
                        timer: '#EF4444',
                        api: '#22C55E',
                        condition: '#A855F7'
                      };
                      return colors[node.type] || '#64748B';
                    }}
                  />
              </ReactFlow>
            </div>

            <style>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: scale(0.98);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.6;
                  transform: scale(1.1);
                }
              }

              .react-flow__node {
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              }

              .react-flow__node.selected {
                box-shadow: 0 0 0 3px #14B8A6, 0 8px 24px rgba(20, 184, 166, 0.3) !important;
              }

              .react-flow__edge-path {
                transition: stroke-width 0.2s ease;
              }

              .react-flow__edge.selected .react-flow__edge-path,
              .react-flow__edge:hover .react-flow__edge-path {
                stroke-width: 3.5;
              }

              .react-flow__handle {
                width: 10px;
                height: 10px;
                border: 2px solid white;
                transition: all 0.2s ease;
              }

              .react-flow__handle:hover {
                width: 14px;
                height: 14px;
                box-shadow: 0 0 12px rgba(20, 184, 166, 0.6);
              }

              .react-flow__controls-button {
                background: white !important;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
                transition: all 0.15s ease !important;
              }

              .react-flow__controls-button:hover {
                background: #f9fafb !important;
                transform: scale(1.05);
              }

              .react-flow__controls-button svg {
                fill: #374151 !important;
              }
            `}</style>
          </div>
    );
};