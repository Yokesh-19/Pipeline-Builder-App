import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 25%, #99f6e4 50%, #5eead4 75%, #2dd4bf 100%)',
      backgroundSize: '400% 400%',
      animation: 'lightGradientFlow 20s ease infinite',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Light Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(14, 165, 164, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(45, 212, 191, 0.08) 0%, transparent 50%)
        `,
        animation: 'particleFloat 25s ease-in-out infinite'
      }} />

      {/* Teal-Turquoise Navbar */}
      <div style={{
        background: 'linear-gradient(90deg, #14B8A6 0%, #0EA5A4 100%)',
        padding: '24px 32px',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Modern Logo */}
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
            fontSize: '24px',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            🔮
          </div>
          
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '800',
              color: 'white',
              letterSpacing: '-0.5px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              VectorShift Pipeline Builder
            </h1>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500'
            }}>
              Create powerful AI workflows with intuitive drag-and-drop nodes
            </p>
          </div>
        </div>
      </div>

      {/* Node Toolkit - Positioned above canvas [toolbar.js]*/} 
      <PipelineToolbar />
      
      {/* Main Canvas Area ui.js*/}
      <PipelineUI />
      
      {/* Submit Area submit.js*/}
      <SubmitButton />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes lightGradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
}

export default App;