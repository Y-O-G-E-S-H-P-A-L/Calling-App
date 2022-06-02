import { useState, useEffect } from "react";
import { audioCallConfig, useAudioCallClient, useMicrophoneAndCameraTracks, audioCallChannelName } from "./Settings";
import { Grid } from "@material-ui/core";
import Controls from "./Controls";
import Audio from "./Audio";

const AudioCall = (props) => {
  const { setInAudioCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useAudioCallClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(audioCallConfig.appId, name, audioCallConfig.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(audioCallChannelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [client, ready, tracks]);
  // }, [audioCallChannelName, client, ready, tracks]);

  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid item style={{ height: "5%" }}>
        {ready && tracks && <Controls tracks={tracks} setStart={setStart} setInAudioCall={setInAudioCall} videoOrAudio={"audio"} />}
      </Grid>
      <Grid item style={{ height: "95%" }}>
        {start && tracks && <Audio tracks={tracks} users={users} />}
      </Grid>
    </Grid>
  );
};

export default AudioCall;
