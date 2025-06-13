import { useEffect,useState } from "react";


function SparklingStar  ({ id, onComplete }: { id: number, onComplete: (id: number) => void })  {
    const [position] = useState({
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      duration: 1000 + Math.random() * 1000
    });
  
    useEffect(() => {
      const timer = setTimeout(() => {
        onComplete(id);
      }, position.duration);
  
      return () => clearTimeout(timer);
    }, [id, onComplete, position.duration]);
  
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
          animation: `sparkle ${position.duration}ms ease-out forwards`
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-400"
        >
          <path
            d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.74L12 19.77L6.82 22.74L8 14.74L2 9L9.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  };


  export default SparklingStar;