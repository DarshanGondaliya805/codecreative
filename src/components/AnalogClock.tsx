import { useEffect, useState } from "react"

export default function PremiumClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const h = time.getHours()
  const m = time.getMinutes()
  const s = time.getSeconds()

  const hDeg = h * 30 + m * 0.5
  const mDeg = m * 6
  const sDeg = s * 6

  return (
    <div className="relative w-[260px] h-[260px] rounded-full bg-[#f8fafc] flex items-center justify-center shadow-xl">

      {/* dial */}
      <div className="absolute w-full h-full rounded-full border border-gray-200" />

      {/* ticks */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className={`absolute ${
            i % 5 === 0 ? "w-[2px] h-[14px] bg-gray-700" : "w-[1px] h-[6px] bg-gray-300"
          }`}
          style={{
            transform: `rotate(${i * 6}deg) translateY(-120px)`
          }}
        />
      ))}

      {/* numbers */}
      <div className="absolute inset-0 text-sm font-semibold text-gray-700">
        <span className="absolute top-3 left-1/2 -translate-x-1/2">12</span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2">3</span>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2">6</span>
        <span className="absolute left-3 top-1/2 -translate-y-1/2">9</span>
      </div>

      {/* hour hand */}
      <div
        className="absolute w-[4px] h-[55px] bg-gray-800 rounded-full"
        style={{
          transform: `rotate(${hDeg}deg)`,
          transformOrigin: "bottom",
          bottom: "50%",
        }}
      />

      {/* minute hand */}
      <div
        className="absolute w-[3px] h-[80px] bg-gray-600 rounded-full"
        style={{
          transform: `rotate(${mDeg}deg)`,
          transformOrigin: "bottom",
          bottom: "50%",
        }}
      />

      {/* second hand */}
      <div
        className="absolute w-[2px] h-[95px] bg-orange-500 rounded-full"
        style={{
          transform: `rotate(${sDeg}deg)`,
          transformOrigin: "bottom",
          bottom: "50%",
        }}
      />

      {/* center dot */}
      <div className="w-3 h-3 bg-orange-500 rounded-full z-10" />

      {/* date (fixed position) */}
      <div className="absolute bottom-8 text-xs text-gray-500">
        {time.toLocaleDateString()}
      </div>
    </div>
  )
}