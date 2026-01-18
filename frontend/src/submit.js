// submit.js
import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            const pipeline = { nodes, edges };
            
            // Call backend API
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pipeline: JSON.stringify(pipeline)
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Create custom alert modal
            showCustomAlert(result);
            
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            
            // Fallback to client-side calculation if backend is unavailable
            const result = calculateClientSide(nodes, edges);
            showCustomAlert(result, true);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateClientSide = (nodes, edges) => {
        const isDAG = (nodes, edges) => {
            const graph = {};
            const inDegree = {};
            
            nodes.forEach(node => {
                graph[node.id] = [];
                inDegree[node.id] = 0;
            });
            
            edges.forEach(edge => {
                graph[edge.source].push(edge.target);
                inDegree[edge.target]++;
            });
            
            const queue = [];
            Object.keys(inDegree).forEach(node => {
                if (inDegree[node] === 0) queue.push(node);
            });
            
            let processed = 0;
            while (queue.length > 0) {
                const node = queue.shift();
                processed++;
                
                graph[node].forEach(neighbor => {
                    inDegree[neighbor]--;
                    if (inDegree[neighbor] === 0) {
                        queue.push(neighbor);
                    }
                });
            }
            
            return processed === nodes.length;
        };
        
        return {
            num_nodes: nodes.length,
            num_edges: edges.length,
            is_dag: isDAG(nodes, edges)
        };
    };

    const showCustomAlert = (result, isOffline = false) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 15, 35, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%);
            border: 1px solid rgba(120, 119, 198, 0.3);
            border-radius: 24px;
            padding: 40px;
            max-width: 520px;
            width: 90%;
            box-shadow: 0 32px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(120, 119, 198, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        `;

        const statusIcon = result.is_dag ? '✨' : '⚠️';
        const statusColor = result.is_dag ? '#00d4aa' : '#ff6b9d';
        const statusText = result.is_dag ? 'Valid Neural Flow' : 'Cycle Detected';

        content.innerHTML = `
            <style>
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px ${statusColor}40; }
                    50% { box-shadow: 0 0 30px ${statusColor}60; }
                }
            </style>
            
            ${isOffline ? `
                <div style="
                    background: linear-gradient(135deg, rgba(255, 107, 157, 0.15) 0%, rgba(120, 119, 198, 0.1) 100%);
                    border: 1px solid rgba(255, 107, 157, 0.3);
                    border-radius: 16px;
                    padding: 16px;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                ">
                    <span style="font-size: 24px; animation: pulse 2s infinite;">🔌</span>
                    <div style="font-size: 14px; color: #ff6b9d; font-weight: 600;">
                        Backend Offline - Using Local Analysis
                    </div>
                </div>
            ` : ''}
            
            <div style="text-align: center; margin-bottom: 32px;">
                <div style="
                    width: 100px;
                    height: 100px;
                    margin: 0 auto 20px;
                    background: linear-gradient(135deg, ${statusColor}20 0%, ${statusColor}10 100%);
                    border: 2px solid ${statusColor}40;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    animation: glow 3s ease-in-out infinite;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        inset: 4px;
                        background: rgba(15, 15, 35, 0.8);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        ${statusIcon}
                    </div>
                </div>
                <h2 style="
                    margin: 0 0 12px;
                    font-size: 28px;
                    font-weight: 700;
                    background: linear-gradient(135deg, #ffffff 0%, #7877c6 50%, #ff77c6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                ">
                    Pipeline Analysis Complete
                </h2>
                <p style="
                    margin: 0;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 16px;
                ">
                    Neural network topology validated
                </p>
            </div>

            <div style="
                background: linear-gradient(135deg, rgba(120, 119, 198, 0.1) 0%, rgba(255, 119, 198, 0.05) 100%);
                border: 1px solid rgba(120, 119, 198, 0.2);
                border-radius: 20px;
                padding: 28px;
                margin-bottom: 28px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            ">
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="
                                width: 48px;
                                height: 48px;
                                background: linear-gradient(135deg, #7877c6 0%, #ff77c6 100%);
                                border-radius: 12px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 20px;
                                box-shadow: 0 8px 16px rgba(120, 119, 198, 0.3);
                            ">🔮</div>
                            <span style="color: #ffffff; font-weight: 600; font-size: 16px;">Neural Nodes</span>
                        </div>
                        <span style="
                            font-size: 32px;
                            font-weight: 700;
                            background: linear-gradient(135deg, #7877c6 0%, #ff77c6 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                        ">${result.num_nodes}</span>
                    </div>

                    <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(120, 119, 198, 0.3), transparent);"></div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="
                                width: 48px;
                                height: 48px;
                                background: linear-gradient(135deg, #00d4aa 0%, #7877c6 100%);
                                border-radius: 12px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 20px;
                                box-shadow: 0 8px 16px rgba(0, 212, 170, 0.3);
                            ">🔗</div>
                            <span style="color: #ffffff; font-weight: 600; font-size: 16px;">Connections</span>
                        </div>
                        <span style="
                            font-size: 32px;
                            font-weight: 700;
                            background: linear-gradient(135deg, #00d4aa 0%, #7877c6 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                        ">${result.num_edges}</span>
                    </div>

                    <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(120, 119, 198, 0.3), transparent);"></div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="
                                width: 48px;
                                height: 48px;
                                background: linear-gradient(135deg, ${statusColor} 0%, #7877c6 100%);
                                border-radius: 12px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 20px;
                                box-shadow: 0 8px 16px ${statusColor}30;
                            ">${statusIcon}</div>
                            <span style="color: #ffffff; font-weight: 600; font-size: 16px;">Flow Status</span>
                        </div>
                        <span style="
                            padding: 10px 20px;
                            background: linear-gradient(135deg, ${statusColor}20 0%, ${statusColor}10 100%);
                            color: ${statusColor};
                            border: 1px solid ${statusColor}40;
                            border-radius: 12px;
                            font-weight: 700;
                            font-size: 14px;
                        ">${statusText}</span>
                    </div>
                </div>
            </div>

            ${!result.is_dag ? `
                <div style="
                    background: linear-gradient(135deg, rgba(255, 107, 157, 0.15) 0%, rgba(255, 107, 157, 0.05) 100%);
                    border: 1px solid rgba(255, 107, 157, 0.3);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 28px;
                ">
                    <div style="display: flex; gap: 16px; align-items: start;">
                        <span style="font-size: 24px; margin-top: 2px;">🔄</span>
                        <div>
                            <div style="font-weight: 600; color: #ff6b9d; margin-bottom: 8px; font-size: 16px;">
                                Circular Dependency Detected
                            </div>
                            <div style="font-size: 14px; color: rgba(255, 107, 157, 0.8); line-height: 1.6;">
                                Your neural flow contains feedback loops. Ensure all connections flow in a single direction to create a valid directed acyclic graph (DAG).
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}

            <button id="closeModal" style="
                width: 100%;
                padding: 16px;
                background: linear-gradient(135deg, #7877c6 0%, #ff77c6 100%);
                color: white;
                border: none;
                border-radius: 16px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 24px rgba(120, 119, 198, 0.4);
                position: relative;
                overflow: hidden;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 32px rgba(120, 119, 198, 0.6)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 24px rgba(120, 119, 198, 0.4)';">
                <span style="position: relative; z-index: 1;">🚀 Continue Building</span>
            </button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        const closeButton = content.querySelector('#closeModal');
        const closeModal = () => {
            modal.style.animation = 'modalFadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        };

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes modalFadeOut {
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    };

    return (
        <div style={{
            padding: '20px 28px',
            background: 'linear-gradient(90deg, #14B8A6 0%, #0EA5A4 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            boxShadow: '0 -4px 20px rgba(20, 184, 166, 0.2)'
        }}>
            {/* Pipeline Stats - Moved to Left */}
            <div style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center'
            }}>
                <div style={{
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span>🔮</span>
                    <span>{nodes.length} nodes</span>
                </div>
                
                <div style={{
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span>🔗</span>
                    <span>{edges.length} edges</span>
                </div>
            </div>

            {/* Glow Effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                opacity: 0.8
            }} />

            {/* Submit Button - Moved to Right */}
            <button 
                type="button" 
                onClick={handleSubmit}
                disabled={isLoading || nodes.length === 0}
                style={{
                    position: 'relative',
                    background: nodes.length === 0 
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                    backgroundSize: '200% 200%',
                    color: nodes.length === 0 ? 'rgba(255, 255, 255, 0.7)' : '#1e293b',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '16px',
                    padding: '14px 32px',
                    fontSize: '16px',
                    fontWeight: '800',
                    cursor: nodes.length === 0 ? 'not-allowed' : 'pointer',
                    boxShadow: nodes.length === 0 
                        ? '0 4px 16px rgba(0, 0, 0, 0.2)' 
                        : '0 8px 32px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    opacity: nodes.length === 0 ? 0.6 : 1,
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                    if (nodes.length > 0 && !isLoading) {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 16px 48px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                        e.currentTarget.style.backgroundPosition = '100% 50%';
                    }
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = nodes.length === 0 
                        ? '0 4px 16px rgba(0, 0, 0, 0.2)' 
                        : '0 8px 32px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.backgroundPosition = '0% 50%';
                }}
            >
                {isLoading ? (
                    <>
                        <div style={{
                            width: '18px',
                            height: '18px',
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '3px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <span>Analyzing...</span>
                    </>
                ) : (
                    <>
                        <span style={{fontSize: '18px'}}>🧠</span>
                        <span>Analyze Pipeline</span>
                    </>
                )}
            </button>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};