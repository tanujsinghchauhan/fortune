import { useState } from "react";
import Monocole from "../assets/monocle.png";
import CrossIcon from "../assets/cross.png";
import GiftIcon from "../assets/gift.png";

function Homepage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({
    mcq: "",
    color: "",
    date: "",
    text: "",
  });
  const [okayClickCount, setOkayClickCount] = useState(0);

  // List of surprise messages
  const surpriseMessages = [
    "You are destined for greatness. Keep going!",
    "The stars align for you, and amazing things are on the way!",
    "Your future is bright and full of opportunities.",
    "What you seek is coming your way. Stay positive!",
    "You're on the right path—trust the journey.",
    "The universe is working in your favor. Stay hopeful!",
  ];

  // Randomly select a surprise message
  const randomSurpriseMessage =
    surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];

  const questions = [
    {
      question: "Do you prefer warm or cool weather?",
      type: "mcq",
      options: ["Warm", "Cool"],
      component: (
        <div className="mt-4 space-y-4">
          {["Warm", "Cool"].map((option, index) => (
            <button
              key={index}
              className={`flex items-center w-full py-4 px-6 border border-gray-300 rounded-md ${
                answers.mcq === option ? "bg-gray-300" : "bg-white"
              } text-gray-700 font-medium hover:bg-gray-100`}
              onClick={() => handleAnswer("mcq", option)}
            >
              <div className="w-10 h-10 flex justify-center items-center bg-[#F3F3F3] rounded-full text-[#191D63] font-bold mr-4">
                {String.fromCharCode(65 + index)}
              </div>
              {option}
            </button>
          ))}
        </div>
      ),
    },
    {
      question: "What’s your favorite color?",
      type: "color",
      component: (
        <input
          type="color"
          className="mt-4 p-2 border rounded-md w-full"
          onChange={(e) => handleAnswer("color", e.target.value)}
          value={answers.color}
        />
      ),
    },
    {
      question: "When’s your birthday?",
      type: "date",
      component: (
        <input
          type="date"
          className="mt-4 p-2 border rounded-md w-full"
          onChange={(e) => handleAnswer("date", e.target.value)}
          value={answers.date}
        />
      ),
    },
    {
      question: "What’s your zodiac sign, if you know it?",
      type: "text",
      component: (
        <input
          type="text"
          placeholder="Enter your zodiac sign"
          className="mt-4 p-2 border rounded-md w-full"
          onChange={(e) => handleAnswer("text", e.target.value)}
          value={answers.text}
        />
      ),
    },
  ];

  const handleAnswer = (type, value) => {
    setAnswers({ ...answers, [type]: value });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setAnswers({
      mcq: "",
      color: "",
      date: "",
      text: "",
    });
    setOkayClickCount(0);
  };

  const handleOkayClick = () => {
    if (okayClickCount < 2) {
      setOkayClickCount(okayClickCount + 1);
    } else {
      handleReset();
    }
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  const isAnswerFilled = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return answers[currentQuestion.type];
  };

  return (
    <div className="h-screen w-screen bg-[#EDE8E3] flex flex-col justify-between">
      {!showQuiz ? (
        <div className="flex-grow">
          <div className="flex flex-row justify-evenly items-center pt-[10%]">
            <img src={Monocole} alt="Monocle" className="responsive-img" />
            <div>
              <p className="text-[60px] font-bold font-sans responsive-text">
                The <br /> Watching Glass
              </p>
              <p className="text-[36px] font-semibold responsive-text">
                Your Path, Clearly Seen
              </p>
            </div>
          </div>
          <button
            className="bg-[#31CD63] text-white text-sm h-[60px] w-[335px] rounded-md ml-[40%] responsive-btn"
            onClick={() => setShowQuiz(true)}
          >
            READ MY FUTURE!
          </button>
        </div>
      ) : (
        <>
          {showResult ? (
            <div className="flex-grow relative">
              <img
                src={CrossIcon}
                alt="Close"
                className="absolute top-4 right-4 cursor-pointer"
                onClick={handleReset}
              />
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src={GiftIcon}
                  alt="Gift"
                  className="absolute left-[10%] top-1/2 transform -translate-y-1/2"
                />
                <p className="absolute mt-36 ml-10 left-[10%] top-1/2 transform -translate-y-1/2 text-[33px] font-bold text-[#191D63]">
                  RESULTS
                </p>
                <div className="flex flex-col justify-center items-center h-48 w-[819px]">
                  <p className="text-[33px] font-bold text-[#191D63] text-center">
                    {randomSurpriseMessage}
                  </p>
                </div>
              </div>
              <footer className="w-full bg-white p-4 flex justify-center items-center absolute bottom-0">
                <button
                  onClick={handleOkayClick}
                  className="bg-[#31CD63] text-white py-2 px-4 rounded"
                >
                  OKAY
                </button>
              </footer>
            </div>
          ) : (
            <div className="flex-grow relative">
              <img
                src={CrossIcon}
                alt="Close"
                className="absolute top-4 right-4 cursor-pointer"
                onClick={handleReset}
              />
              <div className="flex flex-col items-center">
                <h1 className="text-lg font-bold mt-4">Fortune Quiz</h1>
                <div className="w-1/2 p-6 rounded-lg mt-8">
                  <h2 className="text-xl font-bold mb-4 text-[#191D63] text-center">
                    {questions[currentQuestionIndex].question}
                  </h2>
                  {questions[currentQuestionIndex].component}
                </div>
              </div>
              <footer className="w-full bg-white p-4 flex justify-center items-center absolute bottom-0">
                <div className="w-1/4 bg-gray-300 h-2 rounded-full overflow-hidden mr-4">
                  <div
                    className="bg-[#31CD63] h-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm">{`${currentQuestionIndex + 1}/${
                  questions.length
                }`}</span>
                <button
                  onClick={handleNextQuestion}
                  className={`ml-4 py-2 px-4 rounded ${
                    isAnswerFilled()
                      ? "bg-[#31CD63] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  disabled={!isAnswerFilled()}
                >
                  CONTINUE
                </button>
              </footer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Homepage;
