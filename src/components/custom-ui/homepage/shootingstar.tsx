

function ShootingStar  ({ top, keyId }: { top: string, keyId: number }) {
    return (
    <div
        key={keyId}
        className="pointer-events-none fixed z-30"
        style={{
            top,
            left: 0,
            width: "100vw",
            height: 0,
            overflow: "visible",
        }}
    >
        <div
            className="shooting-star"
            style={{
                animation: "shooting 1.2s linear forwards",
            }}
        />
        <style jsx>{`
        .shooting-star {
          position: absolute;
          left: 0;
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, #fff 0%, #fff0 100%);
          opacity: 0.8;
          border-radius: 2px;
          box-shadow: 0 0 8px 2px #fff;
        }
        @keyframes shooting {
          0% {
            left: 0;
            opacity: 0.8;
            width: 120px;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 90vw;
            opacity: 0;
            width: 0;
          }
        }
      `}</style>
    </div>
);
}

export default ShootingStar;