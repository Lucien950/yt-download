const validYouTubeURL = (url: string) => {
    let urlObj;
    try { urlObj = new URL(url) }
    catch { return false }
    const linkArr = urlObj.hostname.split('.')
    const hostValid = linkArr.includes("youtube") || linkArr.includes("youtu.be")
    const pathValid = urlObj.searchParams.get('v') != null && urlObj.searchParams.get('v')!.length == 11;
    return hostValid && pathValid
}

export default validYouTubeURL