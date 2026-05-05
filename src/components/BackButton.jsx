import { useNavigate } from "react-router";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="quarter-circle fixed top-0 left-0 z-50 w-36 h-36 flex items-start justify-start bg-secondary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 mt-4 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="var(--color-primary)"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 12H5M12 5l-7 7 7 7"
        />
      </svg>
    </button>
  );
}

export default BackButton;
