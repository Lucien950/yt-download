let apiUrl: string;
// TODO Deploy machine and get url
if (process.env.NODE_ENV == "production") {
    // apiUrl = "https://[URL].com/api"; 
} else {
    apiUrl = "http://localhost:3001";
}

const ytPublic = "AIzaSyDKQZqGIoVN33wujCfnr0ETXXME0DUtXwI"

export {apiUrl, ytPublic};