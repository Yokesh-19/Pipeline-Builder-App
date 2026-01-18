# Pipeline Builder App

A full-stack drag-and-drop pipeline builder for creating AI workflows with React Flow frontend and FastAPI backend. Features 9 node types, variable detection, and DAG validation.

![Pipeline Builder Demo](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

## 🚀 Features

### ✨ Core Functionality
- **Drag & Drop Interface** - Intuitive visual pipeline creation
- **9 Node Types** - Input, Output, LLM, Text, Filter, Math, Timer, API, Condition
- **Variable Detection** - Auto-detects `{{variableName}}` patterns in text nodes
- **DAG Validation** - Real-time cycle detection using Kahn's algorithm
- **Auto-Generation** - Create input nodes automatically from text variables

### 🎨 UI/UX
- **Professional Design** - Color-coded nodes with hover effects
- **Responsive Layout** - Works on different screen sizes
- **Smooth Animations** - Enhanced user experience
- **Real-time Feedback** - Instant validation and alerts

### 🔧 Technical Features
- **BaseNode Abstraction** - Reusable component architecture
- **Dynamic Sizing** - Nodes resize based on content
- **CORS Support** - Seamless frontend-backend communication
- **Error Handling** - Comprehensive error management

## 🛠️ Tech Stack

**Frontend:**
- React 18+
- React Flow - Visual graph library
- Zustand - State management
- Modern CSS - Styling and animations

**Backend:**
- FastAPI - Python web framework
- Pydantic - Data validation
- Uvicorn - ASGI server
- Python 3.8+

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Yokesh-19/Pipeline-Builder-App.git
cd Pipeline-Builder-App
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Backend runs on:** http://localhost:8000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

**Frontend runs on:** http://localhost:3000

## 🎯 Usage Guide

### Creating Your First Pipeline

1. **Add Nodes** - Drag nodes from the toolbar to the canvas
2. **Configure Properties** - Click nodes to edit their settings
3. **Connect Nodes** - Drag from output handles to input handles
4. **Submit Pipeline** - Click submit to validate and analyze

### Working with Text Nodes

1. **Add Variables** - Type: `Hello {{name}}, you are {{age}} years old`
2. **Auto-Detection** - Variables appear below the node title
3. **Input Handles** - Blue handles automatically created for each variable
4. **Quick Setup** - Use "Create Inputs" button to generate Input nodes

### Testing DAG Validation

**Valid Pipeline Example:**
```
Input → Text → LLM → Output
Result: ✅ "Is Valid DAG: Yes"
```

**Invalid Pipeline (Cycle):**
```
Text1 → Text2 → Text1
Result: ❌ "Is Valid DAG: No"
```

## 📁 Project Structure

```
Pipeline-Builder-App/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── nodes/          # Node components
│   │   ├── App.js          # Main application
│   │   ├── baseNode.js     # Node abstraction
│   │   ├── store.js        # Zustand state management
│   │   ├── ui.js           # ReactFlow canvas
│   │   ├── toolbar.js      # Node toolbar
│   │   └── submit.js       # Submit functionality
│   └── package.json        # Node dependencies
└── README.md               # Project documentation
```

## 🎨 Node Types

| Node Type | Color | Description |
|-----------|-------|-------------|
| **Input** | Blue | Data input with name and type configuration |
| **Output** | Green | Data output with name and type settings |
| **LLM** | Orange | Language model with system/prompt inputs |
| **Text** | Purple | Text processing with variable detection |
| **Filter** | Light Orange | Conditional data filtering |
| **Math** | Teal | Mathematical operations |
| **Timer** | Red | Delay and timing operations |
| **API** | Light Green | External API calls |
| **Condition** | Light Purple | Conditional branching logic |

## 🔌 API Endpoints

### Backend API
- `GET /` - Health check endpoint
- `POST /pipelines/parse` - Parse and validate pipeline

**Request Format:**
```json
{
  "pipeline": "{\"nodes\": [...], \"edges\": [...]}"
}
```

**Response Format:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## 🧪 Testing

### Manual Testing Steps
1. Start both backend and frontend servers
2. Create a simple pipeline: Input → Text → Output
3. Add variables to Text node: `{{username}} and {{email}}`
4. Connect all nodes properly
5. Submit and verify the response

### Cycle Detection Test
1. Create two Text nodes
2. Connect: Text1 → Text2 → Text1 (creates cycle)
3. Submit pipeline
4. Verify response shows "Is Valid DAG: No"

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

### Backend Deployment
```bash
cd backend
# Use Docker or deploy to cloud services like AWS, Heroku, etc.
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Yokesh Manoharan**
- GitHub: [@Yokesh-19](https://github.com/Yokesh-19)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- React Flow team for the excellent graph visualization library
- FastAPI community for the robust web framework
- VectorShift for the technical assessment opportunity

## 📊 Project Stats

- **Lines of Code:** ~2000+
- **Components:** 15+
- **API Endpoints:** 2
- **Node Types:** 9
- **Development Time:** [Your timeframe]

---

⭐ **Star this repository if you found it helpful!**