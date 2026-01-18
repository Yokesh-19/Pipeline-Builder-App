// draggableNode.js
export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const getNodeStyle = (type) => {
      const styles = {
        customInput: {
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          icon: '📥'
        },
        customOutput: {
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          icon: '📤'
        },
        llm: {
          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
          icon: '🤖'
        },
        text: {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
          icon: '📝'
        },
        filter: {
          background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          icon: '🔍'
        },
        math: {
          background: 'linear-gradient(135deg, #0EA5A4 0%, #0891B2 100%)',
          icon: '🔢'
        },
        timer: {
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          icon: '⏱️'
        },
        api: {
          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
          icon: '🌐'
        },
        condition: {
          background: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
          icon: '🔀'
        }
      };
      return styles[type] || { 
        background: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
        icon: '📦'
      };
    };

    const nodeStyle = getNodeStyle(type);
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '110px',
          height: '70px',
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '6px',
          borderRadius: '12px',
          background: nodeStyle.background,
          backgroundSize: '200% 200%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '14px',
          fontWeight: '800',
          position: 'relative',
          overflow: 'hidden'
        }} 
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.backgroundPosition = '100% 50%';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.backgroundPosition = '0% 50%';
        }}
        draggable
      >
          {/* Shimmer Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'shimmer 3s infinite'
          }} />
          
          <span style={{ 
            fontSize: '22px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}>
            {nodeStyle.icon}
          </span>
          <span style={{ 
            color: '#fff', 
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '0.4px',
            position: 'relative',
            zIndex: 1,
            fontSize: '14px',
            fontWeight: '800'
          }}>
            {label}
          </span>

          <style>{`
            @keyframes shimmer {
              0% { left: -100%; }
              100% { left: 200%; }
            }
          `}</style>
      </div>
    );
};