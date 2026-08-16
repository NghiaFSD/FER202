import { useEffect, useState } from "react";

function Section({ number, title, description, children, wide = false }) {
  return (
    <section className={wide ? "effect-card wide" : "effect-card"}>
      <div className="card-title-row">
        <span>{number}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="card-content">{children}</div>
    </section>
  );
}

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?userId=" + userId,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Could not fetch the posts.");
        }

        const data = await response.json();
        setPosts(data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message);
          setPosts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => controller.abort();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="status-box loading" role="status">
        <span className="spinner" /> Loading posts for user {userId}...
      </div>
    );
  }

  if (error) {
    return <div className="status-box error">{error}</div>;
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <article className="post" key={post.id}>
          <div className="post-number">{String(post.id).padStart(2, "0")}</div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

function PostsExercise() {
  const [userId, setUserId] = useState(1);

  return (
    <div>
      <div className="control-row">
        <label htmlFor="user-select">User ID</label>
        <select
          id="user-select"
          value={userId}
          onChange={(event) => setUserId(Number(event.target.value))}
        >
          {Array.from({ length: 10 }, (_, index) => index + 1).map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>
        <span className="request-note">Refetches whenever userId changes</span>
      </div>
      <UserPosts userId={userId} />
    </div>
  );
}

function CountdownTimer({ initialValue }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    setTimeRemaining(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (timeRemaining <= 0) return undefined;

    const timerId = window.setInterval(() => {
      setTimeRemaining((previousTime) => Math.max(0, previousTime - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [timeRemaining]);

  const progress = initialValue > 0 ? (timeRemaining / initialValue) * 100 : 0;

  return (
    <div className="timer-panel">
      <div className={timeRemaining === 0 ? "timer-value ended" : "timer-value"}>
        {timeRemaining}
      </div>
      <p aria-live="polite">
        {timeRemaining > 0
          ? "Time Remaining: " + timeRemaining
          : "Time is up!"}
      </p>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: progress + "%" }} />
      </div>
      <button
        className="outline-button"
        onClick={() => setTimeRemaining(initialValue)}
      >
        Restart timer
      </button>
    </div>
  );
}

function TimerExercise() {
  const [draftValue, setDraftValue] = useState(10);
  const [initialValue, setInitialValue] = useState(10);
  const [isMounted, setIsMounted] = useState(true);

  const applyValue = (event) => {
    event.preventDefault();
    const safeValue = Math.min(60, Math.max(1, Number(draftValue) || 1));
    setDraftValue(safeValue);
    setInitialValue(safeValue);
    setIsMounted(true);
  };

  return (
    <div>
      <form className="timer-controls" onSubmit={applyValue}>
        <label htmlFor="seconds">Initial seconds</label>
        <input
          id="seconds"
          type="number"
          min="1"
          max="60"
          value={draftValue}
          onChange={(event) => setDraftValue(event.target.value)}
        />
        <button className="primary-button" type="submit">
          Apply
        </button>
        <button
          className="ghost-button"
          type="button"
          onClick={() => setIsMounted((current) => !current)}
        >
          {isMounted ? "Unmount" : "Mount"}
        </button>
      </form>
      {isMounted ? (
        <CountdownTimer initialValue={initialValue} />
      ) : (
        <div className="unmounted-box">
          Timer unmounted — its interval has been cleaned up.
        </div>
      )}
    </div>
  );
}

function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="window-panel">
      <div className="screen-icon" aria-hidden="true">
        <span />
      </div>
      <p>Current window size</p>
      <strong>
        {windowSize.width} <span>×</span> {windowSize.height}
      </strong>
      <small>Resize the browser to see this value update.</small>
    </div>
  );
}

function ValidatedInput({ validationFunction, errorMessage }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  const showError = hasInteracted && !isValid;

  return (
    <div className="validation-form">
      <label htmlFor="validated-name">Full name</label>
      <div className="validation-field">
        <input
          id="validated-name"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setHasInteracted(true);
          }}
          onBlur={() => setHasInteracted(true)}
          className={showError ? "invalid" : ""}
          placeholder="Example: Le Trong Nghia"
          aria-describedby="validation-help"
          aria-invalid={showError}
        />
        {value && isValid && <span className="valid-mark">✓</span>}
      </div>
      <p
        id="validation-help"
        className={showError ? "validation-message error-text" : "validation-message"}
      >
        {showError
          ? errorMessage
          : "Use at least 3 letters. Numbers and special characters are not allowed."}
      </p>
      <div className="validation-preview">
        <span>Input value</span>
        <strong>{value || "Empty"}</strong>
        <span>Status</span>
        <strong className={value && isValid ? "valid-text" : "neutral-text"}>
          {value && isValid ? "Valid" : "Waiting for valid input"}
        </strong>
      </div>
    </div>
  );
}

const validateName = (value) =>
  value.trim().length >= 3 && /^[A-Za-zÀ-ỹ\s]+$/.test(value);

export default function App() {
  return (
    <main>
      <header className="hero">
        <div className="hero-label">FER202 · SIDE EFFECTS</div>
        <h1>Exercise 13: useEffect</h1>
        <p>
          Fetch data, manage timers, subscribe to browser events and validate
          changing input with proper cleanup.
        </p>
        <div className="effect-tags">
          <span>Fetch API</span>
          <span>Cleanup</span>
          <span>Dependencies</span>
        </div>
      </header>

      <div className="effect-grid">
        <Section
          number="01"
          title="Data Fetching"
          description="Load JSONPlaceholder posts again when the user ID changes."
          wide
        >
          <PostsExercise />
        </Section>
        <Section
          number="02"
          title="Countdown Timer"
          description="Update every second and clear the interval on cleanup."
        >
          <TimerExercise />
        </Section>
        <Section
          number="03"
          title="Window Resize Listener"
          description="Subscribe on mount and remove the listener on unmount."
        >
          <WindowSize />
        </Section>
        <Section
          number="04"
          title="Form Input Validation"
          description="Run the provided validation function whenever input changes."
          wide
        >
          <ValidatedInput
            validationFunction={validateName}
            errorMessage="Enter at least 3 letters without numbers or special characters."
          />
        </Section>
      </div>
    </main>
  );
}

