import { IconContext } from "react-icons";

export const HomeCard = ({ children, className }) => {
  return (
    <article
      className={`
      p-[20px]
      border rounded-[25px] border-slate-50/25 drop-shadow-xl
      bg-zinc-700/10 backdrop-blur-sm
      overflow-hidden
      ${className}
`}
    >
      {children}
    </article>
  );
};

HomeCard.Title = ({ children, className }) => {
  return (
    <h2
      className={`
      mb-[20px]
      font-black text-[30px] text-transparent bg-clip-text
      ${className}
      `}
    >
      {children}
    </h2>
  );
};

HomeCard.Text = ({ children, className }) => {
  return (
    <p className={`text-zinc-50/60 text-[14px] ${className}`}>
      {children}
    </p>
  );
};

HomeCard.Tooltip = ({ text, icon }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <IconContext.Provider value={{ size: "14px" }}>
        {icon}
      </IconContext.Provider>
      <span className="
        font-bold text-[20px] text-white
        ">
        {text}
      </span>
    </div>
  );
};
