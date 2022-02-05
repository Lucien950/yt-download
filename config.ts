const ytPublic = "AIzaSyBdipjRgFltnuUknzQLgQXYNpW5y7TPqXE"
let apiUrl: string;
if (process.env.NODE_ENV == "development") apiUrl = "http://localhost:8080"
else apiUrl = "https://api.yt-download.ca"

export {apiUrl, ytPublic};