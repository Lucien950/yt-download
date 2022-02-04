import type { NextPage } from 'next'
import Head from 'next/head'
import { BaseSyntheticEvent, useState } from 'react'
import { apiUrl, ytPublic } from '../config'
import { Snippet, YoutubeResponse } from '../types/youtube'
import validYouTubeURL from '../utils/validURL'

const Home: NextPage = () => {
	const download = async (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()

		// just trust me™
		const textBox = oldTextBox
		if(!validYouTubeURL(textBox)){
			console.error('Invalid Download URL')
			return
		}

		const videoRequestURL = new URL(apiUrl + "/download")
		videoRequestURL.searchParams.append('url', textBox)
    videoRequestURL.searchParams.append('format', formatState)
    videoRequestURL.searchParams.append('title', videoData.title)

		const a = document.createElement('a')
		a.href = videoRequestURL.href
		a.click()
		// TODO Success message?
	}
	const buttonChangeText = (e: BaseSyntheticEvent)=>{
		e.preventDefault()
		changeText((document.getElementById("url")! as HTMLInputElement).value as string)
	}
	const inputChangeText = (e: BaseSyntheticEvent)=>{
		e.preventDefault()
		changeText((document.getElementById("url")! as HTMLInputElement).value as string)
	}
	const changeText = async (textBox: string)=>{
		if(textBox == oldTextBox) return
		
		if (!validYouTubeURL(textBox)){
			// TODO show error -> not valid youtube url
			setVideoData({} as Snippet)
			setValidTextBox(false)
			console.error('Invalid URL')
			return 
		}
		setValidTextBox(true)
		setOldTextBox(textBox)
		
		const url = new URL(textBox)
		const videoID = url.searchParams.get('v')
		const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${ytPublic}`
		const allVideoData = await (await fetch(api)).json() as YoutubeResponse
		if(allVideoData.items.length == 0){
			// TODO IMPLEMENT ERROR
			setVideoData({} as Snippet)
			console.error('No video found')
			return
		}
		const videoData = allVideoData.items[0].snippet
		if(videoData.liveBroadcastContent == 'live'){
			// TODO Trying to download livestream
			console.error("Trying to download livestream")
			setValidTextBox(false)
			return
		}
		setVideoData(videoData)
	}
	const radioButtonEvent = (e: BaseSyntheticEvent) => { setFormat(e.target.value as videoFormat) }	

	let [oldTextBox, setOldTextBox] = useState('')
	let [videoData, setVideoData] = useState({} as Snippet)
	let [isValidTextBox, setValidTextBox] = useState(null as boolean | null)
	let [formatState, setFormat] = useState('' as videoFormat)
	type videoFormat = "3gp" | "aac" | "flv" | "m4a" | "mp3" | "mp4" | "ogg" | "wav" | "webm"
	const formats = ["3gp", "aac", "flv", "m4a", "mp3", "mp4", "ogg", "wav", "webm"]

	return (
    <>
      <Head>
        <title>ytDL: Download YouTube Videos</title>
        <meta name="description" content="Download YouTube Videos" />
      </Head>
      <div className="content pt-20">
        {/* search container */}
        <form onSubmit={download}>
          <div id="search" className="w-3/4 mx-auto relative flex items-center">
            <input
              className={
                "focus:ring-2 focus:outline-none px-4 py-2 rounded-full transition-all block w-full bg-gray-100" +
                (isValidTextBox
                  ? " border-2 border-opacity-70 border-green-400 ring-green-400"
                  : "")
              }
              type="text"
              name="url"
              id="url"
              placeholder="Paste a YouTube URL"
              onChange={inputChangeText}
            />
            <button
              onClick={buttonChangeText}
              className="absolute right-2 \
              outline-none stroke-slate-500 focus:stroke-slate-800 focus:drop-shadow-[0px_2px_1.5px_rgba(0,0,0,0.5)] transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
          {Object.keys(videoData).length > 0 && (
            <div id="results" className="grid grid-cols-2 gap-x-4">
              <img
                src={
                  videoData.thumbnails.maxres
                    ? videoData.thumbnails.maxres.url
                    : videoData.thumbnails.high.url
                }
                id="videoThumbnail"
                className="w-full"
              />
              <div>
                <h1 id="videoTitle" className="font-bold text-3xl">
                  {videoData.title}
                </h1>
                <div className="flex flex-row gap-1 flex-wrap w-3/4 mt-2 mb-4">
                  {videoData.tags.map((tag, i) => (
                    <span className="text-sm border-2 rounded-full overflow-hidden py-1 px-2" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p>
                  Published by <strong>{videoData.channelTitle}</strong> on{" "}
                  <strong>
                    {new Date(videoData.publishedAt).toLocaleDateString()}
                  </strong>
                </p>
                <p>
                  {videoData.description.substring(0, 130) +
                    (videoData.description.length > 130 ? "..." : "")}
                </p>

                {/* Radio Buttons */}
                <h2 className="mt-5 text-2xl font-bold mb-2">Format</h2>
                <div
                  className="inline-flex flex-row border-2 rounded-full overflow-hidden"
                  onChange={radioButtonEvent}
                >
                  {formats.map((format, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name="format"
                        value={format}
                        id={format}
                        className="hidden peer"
                      ></input>
                      <label
                        className={
                          "border-l-2 px-4 py-2 block \
                          last-of-type:pr-5 transition-colors duration-75 ease-in-out \
                          hover:cursor-pointer hover:bg-black hover:text-white \
                          peer-checked:bg-red-400"
                          + (i == 0 ? " border-l-0 pl-5" : "")
                        }
                        htmlFor={format}
                      >
                        {format}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Download Button */}
                <button
                  className="block px-20 py-2 bg-green-400 hover:bg-green-500 transition-all focus:ring ring-green-200 outline-none rounded-xl font-bold text-white mt-4"
                  type="submit"
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Home
