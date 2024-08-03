const skills = [
  {
    name: "Java",
    level: "😎",
    color: "#FED0C1",
  },
  {
    name: "Kotlin",
    level: "🤨",
    color: "#6785FE",
  },
  {
    name: "HTML+CSS",
    level: "💪",
    color: "#FFCC02",
  },
  {
    name: "Python",
    level: "🙁",
    color: "#FF593D",
  },
  {
    name: "Git & GitHub",
    level: "😎",
    color: "#F1FF57",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar img="images/Thierry.jpeg" />
      <div className="data">
        <Intro
          name="Thierry Marcelin"
          text="Backend dev and currently learning iOS dev and React.
        Primarily a Java dev, but willing to expand knowledge. I like to play video games and listen to music a lot."
        />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar({ img }) {
  return <img className="avatar" src={img} alt="dev avatar" />;
}

function Intro({ name, text }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{text}</p>
    </div>
  );
}

function SkillList() {
  return (
    <ul className="skill-list">
      {skills.map((s) => (
        <Skill skill={s} />
      ))}
    </ul>
  );
}

function Skill({ skill }) {
  return (
    <li className="skill" style={{ backgroundColor: skill.color }}>
      {skill.name} {skill.level}
    </li>
  );
}

export default App;
