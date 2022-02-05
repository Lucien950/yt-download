let apiUrl: string;
// TODO Deploy machine and get url
if (process.env.NODE_ENV == "development") apiUrl = "http://localhost:3001"
else apiUrl = "https://api.yt-download.com"

const ytPublic = "AIzaSyBdipjRgFltnuUknzQLgQXYNpW5y7TPqXE"

export {apiUrl, ytPublic};