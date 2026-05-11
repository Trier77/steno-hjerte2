export default function LungsBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#3d1418] overflow-hidden">
      {/* Warm tissue gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_85%_at_50%_50%,#6b2228,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_15%_40%,#5a1c22,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_85%_40%,#5a1c22,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_85%,#3a1018,transparent_55%)]" />

      {/* Slightly lighter airy centre — like looking toward the airway */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_40%,rgba(180,100,100,0.18),transparent_65%)] animate-breathe" />

      {/* Morphing tissue blobs — mirrored left/right like two lobes */}
      <div className="absolute top-[5%]  left-[5%]  w-56 h-56 bg-[radial-gradient(circle,rgba(180,60,70,0.15),transparent_70%)] animate-blob-a [animation-delay:0s]" />
      <div className="absolute top-[5%]  left-[62%] w-56 h-56 bg-[radial-gradient(circle,rgba(180,60,70,0.15),transparent_70%)] animate-blob-b [animation-delay:4s]" />
      <div className="absolute top-[40%] left-[2%]  w-44 h-44 bg-[radial-gradient(circle,rgba(160,50,60,0.14),transparent_70%)] animate-blob-c [animation-delay:8s]" />
      <div className="absolute top-[40%] left-[68%] w-44 h-44 bg-[radial-gradient(circle,rgba(160,50,60,0.14),transparent_70%)] animate-blob-a [animation-delay:6s]" />
      <div className="absolute top-[65%] left-[15%] w-36 h-36 bg-[radial-gradient(circle,rgba(170,55,65,0.13),transparent_70%)] animate-blob-b [animation-delay:2s]" />
      <div className="absolute top-[65%] left-[62%] w-36 h-36 bg-[radial-gradient(circle,rgba(170,55,65,0.13),transparent_70%)] animate-blob-c [animation-delay:10s]" />
      <div className="absolute top-[20%] left-[32%] w-28 h-28 bg-[radial-gradient(circle,rgba(190,80,80,0.12),transparent_70%)] animate-blob-a [animation-delay:14s]" />
      <div className="absolute top-[20%] left-[52%] w-28 h-28 bg-[radial-gradient(circle,rgba(190,80,80,0.12),transparent_70%)] animate-blob-b [animation-delay:12s]" />
      <div className="absolute top-[75%] left-[40%] w-40 h-40 bg-[radial-gradient(circle,rgba(155,45,55,0.13),transparent_70%)] animate-blob-c [animation-delay:3s]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,rgba(20,6,8,0.85)_100%)]" />
    </div>
  );
}
