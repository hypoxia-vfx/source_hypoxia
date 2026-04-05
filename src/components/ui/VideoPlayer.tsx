import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
}

export function VideoPlayer({ src, poster, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(p)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-black aspect-video cursor-pointer">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        muted={isMuted}
        autoPlay={autoPlay}
        loop
        playsInline
      />
      
      {/* Custom Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:scale-110 transition-transform">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
          
          {/* Progress Bar Container */}
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
             <div 
               className="absolute top-0 left-0 h-full bg-white transition-all duration-100" 
               style={{ width: `${progress}%` }} 
             />
          </div>
          
          <button onClick={handleFullscreen} className="text-white hover:scale-110 transition-transform">
            <Maximize size={18} />
          </button>
        </div>
      </div>

      {/* Play/Pause Large indicator (Center) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <Play size={32} className="text-white ml-2" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  )
}
