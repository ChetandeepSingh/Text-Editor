# Text Editor Pro

A modern, responsive text editor with line numbers, syntax highlighting, and advanced features built with React.

🌐 **Live Demo**: [https://texteditor-pro.netlify.app/](https://texteditor-pro.netlify.app/)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark/Light Theme Toggle** - Seamless theme switching with persistent state
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Glassmorphism Effects** - Beautiful blur effects and modern styling
- **Smooth Animations** - Elegant transitions and hover effects

### 📝 **Core Editor Features**
- **Line Numbers** - Synchronized line numbering with text content
- **Current Line Highlighting** - Visual indicator for the active line
- **Jump to Line** - Quick navigation to any line number
- **Cursor Position Display** - Real-time line and column tracking
- **Synchronized Scrolling** - Perfect alignment between line numbers and text

### 💾 **File Management**
- **Load Text Files** - Import `.txt` files directly into the editor
- **Download as Text** - Export your content as `.txt` files
- **Clipboard Support** - Copy and paste functionality

### 🔧 **Technical Features**
- **Real-time Updates** - Instant cursor tracking and line highlighting
- **Cross-browser Compatibility** - Works on all modern browsers
- **Performance Optimized** - Smooth scrolling and responsive interactions
- **Accessibility** - Keyboard navigation and screen reader support

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks and functional components
- **CSS Modules** - Scoped styling for maintainable code
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Variables** - Dynamic theming system
- **Netlify** - Deployment and hosting platform

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChetandeepSingh/Text-Editor.git
   cd Text-Editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## 📱 Responsive Design

The editor adapts beautifully across all device sizes:

- **Desktop** (1200px+): Full-featured layout with 60px gutter
- **Tablet** (768px): Optimized layout with 50px gutter
- **Mobile** (480px): Compact layout with 40px gutter and stacked controls

## 🎨 Theme System

The editor features a sophisticated theming system:

- **Dark Theme**: Professional dark interface with blue accents
- **Light Theme**: Clean light interface with consistent styling
- **CSS Variables**: Easy customization of colors and styling
- **Smooth Transitions**: Elegant theme switching animations

## 🔧 Customization

### Modifying Colors
Edit the CSS variables in `src/App.css`:

```css
:root {
  --bg-main: #0a0a0f;
  --editor-bg: #1a1a2e;
  --accent: #60a5fa;
  /* ... more variables */
}
```

### Adding Features
The modular React component structure makes it easy to add new features:

- `TextEditor.jsx` - Main editor component
- `TextEditor.module.css` - Editor-specific styles
- `App.jsx` - App wrapper with theme management

## 🌐 Deployment

The project is deployed on **Netlify** with automatic deployments from the main branch.

### Deploy Your Own

1. **Fork the repository**
2. **Connect to Netlify**
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Deploy!**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Deployed on [Netlify](https://netlify.com/)
- Icons and styling inspired by modern code editors

## 📞 Contact

- **GitHub**: [@ChetandeepSingh](https://github.com/ChetandeepSingh)
- **Project Link**: [https://github.com/ChetandeepSingh/Text-Editor](https://github.com/ChetandeepSingh/Text-Editor)

---

⭐ **Star this repository if you found it helpful!**
