// src/App.js

import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Import Tailwind CSS styles

const words = [
  'const myFunction = () => {\n  console.log("Hello, World!");\n};',
  "const addNumbers = (a, b) => {\n  return a + b;\n};",
  'const fetchData = async () => {\n  const response = await fetch("https://api.example.com/data");\n  const data = await response.json();\n  console.log(data);\n};',
  "const calculateArea = (radius) => {\n  return Math.PI * Math.pow(radius, 2);\n};",
  'const conditionalCheck = (value) => {\n  if (value > 0) {\n    console.log("Positive");\n  } else {\n    console.log("Non-positive");\n  }\n};',
  "const arrayOperations = () => {\n  const numbers = [1, 2, 3, 4, 5];\n  const doubledNumbers = numbers.map(num => num * 2);\n  console.log(doubledNumbers);\n};",
];

const getRandomIndex = () => Math.floor(Math.random() * words.length);

const TypingSpeedTest = () => {
  const btnRef = useRef();
  const txtARef = useRef();
  const [wordIndex, setWordIndex] = useState(getRandomIndex());
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [lengthWords, setLengthWords] = useState(getRandomIndex());

  const handleInputChange = (e) => {
    const typedValue = e.target.value;
    setInputValue(typedValue);

    handleResultClick();

    if (lengthWords === inputValue.length + 1) {
      setEndTime(new Date());
      btnRef.current.focus();
    }
  };

  const handleResultClick = () => {
    if (endTime) {
      const totalTime = (endTime - startTime) / 1000;
      const speed = Math.round((words.join("").length / totalTime) * 60);
      setTypingSpeed(speed);

      const currentWord = words[wordIndex];
      const sanitizedTypedValue = inputValue.replace(/\n/g, "");
      const sanitizedCurrentWord = currentWord.replace(/\n/g, "");

      const newMistakes = sanitizedCurrentWord
        .split("")
        .reduce((acc, char, index) => {
          return acc + (sanitizedTypedValue[index] === char ? 0 : 1);
        }, 0);

      setMistakes(newMistakes);
    }
  };

  useEffect(() => {
    txtARef.current.focus();
    setStartTime(new Date());
    setLengthWords(words[wordIndex].length);
  }, [wordIndex]);

  useEffect(() => {
    if (endTime) {
      handleResultClick();
    }
  }, [endTime, startTime, inputValue, wordIndex]);

  const currentWord = words[wordIndex];

  return (
    <div className="container mx-auto mt-8 bg-gray-100 p-8 rounded-md shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Typing Speed Test
        </h1>
        <p className="text-lg mb-8 text-gray-600">Type the highlighted word:</p>
        <div className="text-2xl font-bold w-full mb-4  border ">
          {currentWord.split("").map((char, index) => (
            <span
              key={index}
              className={
                index < inputValue.length
                  ? inputValue[index] === char
                    ? "text-green-500"
                    : "text-red-500"
                  : ""
              }
            >
              {char === "\n" ? <br /> : char}
            </span>
          ))}
        </div>
        <textarea
          ref={txtARef}
          value={inputValue}
          onChange={handleInputChange}
          className={
            typingSpeed
              ? "invisible"
              : "border p-2 text-xl resize-none bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          }
        />
        <div className="mt-4">
          <button
            ref={btnRef}
            onClick={() => window.location.reload()}
            className="result-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Restart Test
          </button>
        </div>
        {typingSpeed && (
          <div className="mt-8 text-lg text-gray-700">
            <p>Your typing speed: {typingSpeed} words per minute</p>
            <p>Mistakes: {mistakes}</p>
            <p>Time: {Math.round((endTime - startTime) / 1000)} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedTest;
