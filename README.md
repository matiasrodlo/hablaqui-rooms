# Hablaqui Rooms

A secure video-conferencing component for healthcare consultations, part of [Hablaqui](https://github.com/matiasrodlo/hablaqui). Built with React and Twilio Video.

![image](https://github.com/user-attachments/assets/58fc654c-52d9-420d-99fa-6e82e203bc13)

## Features

Real-time video and audio, screen sharing, chat, network quality indicators, recording, bandwidth optimization

## Quick Start

**Prerequisites:** Node.js v12+, Twilio account

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Twilio credentials

# Start development server
npm start
```

Visit `http://localhost:3000`

## Commands

```bash
npm start              # Development server
npm test               # Unit tests
npm run cypress:open   # E2E tests
npm run build          # Production build
npm run deploy:twilio-cli  # Deploy to Twilio
```

## Documentation

- [Architecture](docs/architecture/overview.md)
- [API Reference](docs/api/video.md)
- [Changelog](docs/CHANGELOG.md)

## License

Apache 2.0
