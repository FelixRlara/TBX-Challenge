# Welcome to TBX Challenge! 🚀

A **Full Stack JavaScript application** that processes CSV files from an external API and displays them in a beautiful React interface with filtering and search capabilities! ✨

---

## 📋 Prerequisites

**Option 1: Docker (Recommended)**
- Docker Desktop installed
- Docker Compose installed

**Option 2: Manual Setup**
- Node.js 14.x (for backend)
- Node.js 16.x (for frontend)
- npm

---

## ⚡ Quick Start for Reviewers

**Easiest way to run (Docker):**

git clone <your-repo-url>
cd tbx-challenge
docker-compose up --build

Then open http://localhost:8080

That's it! 🎉

---

## 🌟 Features

**Backend** 🔧
- ✅ Consumes external TBX API
- ✅ Parses and validates CSV files
- ✅ RESTful endpoints
- ✅ Tested with real data

**Frontend** 🎨
- ✅ Responsive Bootstrap table
- ✅ Filter by file name
- ✅ Real-time search
- ✅ Redux state management

---

## 🛠️ Tech Stack

| Backend | Frontend | DevOps |
|---------|----------|--------|
| Node.js 14 | React 18 | Docker |
| Express.js | Redux Toolkit | Docker Compose |
| Axios | Bootstrap | Webpack 5 |
| Mocha + Chai | Jest | StandardJS |

---

## 🚀 Quick Start

### Option 1: Docker 🐳 (Easiest!)

docker-compose up --build

API: http://localhost:3000
Frontend: http://localhost:8080

Para detener:

docker-compose down

### Option 2: Manual Setup 💻

**Backend:**

cd api
npm install
npm start

Running on http://localhost:3000

**Frontend:**

cd frontend
npm install
npm start

Running on http://localhost:8080

> Note: Backend requires Node.js 14, Frontend requires Node.js 16

---

## 🧪 Running Tests

**Backend:**

cd api
npm test

Expected: 8 passing (3s) ✅

**Frontend:**

cd frontend
npm test

Expected: 7 passing (2s) ✅

---

## 🌐 API Endpoints

### GET /files/list

Get available files from TBX API

Response:
{
  "files": ["test1.csv", "test2.csv", "test3.csv"]
}

### GET /files/data

Get processed CSV data with validation

Query Parameters:
- fileName (optional) - Filter by specific file

Examples:

curl http://localhost:3000/files/data
curl http://localhost:3000/files/data?fileName=test2.csv

Response:
[
  {
    "file": "test1.csv",
    "lines": [
      {
        "text": "RgTya",
        "number": 64075909,
        "hex": "70ad29aacf0b690b0467fe2b2767f765"
      }
    ]
  }
]

### GET /health

Health check endpoint

Response:
{
  "status": "ok",
  "service": "tbx-api"
}

---


## 💡 Key Features

🔍 **Search**: Filter across all fields in real-time

📂 **File Filter**: View data from specific CSV files

✨ **Smart Validation**: Automatically filters invalid data

🔢 **Natural Sorting**: test1, test2... test15, test18 (correct order)

---

## 🐛 Troubleshooting

**Backend won't start?**

cd api
rm -rf node_modules package-lock.json
npm install
node --version  # Should be 14.x

**Frontend won't start?**

cd frontend
rm -rf node_modules package-lock.json
npm install
node --version  # Should be 16.x

**Docker issues?**

docker-compose down -v
docker system prune -f
docker-compose up --build

---

## 📄 License

This project was developed as part of the TBX technical challenge.

---

## 👨‍💻 Author

Built with ❤️ for the TBX Node Developer Challenge

**Made with Node.js, React, and lots of ☕**

---