export default function BrainBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#2e1018] overflow-hidden">
      {/* Warm pink gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_85%_at_40%_50%,#5c1f2e,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_78%_28%,#4a1525,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_12%_72%,#3d1220,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_58%_82%,#521828,transparent_50%)]" />

      {/* Slow breathing glow — slightly pinker than the brain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(210,80,110,0.13),transparent_70%)] animate-heartbeat" />

      {/* Morphing tissue blobs */}
      <div className="absolute top-[5%]  left-[8%]  w-52 h-52 bg-[radial-gradient(circle,rgba(200,90,120,0.15),transparent_70%)] animate-blob-a [animation-delay:0s]" />
      <div className="absolute top-[50%] left-[72%] w-36 h-36 bg-[radial-gradient(circle,rgba(210,100,130,0.16),transparent_70%)] animate-blob-b [animation-delay:4s]" />
      <div className="absolute top-[65%] left-[20%] w-44 h-44 bg-[radial-gradient(circle,rgba(185,75,105,0.14),transparent_70%)] animate-blob-c [animation-delay:8s]" />
      <div className="absolute top-[15%] left-[60%] w-28 h-28 bg-[radial-gradient(circle,rgba(205,95,125,0.15),transparent_70%)] animate-blob-a [animation-delay:12s]" />
      <div className="absolute top-[35%] left-[38%] w-20 h-20 bg-[radial-gradient(circle,rgba(220,110,135,0.13),transparent_70%)] animate-blob-b [animation-delay:2s]" />
      <div className="absolute top-[30%] left-[85%] w-40 h-40 bg-[radial-gradient(circle,rgba(195,85,115,0.13),transparent_70%)] animate-blob-c [animation-delay:6s]" />
      <div className="absolute top-[78%] left-[55%] w-32 h-32 bg-[radial-gradient(circle,rgba(210,95,120,0.14),transparent_70%)] animate-blob-a [animation-delay:15s]" />
      <div className="absolute top-[20%] left-[35%] w-24 h-24 bg-[radial-gradient(circle,rgba(220,105,130,0.12),transparent_70%)] animate-blob-b [animation-delay:10s]" />
      <div className="absolute top-[55%] left-[48%] w-36 h-36 bg-[radial-gradient(circle,rgba(180,70,100,0.13),transparent_70%)] animate-blob-c [animation-delay:18s]" />
    </div>
  );
}
