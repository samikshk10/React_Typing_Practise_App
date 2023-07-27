import "../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Words from "./Words";

import data from "../data.json";

function Type() {
  const [startTime, setStartTime] = useState(0);
  const [acc, setacc] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [started, setStarted] = useState(false);
  const [typedWord, setTypedWord] = useState("");
  const [current, setCurrent] = useState(0);
  const [fullWordsCollectionArray, setFullWordsCollectionArray] = useState(
    data.words
  );

  let totalWords = 12; //default number of words
  const [words, setWords] = useState([
    {
      word: "The",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "quick",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "brown",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "fox",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "jumps",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "over",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "lazy",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "dog",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("userInput").focus();
  }, []);

  const resetData = () => {
    // reset when sentence is laoded
    setacc(100);
    setCorrectCount(0);
    setStarted(false);
    setTypedWord("");
    setCurrent(0);
    setCorrectCharacters(0);
  };

  const loadWords = () => {
    // load new sentence
    let element = document.getElementById("sentence");
    element.classList.toggle("sentence-on-change");

    let wordsCollectionArray = [];

    // This loop will create array of random words
    for (let i = 0; i < totalWords; i++) {
      let index =
        Math.floor(Math.random() * 100) % fullWordsCollectionArray.length;
      wordsCollectionArray.push(fullWordsCollectionArray[index]);
    }

    // creating create word object
    resetData();
    let wordsCopy = [];
    for (let i = 0; i < wordsCollectionArray.length; i++) {
      wordsCopy.push({
        word: wordsCollectionArray[i],
        status: "untracked",
        speed: -1,
        accuracy: 0,
      });
    }
    setWords(wordsCopy);
    document.getElementById("userInput").focus();
  };

  //save result data in the localstorage

  const saveResults = () => {
    localStorage.setItem(
      "wpm",
      (correctCount + 1) / ((Date.now() - startTime) / (1000 * 60))
    );
    localStorage.setItem("acc", acc);
    localStorage.setItem(
      "cpm",
      correctCharacters / ((Date.now() - startTime) / (1000 * 60))
    );
    localStorage.setItem("seconds", (Date.now() - startTime) / 1000);
    navigate("/result");
  };

  const handleOnChange = (event) => {
    //user is typing
    if (started === false) {
      // started to type or not
      setStartTime(Date.now());
      console.log(startTime);
      setStarted(true); // started
    }
    setTypedWord(event.target.value);

    if (current >= words.length - 1) {
      // user types the last word

      if (event.target.value === words[current]["word"]) {
        console.log("this is the last word");
        console.log(
          (correctCount + 1) / ((Date.now() - startTime) / (1000 * 60))
        );
        saveResults();
      }
      if (event.target.value.charAt(event.target.value.length - 1) === " ") {
        console.log("incorrect last word");
        console.log("Accurate wpm");
        console.log(correctCount / ((Date.now() - startTime) / (1000 * 60)));
        saveResults();
      }
      setFullWordsCollectionArray([]);
    }

    if (
      event.target.value ===
      words[current].word.substring(0, event.target.value.length)
    ) {
      words[current].status = "tracking";
      setCorrectCharacters((correctCharacters) => correctCharacters + 1);
    } else {
      words[current].status = "partially-incorrect";
    }

    if (event.target.value.charAt(event.target.value.length - 1) === " ") {
      if (event.target.value === words[current].word + " ") {
        words[current].status = "correct";
        setCorrectCount(correctCount + 1);
      } else {
        words[current].status = "incorrect";
      }
      setTypedWord("");
      setCurrent((current) => {
        return current + 1;
      });
    }
    setacc(((correctCount / current) * 100).toFixed(2));
  };

  return (
    <>
      <div className="container pt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center"></div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center"></div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center"></div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center"></div>
        </div>
        <div className="row" style={{ minHeight: "250px" }}>
          <div id="sentence" className="col py-3 text-center fs-3 sentence">
            {words.map((word, index) => {
              return <Words key={index} word={word} typedWord={typedWord} />;
            })}
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <input
              id="userInput"
              className="border border-2 rounded-pill fs-4 text-center"
              type="text"
              value={typedWord}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row">
          <div className="col text-center py-3">
            <button onClick={loadWords} className="btn btn-outline-success">
              Load Sentence
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Type;
