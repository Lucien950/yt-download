const LogUpdate = ({progress, eta}: {progress: number, eta: string}) => {
	return (
		<div className="flex flex-row border-b-2 last:border-b-0">
			<svg className="w-6 h-6 pr-2 border-r-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" >
				</path>
			</svg>
			<p className="pl-2">Progress: {`${progress}%`} {eta ? ` Done in: ${eta}` : ""}</p>
		</div>
	)
}

const LogError = ({error}:{error: Error}) => {
		return (
			<div className="flex flex-row border-2 border-red-600 bg-red-500">
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" ></path>
				</svg>
				<p>ERROR {error.message}</p>
			</div>
		);
}

const LogDownload = ({url}: {url:string}) => {
		return (
			<div className="flex flex-row border-b-2 last:border-b-0">
				<svg
					className="w-6 h-6 border-r-2 pr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					></path>
				</svg>
				<a href={url} className="text-blue-500 underline pl-2 ">
					DOWNLOAD READY!{" "}
				</a>
			</div>
		);
}

export { LogUpdate, LogError, LogDownload};