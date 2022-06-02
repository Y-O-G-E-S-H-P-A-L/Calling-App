import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

const Video = (props) => {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={gridSpacing}>
        <AgoraVideoPlayer audioTrack={tracks[0]} style={{ height: "100%", width: "100%" }} />
      </Grid>
      {users.length > 0 &&
        users.map((user, i) => {
          if (user.audioTrack) {
            return (
              <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer audioTrack={user.audioTrack} key={i} style={{ height: "100%", width: "100%", border: "1px solid black" }} />
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
};

export default Video;
