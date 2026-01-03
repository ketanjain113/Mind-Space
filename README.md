# 🧠 Mind-Space

> A mental wellness platform powered by AI, providing confidential support, cognitive tests, and community connection for campus students.


## 🌐 Live Demo

Visit the app: **[Link](https://ketanjain113.github.io/Mind-Space/)**

## ✨ Features

- 🤖 **AI-Powered Chat** - Talk to an intelligent AI counselor powered by Google Gemini
- 🧪 **Mental Health Tests** - Self-assessment tools for mental wellness
- 👥 **Community Support** - Connect with peers and share experiences
- 👤 **User Profiles** - Track your wellness journey
- 🆘 **SOS Button** - Quick access to emergency resources
- 🎨 **Beautiful UI** - Modern interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: CSS with Framer Motion animations
- **3D Graphics**: Three.js
- **AI**: Google Gemini API
- **Routing**: React Router with Hash-based navigation
- **Deployment**: GitHub Pages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Gemini API key from [ai.studio](https://ai.studio)

### Local Development

1. **Clone and install**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Mind-Space.git
   cd Mind-Space/frontend
   npm install
   ```

2. **Create environment file**
   ```bash
   # Create .env.local in frontend directory
   echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## 📋 Project Structure

```
Mind-Space/
├── frontend/                 # React + TypeScript app
│   ├── src/
│   │   ├── pages/           # Route pages
│   │   ├── components/      # React components
│   │   └── services/        # API services
│   ├── vite.config.ts       # Vite configuration
│   └── package.json
├── backend/                 # Node.js backend (optional)
│   ├── server.js
│   ├── routes/
│   └── package.json
├── .github/workflows/       # GitHub Actions CI/CD
└── DEPLOYMENT.md            # Detailed deployment guide
```

## 🚀 Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Branch: `gh-pages`

2. **Add API Key**
   - Settings → Secrets and variables → Actions
   - Add `GEMINI_API_KEY` secret

3. **Deploy**
   ```bash
   git push origin main
   ```
   The workflow will automatically build and deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 📱 Pages

- **Home** - Landing page with app overview
- **Talk Now** - AI chatbot for mental wellness support
- **Tests** - Mental health self-assessment tests
- **Community** - Connect with other students
- **Profile** - User profile and history
- **Login/Signup** - Authentication

## 🔐 Security

- API keys stored securely in GitHub Secrets
- No sensitive data in client-side code
- Environment variables properly managed

## 📝 Environment Variables

Create `.env.local` in the `frontend` directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For questions or issues:
- Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide
- Open an issue on GitHub
- Visit our community page

---

<div align="center">
  
**Made with ❤️ for student mental wellness**

</div>


