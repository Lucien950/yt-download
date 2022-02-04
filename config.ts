let apiUrl: string;
// TODO Deploy machine and get url
if (process.env.NODE_ENV == "production") {
    apiUrl = "https://api.yt-download.com"; 
} else {
    apiUrl = "http://localhost:3001";
}

const ytPublic = "AIzaSyDKQZqGIoVN33wujCfnr0ETXXME0DUtXwI"

export {apiUrl, ytPublic};