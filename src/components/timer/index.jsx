import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./timer.css";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Counter({
  initialCount,
  setStartCoutdown,
  setStartMeditation,
  playStartBell,
  delay,
}) {
  const [count, setCount] = useState(initialCount);

  useInterval(() => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setStartCoutdown(false);
      setStartMeditation(true);
      playStartBell();
    }
  }, delay);

  return count;
}
function RingBell({ delay }) {
  const intervalBellRef = useRef(null);
  if (!delay) {
    if (intervalBellRef) {
      intervalBellRef?.current?.pause();
      intervalBellRef.current.load();
    }
  }
  useInterval(() => {
    intervalBellRef.current.load();
    intervalBellRef.current.play();
  }, delay);

  return <audio ref={intervalBellRef} src="/audio/tingsha2.mp3" />;
}

function DurationCount({
  initialCount,
  meditationFinished,
  setMeditationFinished,
  playStartBell,
  delay,
}) {
  const [minutes, setMinutes] = useState(initialCount);
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    if (minutes > 0 || seconds > 0) {
      if (minutes === 0) {
        setSeconds(seconds - 1);
      } else {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    } else {
      if (!meditationFinished) {
        setMeditationFinished(true);
        playStartBell();
      }
    }
  }, delay);

  return (
    <span>
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </span>
  );
}

const TimerMain = () => {
  const startBellRef = useRef(null);
  const intervalBellRef = useRef(null);
  const [begin, setBegin] = useState(false);
  const [pause, setPause] = useState(false);
  const [startCoutdown, setStartCoutdown] = useState(false);
  const [startMeditation, setStartMeditation] = useState(false);
  const [meditationFinished, setMeditationFinished] = useState(false);
  const [countdownValue, setCountdownValue] = useState(10);
  const [countdownOn, setCountdownOn] = useState(false);
  const [intervalOn, setIntervalOn] = useState(false);
  const [activeTab, setActiveTab] = useState(2);
  const [duration, setDuration] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  const { t } = useTranslation();
  const counDown = t("dashboard.reports.count", { returnObjects: true });

  const increaseMinutes = () => {
    if (minutes >= duration) {
      alert("Interval can not be greater than duration");
    } else {
      setMinutes((prev) => prev + 1);
    }
  };

  const decreaseMinutes = () => {
    if (minutes > 0) {
      setMinutes((prev) => prev - 1);
    }
  };

  const increaseSeconds = () => {
    if (minutes === duration) {
      alert("Interval can not be greater than duration");
    } else {
      if (seconds < 55) {
        setSeconds((prev) => prev + 5);
      } else {
        increaseMinutes();
        setSeconds(0);
      }
    }
  };

  const decreaseSeconds = () => {
    if (minutes === 0) {
      if (seconds > 5) {
        setSeconds((prev) => prev - 5);
      }
    } else {
      if (seconds > 0) {
        setSeconds((prev) => prev - 5);
      } else {
        decreaseMinutes();
        setSeconds(55);
      }
    }
  };

  const playStartBell = () => {
    startBellRef.current.play();
  };
  const pauseStartBell = () => {
    startBellRef.current.pause();
    startBellRef.current.load();
  };

  const handleCountDownSliderChange = (e) => {
    setCountdownValue(parseInt(e.target.value));
  };

  const handleBegin = () => {
    setBegin(true);
    setActiveTab(1);
    if (countdownOn) {
      setStartCoutdown(true);
    } else {
      setStartMeditation(true);
      playStartBell();
    }
  };

  const bellInterval = () => {
    if (pause) {
      return null;
    } else {
      return 1000 * (minutes * 60 + seconds);
    }
  };

  return (
    <div className="bg-white timer-main shadow rounded-xl">
      <div
        className="timer-container"
        style={{ background: "rgba(0, 0, 0, 0)" }}
      >
        <div
          className="timer-tabs-container"
          style={
            startMeditation || startCoutdown
              ? { borderBottom: "1px solid transparent" }
              : null
          }
        >
          <ul>
            <li>
              <button
                data-tab="countdown"
                className={activeTab === 1 ? "--active" : ""}
                onClick={() => setActiveTab(1)}
                style={
                  startCoutdown || startMeditation
                    ? { opacity: 0 }
                    : {
                        color: `${
                          activeTab === 1 ? "rgb(100, 70, 255)" : "#ccc"
                        }`,
                      }
                }
              >
                <span>{counDown.cd.title}</span>
                {countdownOn ? (
                  <img src="https://meditationtimer.online/images/countdown-on.svg" />
                ) : (
                  <img src="https://meditationtimer.online/images/countdown-off.svg" />
                )}
              </button>
            </li>
            <li>
              <button
                data-tab="duration"
                style={
                  startCoutdown || startMeditation
                    ? { opacity: 0 }
                    : {
                        color: `${
                          activeTab === 2 ? "rgb(100, 70, 255)" : "#ccc"
                        }`,
                      }
                }
                className={activeTab === 2 ? "--active" : null}
                onClick={() => setActiveTab(2)}
              >
                <span>{counDown.duration.title}</span>
                <img src="https://meditationtimer.online/images/duration-icon.svg" />
              </button>
            </li>
            <li>
              <button
                data-tab="interval"
                style={
                  startCoutdown || startMeditation
                    ? { opacity: 0 }
                    : {
                        color: `${
                          activeTab === 3 ? "rgb(100, 70, 255)" : "#ccc"
                        }`,
                      }
                }
                className={activeTab === 3 ? "--active" : "tab-color"}
                onClick={() => setActiveTab(3)}
              >
                <span>{counDown.interval.title}</span>
                {intervalOn ? (
                  <img src="https://meditationtimer.online/images/interval-on.svg" />
                ) : (
                  <img src="https://meditationtimer.online/images/interval-off.svg" />
                )}
              </button>
            </li>
          </ul>
        </div>
        <div role="timer" className="content-container">
          {activeTab === 1 && (
            <div className="list-item-content" data-tab-link="countdown">
              <div className="top">
                <div
                  role="alert"
                  aria-live="polite"
                  className="switch-container"
                  style={
                    startCoutdown || startMeditation
                      ? { display: "none" }
                      : null
                  }
                >
                  <label
                    className="countdown-switch-label"
                    htmlFor="countdownSwitch"
                    style={{ color: "gray" }}
                  >
                    {counDown.cd.btn.split(" ")[0]}{" "}
                    {countdownOn
                      ? counDown.cd.btn.split(" ")[1]
                      : counDown.cd.btn.split(" ")[2]}
                  </label>
                  <label tabIndex={-1} className="switch">
                    <input
                      aria-label="countdown disabled"
                      id="countdownSwitch"
                      type="checkbox"
                      checked={countdownOn}
                      onChange={(e) => setCountdownOn(e.target.checked)}
                    />
                    <span className="slider round" />
                  </label>
                </div>
              </div>
              <div className="center">
                <div
                  className="hideable-content"
                  style={
                    countdownOn || startMeditation
                      ? null
                      : {
                          visibility: "hidden",
                        }
                  }
                >
                  {!startMeditation && (
                    <p>
                      {startCoutdown
                        ? counDown.cd.afstart
                        : counDown.cd.bma + ":"}
                    </p>
                  )}
                  <div aria-label tabIndex={0} id="countdownReadout">
                    {startCoutdown ? (
                      <Counter
                        initialCount={countdownValue}
                        setStartCoutdown={setStartCoutdown}
                        playStartBell={playStartBell}
                        setStartMeditation={setStartMeditation}
                        delay={pause ? null : 1000}
                      />
                    ) : startMeditation ? (
                      <>
                        <DurationCount
                          initialCount={duration}
                          meditationFinished={meditationFinished}
                          setMeditationFinished={setMeditationFinished}
                          playStartBell={playStartBell}
                          delay={pause ? null : 1000}
                        />
                        {intervalOn && <RingBell delay={bellInterval()} />}
                      </>
                    ) : (
                      countdownValue
                    )}
                  </div>
                  {!startMeditation ? (
                    <span id="unit-readout">{counDown.cd.sec}</span>
                  ) : (
                    meditationFinished && (
                      <span id="unit-readout">{counDown.cd.mf}</span>
                    )
                  )}
                </div>
                <div
                  className="hideable-content"
                  style={
                    !countdownOn || startCoutdown || startMeditation
                      ? {
                          visibility: "hidden",
                        }
                      : null
                  }
                >
                  <span
                    aria-label={counDown.cd.ms}
                    className="instruction-readout"
                  >
                    <img src="https://meditationtimer.online/images/arrow-left.svg" />
                    {counDown.cd.ms}{" "}
                    <img src="https://meditationtimer.online/images/arrow-right.svg" />
                  </span>
                  <div className="range-slider">
                    <input
                      className="range-slider__range countdown"
                      step={5}
                      type="range"
                      min={5}
                      max={60}
                      value={countdownValue}
                      onChange={handleCountDownSliderChange}
                      aria-label="countdown slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="list-item-content" data-tab-link="duration">
              <p className="!mt-5">{counDown.duration.mt}:</p>
              <div aria-label="37:00 Minutes" tabIndex={0} id="timeReadout">
                {duration < 10 && "0"}
                {duration}:00
              </div>
              <span id="unit-readout">{counDown.cd.sec}</span>
              <div className="hideable-content">
                <span
                  aria-label={counDown.cd.ms}
                  className="instruction-readout"
                >
                  <img src="https://meditationtimer.online/images/arrow-left.svg" />
                  {counDown.cd.ms}
                  <img src="https://meditationtimer.online/images/arrow-right.svg" />
                </span>
                <div className="range-slider">
                  <input
                    id="rangeSlider"
                    className="range-slider__range duration --pulse"
                    step={1}
                    type="range"
                    min={1}
                    max={90}
                    value={duration}
                    defaultValue={10}
                    onChange={(e) => setDuration(e.target.value)}
                    aria-label="duration slider"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className="list-item-content" data-tab-link="interval">
              <div className="top">
                <div
                  role="alert"
                  aria-live="polite"
                  className="switch-container"
                >
                  <label
                    className="interval-switch-label"
                    htmlFor="intervalSwitch"
                    style={{ color: "gray" }}
                  >
                    {counDown.interval.btn.split(" ")[0]}{" "}
                    {counDown.interval.btn.split(" ")[1]}{" "}
                    {intervalOn
                      ? counDown.interval.btn.split(" ")[2]
                      : counDown.interval.btn.split(" ")[3]}
                  </label>
                  <label tabIndex={-1} className="switch">
                    <input
                      aria-label="interval bell disabled"
                      id="intervalSwitch"
                      type="checkbox"
                      checked={intervalOn}
                      onChange={(e) => setIntervalOn(e.target.checked)}
                    />
                    <span className="slider round" />
                  </label>
                </div>
              </div>
              <div className="center">
                <div
                  className="hideable-content"
                  style={
                    !intervalOn
                      ? {
                          visibility: "hidden",
                        }
                      : null
                  }
                >
                  <p>Ring every:</p>
                  <div aria-label tabIndex={0} id="intervalReadout">
                    {minutes < 10 && "0"}
                    {minutes}:{seconds < 10 && "0"}
                    {seconds}
                  </div>
                  <span id="unit-readout">{counDown.cd.sec}</span>
                  <div className="row">
                    <div className="six-col">
                      <span id="unit-readout-minutes">
                        {counDown.interval.am}
                      </span>
                      <div className="buttons-container interval">
                        <button
                          tabIndex={0}
                          className="btn-left btn-img"
                          type="button"
                          aria-label="decrease interval minute"
                          data-unit="minute"
                          data-action="decrease"
                          onClick={() => decreaseMinutes()}
                        >
                          <img
                            src="https://meditationtimer.online/images/minus.svg"
                            alt="decrease interval"
                          />
                        </button>
                        <button
                          tabIndex={0}
                          className="btn-right btn-img"
                          type="button"
                          aria-label="increase interval minute"
                          data-unit="minute"
                          data-action="increase"
                          onClick={() => increaseMinutes()}
                        >
                          <img
                            src="https://meditationtimer.online/images/plus.svg"
                            alt="increase interval"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="six-col">
                      <span id="unit-readout-seconds">
                        {counDown.interval.as}
                      </span>
                      <div className="buttons-container interval">
                        <button
                          tabIndex={0}
                          className="btn-left btn-img"
                          type="button"
                          aria-label="decrease interval second"
                          data-unit="second"
                          data-action="decrease"
                          onClick={() => decreaseSeconds()}
                        >
                          <img
                            src="https://meditationtimer.online/images/minus.svg"
                            alt="decrease interval second"
                          />
                        </button>
                        <button
                          tabIndex={0}
                          className="btn-right btn-img"
                          type="button"
                          aria-label="increase interval second"
                          data-unit="second"
                          data-action="increase"
                          onClick={() => increaseSeconds()}
                        >
                          <img
                            src="https://meditationtimer.online/images/plus.svg"
                            alt="increase interval second"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* timer control  */}
        <div className="timer-control-container">
          <button
            aria-label="reset meditation"
            tabIndex={0}
            type="submit"
            id="resetButton"
            className="btn --outline"
            style={
              !pause && !meditationFinished
                ? {
                    visibility: "hidden",
                    opacity: 0,
                    transition: "all 0.2s ease",
                    display: "none",
                  }
                : { background: "#fff" }
            }
            onClick={() => {
              setBegin(false);
              setPause(false);
              setStartMeditation(false);
              setMeditationFinished(false);
              setStartCoutdown(false);
              setActiveTab(2);
              pauseStartBell();
            }}
          >
            <img
              src="https://meditationtimer.online/images/reset.svg"
              alt="reset"
            />
            {counDown.rbtn}
          </button>
          {begin && !pause && !meditationFinished ? (
            <button
              aria-label="begin meditation"
              tabIndex={0}
              type="submit"
              id="startButton"
              className="btn animating"
              onClick={() => {
                setPause(true);
                pauseStartBell();
              }}
            >
              <img src="/icons/pause.svg" alt="begin" />
              {counDown.pausebtn}
            </button>
          ) : pause && !meditationFinished ? (
            <button
              aria-label="begin meditation"
              tabIndex={0}
              type="submit"
              id="startButton"
              className="btn animating"
              onClick={() => setPause(false)}
            >
              <img src="/icons/arrow.svg" alt="begin" />
              {counDown.resumebtn}
            </button>
          ) : (
            !meditationFinished && (
              <button
                aria-label="begin meditation"
                tabIndex={0}
                type="submit"
                id="startButton"
                className="btn animating"
                onClick={() => handleBegin()}
              >
                <img src="/icons/arrow.svg" alt="begin" />
                {counDown.mainbtn}
              </button>
            )
          )}
        </div>
        <audio ref={startBellRef} src="/audio/start.mp3" />
        <audio ref={intervalBellRef} src="/audio/tingsha2.mp3" />
      </div>
    </div>
  );
};

export default TimerMain;
