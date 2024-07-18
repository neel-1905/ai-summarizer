import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full py-4 mb-4">
        <img src={logo} alt="Summarizer Logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/neel-1905/ai-summarizer")
          }
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Instantly summarize articles with
        <span className="orange_gradient capitalize"> powerful AI</span>.
      </h1>

      <h2 className="desc">
        Effortlessly condense lengthy articles into concise summaries using our
        advanced AI technology. Save time and get the gist in seconds
      </h2>
    </header>
  );
};

export default Hero;
