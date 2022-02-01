import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { apiUrl, ytPublic } from '../config'
import { Snippet, YoutubeResponse } from '../types/youtube'

const Home: NextPage = () => {
	const download = async (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()

		const videoRequestURL = new URL(apiUrl+"/download")
		// just trust me™
		videoRequestURL.searchParams.append('url', (e.currentTarget.elements as unknown as {url: HTMLInputElement}).url!.value)
		//TODO be able to select file format (change header too)
		// videoRequestURL.searchParams.append('format', 'mp4')
		const res = await fetch(videoRequestURL.href, {
			method: 'GET',
			headers: {
				'Content-Type': 'video/mp4', 
			},
		}).catch(err=>{
			console.error(err)
		})

		if(!res || !res.ok){
			// TODO show error
			return
		}

		const blob = await res.blob()
		const url = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'video.mp4' //todo change name based on YoutubeAPI
		a.click()
	}

	const submit = async (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()

		const url = new URL((e.currentTarget.elements as unknown as { url: HTMLInputElement }).url.value)
		if(!url.hostname.endsWith('youtube.com') && !url.hostname.endsWith('youtu.be')){
			// TODO show error -> not valid youtube url
			console.error('not valid youtube url')
			return 
		}
		const videoID = url.searchParams.get('v')
		const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${ytPublic}`
		const allVideoData = await (await fetch(api)).json() as YoutubeResponse
		const videoData = allVideoData.items[0].snippet
		setVideoData(videoData)
		console.log(videoData)
	}

	let [videoData, setVideoData] = useState({} as Snippet)

	return (
	<>
	  <Head>
		<title>ytDL: Download YouTube Videos</title>
		<meta name="description" content="Download YouTube Videos" />
	  </Head>
	  <div className="content">
		<form onSubmit={submit} className=" w-3/4 mx-auto relative flex items-center">
			<input
				className="focus:ring-2 focus:outline-none px-4 py-2 rounded-full transition-shadow block w-full bg-gray-100"
				type="text"
				name="url"
				id="url"
				placeholder="Paste a YouTube URL"
			/>
			<button type="submit" className="absolute right-4">
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
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
