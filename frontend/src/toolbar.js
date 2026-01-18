// toolbar.js
import { DraggableNode } from './draggableNode';
import { ToolbarControls } from './toolbarControls';

export const PipelineToolbar = () => {
    return (
        <div style={{
            margin: '24px 32px 16px',
            background: '#F8FAFC',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '28px 32px',
            boxShadow: '0 8px 32px rgba(20, 184, 166, 0.1)',
            position: 'relative',
            zIndex: 5
        }}>
            {/* Header Section */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '28px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #14B8A6 0%, #0EA5A4 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                        fontSize: '20px',
                        color: 'white'
                    }}>
                        🧩
                    </div>
                    
                    <div>
                        <h2 style={{ 
                            margin: 0, 
                            color: '#1e293b',
                            fontSize: '26px',
                            fontWeight: '800'
                        }}>
                            Node Toolkit
                        </h2>
                        <p style={{
                            margin: 0,
                            fontSize: '16px',
                            color: '#64748b',
                            fontWeight: '600'
                        }}>
                            Drag components to build your pipeline
                        </p>
                    </div>
                </div>
                
                {/* Quick Actions - Positioned in header */}
                <div style={{ minWidth: '200px' }}>
                    <ToolbarControls />
                </div>
            </div>

            {/* Node Sections - Horizontal Layout */}
            <div style={{ 
                display: 'flex', 
                gap: '32px',
                alignItems: 'flex-start'
            }}>
                {/* Core Processing Units Section */}
                <div style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '2px solid #14B8A6',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(20, 184, 166, 0.15)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '20px',
                        paddingBottom: '16px',
                        borderBottom: '2px solid rgba(20, 184, 166, 0.2)'
                    }}>
                        <span style={{ fontSize: '22px' }}>⚡</span>
                        <h3 style={{ 
                            margin: 0, 
                            color: '#1e293b', 
                            fontSize: '20px',
                            fontWeight: '800'
                        }}>
                            Core Processing Units
                        </h3>
                        <div style={{
                            marginLeft: 'auto',
                            padding: '4px 12px',
                            background: 'rgba(20, 184, 166, 0.1)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            color: '#14B8A6',
                            fontWeight: '700',
                            border: '1px solid rgba(20, 184, 166, 0.2)'
                        }}>
                            4 nodes
                        </div>
                    </div>
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px'
                    }}>
                        <DraggableNode type='customInput' label='Input' />
                        <DraggableNode type='llm' label='LLM' />
                        <DraggableNode type='customOutput' label='Output' />
                        <DraggableNode type='text' label='Text' />
                    </div>
                </div>

                {/* Advanced Operations Section */}
                <div style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '2px solid #0EA5A4',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(14, 165, 164, 0.15)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '20px',
                        paddingBottom: '16px',
                        borderBottom: '2px solid rgba(14, 165, 164, 0.2)'
                    }}>
                        <span style={{ fontSize: '22px' }}>🔧</span>
                        <h3 style={{ 
                            margin: 0, 
                            color: '#1e293b', 
                            fontSize: '20px',
                            fontWeight: '800'
                        }}>
                            Advanced Operations
                        </h3>
                        <div style={{
                            marginLeft: 'auto',
                            padding: '4px 12px',
                            background: 'rgba(14, 165, 164, 0.1)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            color: '#0EA5A4',
                            fontWeight: '700',
                            border: '1px solid rgba(14, 165, 164, 0.2)'
                        }}>
                            5 nodes
                        </div>
                    </div>
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '16px'
                    }}>
                        <DraggableNode type='filter' label='Filter' />
                        <DraggableNode type='math' label='Math' />
                        <DraggableNode type='timer' label='Timer' />
                        <DraggableNode type='api' label='API' />
                        <DraggableNode type='condition' label='Condition' />
                    </div>
                </div>
            </div>
        </div>
    );
};