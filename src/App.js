import Comments from "./comments/Comments";
import "./App.css";

function App() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        backgroundColor: "grey",
        width: "100%",
        height: "100vh",
      }}
    >
      <Comments currentUserId="1" />
    </div>
  );
}

export default App;
