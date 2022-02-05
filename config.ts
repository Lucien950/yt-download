let apiUrl: string;
// TODO Deploy machine and get url
if (process.env.NODE_ENV == "development") apiUrl = "http://localhost:8080"
else apiUrl = "https://api.yt-download.ca"

const ytPublic = "AIzaSyBdipjRgFltnuUknzQLgQXYNpW5y7TPqXE"

export {apiUrl, ytPublic};