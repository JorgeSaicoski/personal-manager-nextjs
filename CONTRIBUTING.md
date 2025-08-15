# Contributing Guide

Thanks for your interest in helping with this project!

## Development Environment

### Local Setup
1. Install Node.js 20+
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Setup
1. Build and start using Docker Compose:
   ```bash
   docker compose up --build
   ```
   The compose file uses the `deps` build stage so all
   development dependencies (including `next`) are available.
2. The app will be available at [http://localhost:3000](http://localhost:3000).

## Code Quality
- Run linting before submitting a pull request:
  ```bash
  npm run lint
  ```
- Ensure the project builds:
  ```bash
  npm run build
  ```

## Submitting Changes
1. Fork the repository and create a branch from `main`.
2. Commit your changes with descriptive messages.
3. Open a pull request and describe the motivation and testing.

We appreciate your contributions!
