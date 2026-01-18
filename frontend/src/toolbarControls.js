// toolbarControls.js
import { useStore } from './store';
import { useEffect } from 'react';

export const ToolbarControls = () => {
    const { undo, redo, deleteSelectedNodes, canUndo, canRedo } = useStore();

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Undo: Ctrl+Z or Cmd+Z
            if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
                event.preventDefault();
                if (canUndo()) {
                    undo();
                }
            }
            
            // Redo: Ctrl+Shift+Z or Cmd+Shift+Z or Ctrl+Y
            if (((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') ||
                ((event.ctrlKey || event.metaKey) && event.key === 'y')) {
                event.preventDefault();
                if (canRedo()) {
                    redo();
                }
            }
            
            // Delete: Delete or Backspace
            if (event.key === 'Delete' || event.key === 'Backspace') {
                // Only if not typing in an input
                if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
                    event.preventDefault();
                    deleteSelectedNodes();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, deleteSelectedNodes, canUndo, canRedo]);

    const buttonStyle = (disabled, isDelete = false) => ({
        padding: '10px 16px',
        background: disabled 
            ? '#f1f5f9'
            : isDelete 
                ? 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)'
                : 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
        border: `2px solid ${disabled ? '#e2e8f0' : isDelete ? '#fca5a5' : '#14B8A6'}`,
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '700',
        color: disabled ? '#94a3b8' : isDelete ? '#dc2626' : '#1e293b',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.6 : 1,
        minWidth: '90px',
        justifyContent: 'center',
        boxShadow: disabled ? 'none' : '0 3px 6px rgba(20, 184, 166, 0.15)'
    });

    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
        }}>
            {/* Delete Button - First */}
            <button
                onClick={deleteSelectedNodes}
                style={buttonStyle(false, true)}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.25)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 3px 6px rgba(20, 184, 166, 0.15)';
                }}
                title="Delete Selected (Del)"
            >
                <span>🗑️</span>
                <span>Delete</span>
            </button>

            {/* Undo Button - Second */}
            <button
                onClick={undo}
                disabled={!canUndo()}
                style={buttonStyle(!canUndo())}
                onMouseEnter={(e) => {
                    if (canUndo()) {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(20, 184, 166, 0.25)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = canUndo() ? '0 3px 6px rgba(20, 184, 166, 0.15)' : 'none';
                }}
                title="Undo (Ctrl+Z)"
            >
                <span>↶</span>
                <span>Undo</span>
            </button>

            {/* Redo Button - Third */}
            <button
                onClick={redo}
                disabled={!canRedo()}
                style={buttonStyle(!canRedo())}
                onMouseEnter={(e) => {
                    if (canRedo()) {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(20, 184, 166, 0.25)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = canRedo() ? '0 3px 6px rgba(20, 184, 166, 0.15)' : 'none';
                }}
                title="Redo (Ctrl+Shift+Z)"
            >
                <span>↷</span>
                <span>Redo</span>
            </button>
        </div>
    );
};