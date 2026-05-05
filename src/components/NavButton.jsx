import playIcon from "../assets/icons/play-button.svg";
import quizIcon from "../assets/icons/quiz-button.svg";

const icons = {
  play: playIcon,
  quiz: quizIcon,
};

function NavButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-secondary rounded-full cursor-pointer w-44"
    >
      <div className="w-14 h-14 shrink-0 overflow-hidden -ml-0.5 ">
        <img
          src={icons[icon]}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-primary font-display font-semibold px-4 pr-6">
        {label}
      </span>
    </button>
  );
}

export default NavButton;
