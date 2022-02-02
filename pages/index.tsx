import type { NextPage } from 'next'
import Head from 'next/head'
import { BaseSyntheticEvent, useState } from 'react'
import { apiUrl, ytPublic } from '../config'
import { Snippet, YoutubeResponse } from '../types/youtube'

const Home: NextPage = () => {
	const download = async (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()

		// just trust me™
		const textBox = (e.currentTarget.elements as unknown as { url: HTMLInputElement }).url!.value;
		if(!validYouTubeURL(textBox)){
			console.error('Invalid Download URL')
			return
		}

		const videoRequestURL = new URL(apiUrl + "/download")
		videoRequestURL.searchParams.append('url', textBox)
		videoRequestURL.searchParams.append('format', 'mp4')
		//TODO be able to select file format (change header too)

		const a = document.createElement('a')
		a.href = videoRequestURL.href
		a.download = 'video.mp4'
		a.click()
	}

	const submit = async (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		
		const textBox = (e.currentTarget.elements as unknown as { url: HTMLInputElement }).url.value
		if (!validYouTubeURL(textBox)){
			// TODO show error -> not valid youtube url
			console.error('Invalid URL')
			return 
		}

		const url = new URL(textBox)
		const videoID = url.searchParams.get('v')
		const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${ytPublic}`
		const allVideoData = await (await fetch(api)).json() as YoutubeResponse
		const videoData = allVideoData.items[0].snippet
		setVideoData(videoData)
	}

	const validYouTubeURL = (url:string)=>{
		let urlObj;
		try{ urlObj = new URL(url) }
		catch{ return false }
		return urlObj.hostname.endsWith('youtube.com') || urlObj.hostname.endsWith('youtu.be')
	}

	const changeValidate = (e: BaseSyntheticEvent)=>{
		const textBox = e.target.value
		if (!e.target.value){
			setValidTextBox(false)
			return false
		}
		const isValid = validYouTubeURL(textBox)
		setValidTextBox(isValid)
		return isValid
	}

	let [videoData, setVideoData] = useState({} as Snippet)
	let [isValidTextBox, setValidTextBox] = useState(null as boolean | null)

	return (
	<>
	  <Head>
		<title>ytDL: Download YouTube Videos</title>
		<meta name="description" content="Download YouTube Videos" />
	  </Head>
	  <div className="content pt-20">
		{/* search container */}
		<form onSubmit={submit} className=" w-3/4 mx-auto relative flex items-center">
			<input
				className={"focus:ring-2 focus:outline-none px-4 py-2 rounded-full transition-all block w-full bg-gray-100"
					+ (isValidTextBox ? ' border-2 border-opacity-70 border-green-400 ring-green-400' : '')}
				type="text"
				name="url"
				id="url"
				placeholder="Paste a YouTube URL"
				onChange={changeValidate}
			/>
			<button type="submit" className="absolute right-2">
				<svg className="w-6 h-6 stroke-slate-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" ></path>
				</svg>
			</button>
		</form>
		{
			Object.keys(videoData).length > 0 &&
			<div className="grid grid-cols-2 gap-x-4">
				<img
					src={videoData.thumbnails.maxres ? videoData.thumbnails.maxres.url : videoData.thumbnails.high.url}
					id="videoThumbnail" className="w-full"
				/>
				<div>
					<h1 id="videoTitle" className="font-bold text-3xl">{videoData.title}</h1>
					<p>{videoData.description.substring(0, 130) + (videoData.description.length > 130 ? '...' : "")}</p>
					{/* display date */}
					<p>Published by <strong>{videoData.channelTitle}</strong> on <strong>{new Date(videoData.publishedAt).toLocaleDateString()}</strong></p>
				</div>
			</div>
		}
	  </div>
	</>
  );
}

export default Home
