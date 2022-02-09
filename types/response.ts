interface response {
    type: "download" | "update" | "error"
    url?: string
    error?: Error
    progress?: number
    eta?: string
}

export default response