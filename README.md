# Blog Platform Assignment

A full-stack blog platform built with React (frontend) and Node.js/Express (backend) with MongoDB for data persistence.

This project is the solution to the following assignment requirements:

## Assignment Requirements

### UI Task

- Build a blog frontend that includes the following essential pages:
  - A Post List page to display all posts with titles, summaries, and tags
  - A Post Detail page to show the full content of a single post when selected
  - An Add New Post form that allows users to create new blog entries
- Implement search functionality so users can quickly locate posts by keywords
- Add filtering by tags, enabling readers to easily browse posts based on categories or topics
- Ensure that the overall layout and design are responsive, adapting smoothly to both laptop and mobile devices

### Backend Task

- Create an API to add new posts, storing all necessary information such as title, content, tags, and timestamps
- Develop an API to update existing posts, so users can edit blog content after creation
- Implement an API to retrieve all posts, supporting filters like tags or keywords to allow advanced searching
- Provide an API to fetch a single post by ID

## Project Structure

```
Blog-Platform-Assignment/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AddNewPost/ # Add new blog post component
│   │   │   ├── PostDetail/ # Blog post detail view
│   │   │   └── PostList/   # Blog posts listing
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Application entry point
│   ├── package.json        # Frontend dependencies
│   └── Dockerfile          # Docker configuration for frontend
├── server/                 # Node.js backend API
│   ├── src/
│   │   ├── configs/        # Configuration files
│   │   │   ├── db.ts       # Database configuration
│   │   │   └── log4js.config.ts # Logging configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   │   ├── Post.ts     # Blog post model
│   │   │   └── Comment.ts  # Comment model
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── index.ts        # Server entry point
│   ├── package.json        # Backend dependencies
│   └── Dockerfile          # Docker configuration for backend
└── README.md               # Project documentation
```

## Features

- **Create Posts**: Add new blog posts with title and content
- **View Posts**: Browse all blog posts in a list view
- **Post Details**: View individual post details
- **Responsive Design**: Mobile-friendly interface
- **RESTful API**: Well-structured backend API
- **Database Integration**: MongoDB for data persistence
- **Logging**: Comprehensive logging with log4js
- **Docker Support**: Containerized deployment

## Technologies Used

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Sass** - CSS preprocessing
- **ESLint** - Code linting

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **log4js** - Logging framework
- **dotenv** - Environment variable management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Blog-Platform-Assignment
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

#### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend Setup

1. **Navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Configure your environment variables:

   ```env
   PORT=5000
   BASE_URL=http://localhost:5000
   MONGODB_URI=mongodb://localhost:27017/blog-platform
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

#### Backend Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get specific post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update existing post
- `DELETE /api/posts/:id` - Delete post

## Docker Deployment

### Quick Start with Docker Hub Images

The pre-built images are available on Docker Hub. You can run them directly:

#### Run Backend (API Server)

```bash
docker run -d \
  --name blog-backend \
  -p 5000:5000 \
  -e PORT=5000 \
  -e BASE_URL=http://localhost:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/blog-platform \
  -e NODE_ENV=production \
  <your-dockerhub-username>/blog-backend:latest
```

#### Run Frontend

```bash
docker run -d \
  --name blog-frontend \
  -p 3000:3000 \
  <your-dockerhub-username>/blog-frontend:latest
```

### Individual Container Deployment

#### Frontend Container

```bash
cd client
docker build -t blog-frontend .
docker run -p 3000:3000 blog-frontend
```

#### Backend Container

```bash
cd server
docker build -t blog-backend .
docker run -p 5000:5000 \
  -e PORT=5000 \
  -e BASE_URL=http://localhost:5000 \
  -e MONGODB_URI=mongodb://localhost:27017/blog-platform \
  -e NODE_ENV=production \
  blog-backend
```

## Development Workflow

1. **Start MongoDB** (if running locally)
2. **Start Backend Server** (Port 5000):
   ```bash
   cd server && npm run dev
   ```
3. **Start Frontend Development Server**:
   ```bash
   cd client && npm run dev
   ```

## Project Architecture

### Frontend Architecture

- **Component-based**: Modular React components
- **Type Safety**: Full TypeScript integration
- **Routing**: React Router for navigation
- **State Management**: React hooks and context
- **Styling**: Sass for enhanced CSS

### Backend Architecture

- **MVC Pattern**: Controllers, Models, Services
- **Middleware**: Request logging and error handling
- **Database**: MongoDB with Mongoose ODM
- **Logging**: Structured logging with log4js
- **Error Handling**: Centralized error management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Common Issues

1. **Port conflicts**: Make sure ports 5000 (backend) and 5173 (frontend) are available
2. **MongoDB connection**: Verify MongoDB is running and connection string is correct
3. **Dependencies**: Run `npm install` in both client and server directories
4. **CORS issues**: Backend includes CORS middleware, ensure frontend URL is allowed

### Logs

Backend logs are stored in `server/logs/app.log` for debugging purposes.
