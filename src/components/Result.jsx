import React from "react";
import { Link } from "react-router-dom";

function Result() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="col-12 text-center fs-1">Result</div>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-sm-6 m-auto shadow bg-opacity-25 rounded-4 py-2">
            <table className="table text-center fs-1 m-auto">
              <tbody>
                <tr className="fs-1">
                  <td>WPM</td>
                  <td>{localStorage.getItem("wpm").slice(0, 5)}</td>
                </tr>
                <tr className="fs-2">
                  <td>Accuracy</td>
                  <td>{localStorage.getItem("acc").slice(0, 5)}%</td>
                </tr>
                <tr className="fs-3">
                  <td>CPM</td>
                  <td>{localStorage.getItem("cpm").slice(0, 5)}</td>
                </tr>
                <tr className="fs-4">
                  <td>Time</td>
                  <td>
                    {Math.floor(localStorage.getItem("seconds").slice(0, 5))}{" "}
                    seconds
                  </td>
                </tr>
                <tr className="fs-4">
                  <td>Incorrect Words</td>
                  <td>{localStorage.getItem("incorrectcount").slice(0, 5)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <Link
              className="btn btn-primary mt-3"
              aria-current="page"
              to="/"
            >
              ReType
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
