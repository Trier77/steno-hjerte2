export default function OvariesBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#c9948a] overflow-hidden">
      {/* Layered watercolour washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_85%_at_40%_50%,#a85e58,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_80%_25%,#9c5265,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_10%_75%,#a86058,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_60%_85%,#924d5e,transparent_50%)]" />

      {/* Slow breathing glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(180,100,110,0.35),transparent_70%)] animate-heartbeat" />

      {/* Soft fluid wash layers */}
      <div className="absolute top-[-10%] left-[-5%]  w-[55vw] h-[55vw] bg-[radial-gradient(ellipse,rgba(190,110,110,0.55),transparent_65%)] animate-wash-a [animation-delay:0s]" />
      <div className="absolute top-[30%]  left-[40%]  w-[50vw] h-[50vw] bg-[radial-gradient(ellipse,rgba(175,100,125,0.50),transparent_60%)] animate-wash-b [animation-delay:5s]" />
      <div className="absolute top-[55%]  left-[-10%] w-[45vw] h-[45vw] bg-[radial-gradient(ellipse,rgba(200,125,115,0.52),transparent_65%)] animate-wash-c [animation-delay:3s]" />
      <div className="absolute top-[-5%]  left-[55%]  w-[40vw] h-[40vw] bg-[radial-gradient(ellipse,rgba(185,105,120,0.48),transparent_60%)] animate-wash-a [animation-delay:9s]" />
      <div className="absolute top-[60%]  left-[50%]  w-[48vw] h-[48vw] bg-[radial-gradient(ellipse,rgba(195,118,112,0.50),transparent_65%)] animate-wash-b [animation-delay:7s]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,rgba(80,25,35,0.85)_100%)]" />
    </div>
  );
}
