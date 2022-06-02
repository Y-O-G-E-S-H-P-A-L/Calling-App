import React, { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./components/VideoCall";
import AudioCall from "./components/AudioCall";

const App = () => {
  const [inVideoCall, setInVideoCall] = useState(false);
  const [inAudioCall, setInAudioCall] = useState(false);

  return (
    <div className="App" style={{ height: "100%" }}>
      {inVideoCall ? (
        <VideoCall setInVideoCall={setInVideoCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setInVideoCall(true);
          }}
        >
          Join Video Call
        </Button>
      )}
      {inAudioCall ? (
        <AudioCall setInAudioCall={setInAudioCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setInAudioCall(true);
          }}
        >
          Join Audio Call
        </Button>
      )}
    </div>
  );
};

export default App;
