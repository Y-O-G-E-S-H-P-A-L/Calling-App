import React, { useState } from "react";
import { useVideoCallClient, useAudioCallClient } from "./Settings";
import { Grid, Button } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Controls = (props) => {
  const videoCallClient = useVideoCallClient();
  const audioCallClient = useAudioCallClient();
  const { tracks, setStart, setInVideoCall, setInAudioCall, videoOrAudio } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveVideoCallChannel = async () => {
    await videoCallClient.leave();
    videoCallClient.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInVideoCall(false);
  };
  const leaveAudioCallChannel = async () => {
    await audioCallClient.leave();
    audioCallClient.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInAudioCall(false);
  };
  //                                                  Video Section
  // =====================================================
  if (videoOrAudio === "video") {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color={trackState.audio ? "primary" : "secondary"}
            onClick={() => {
              mute("audio");
            }}
          >
            {trackState.audio ? <MicIcon /> : <MicOffIcon />}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color={trackState.video ? "primary" : "secondary"}
            onClick={() => {
              mute("video");
            }}
          >
            {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="default" onClick={() => leaveVideoCallChannel()}>
            Leave <ExitToAppIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }

  //                                                  Audio Section
  // =====================================================
  if (videoOrAudio === "audio") {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color={trackState.audio ? "primary" : "secondary"}
            onClick={() => {
              mute("audio");
            }}
          >
            {trackState.audio ? <MicIcon /> : <MicOffIcon />}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="default" onClick={() => leaveAudioCallChannel()}>
            Leave <ExitToAppIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Controls;
