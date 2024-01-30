# Full Stack Application Template

This is a template repository for quickly spinning up full stack applications using FastAPI for the backend and React with Material-UI for the frontend. This template also includes a system for automatic generation of types from the FastAPI backend.

## Features

Python (FastAPI) Backend: FastAPI is a modern, fast (high-performance) web framework for building APIs. We utilize it with python3.10 (as of this version) to quickly spin up a backend.

React Frontend: React is a JavaScript library for building user interfaces, and Material-UI provides a set of React components that implement Google's Material Design.

Automatic Type Generation: The system automatically generates types from the FastAPI backend to ensure type safety across the stack.

## Installation

### Prerequisites

- Python 3.10
- Node.js
- npm
- git

### Initial Install

Clone this repository

```
git clone git@github.com:banksfinn/fullstack-base.git
```

Run the setup script

```
./scripts/setup.sh
```

### Backend Setup

In the gateway directory, run

```
./start.sh
```

### Frontend Setup

```
yarn start
```

### Syncing API

In one terminal tab, run the gateway

```
cd gateway
./start.sh
```

In another, run

```
./scripts/sync_api.sh
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this template.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
