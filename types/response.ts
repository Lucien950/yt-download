interface response {
    type: "download" | "update" | "error"
    url?: string
    error?: Error
    progress?: string
    eta?: string
}

export default response