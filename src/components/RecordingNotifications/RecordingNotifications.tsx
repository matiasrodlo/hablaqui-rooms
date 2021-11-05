import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@material-ui/core';
import Snackbar from '../Snackbar/Snackbar';
import useIsRecording from '../../hooks/useIsRecording/useIsRecording';

enum Snackbars {
  none,
  recordingStarted,
  recordingInProgress,
  recordingFinished,
}

export default function RecordingNotifications() {
  const [activeSnackbar, setActiveSnackbar] = useState(Snackbars.none);
  const prevIsRecording = useRef<boolean | null>(null);
  const isRecording = useIsRecording();

  useEffect(() => {
    // Show "Recording in progress" snackbar when a user joins a room that is recording
    if (isRecording && prevIsRecording.current === null) {
      setActiveSnackbar(Snackbars.recordingInProgress);
    }
  }, [isRecording]);

  useEffect(() => {
    // Show "Recording started" snackbar when recording has started.
    if (isRecording && prevIsRecording.current === false) {
      setActiveSnackbar(Snackbars.recordingStarted);
    }
  }, [isRecording]);

  useEffect(() => {
    // Show "Recording finished" snackbar when recording has stopped.
    if (!isRecording && prevIsRecording.current === true) {
      setActiveSnackbar(Snackbars.recordingFinished);
    }
  }, [isRecording]);

  useEffect(() => {
    prevIsRecording.current = isRecording;
  }, [isRecording]);

  return (
    <>
      <Snackbar
        open={activeSnackbar === Snackbars.recordingStarted}
        handleClose={() => setActiveSnackbar(Snackbars.none)}
        variant="info"
        headline="Comenzó la grabación."
        message=""
      />
      <Snackbar
        open={activeSnackbar === Snackbars.recordingInProgress}
        handleClose={() => setActiveSnackbar(Snackbars.none)}
        variant="info"
        headline="Grabación en proceso."
        message=""
      />
      <Snackbar
        open={activeSnackbar === Snackbars.recordingFinished}
        headline="Grabación completada"
        message={
          <>
            Puedes ver la grabación en la{' '}
            <Link target="_blank" rel="noopener" href="https://www.twilio.com/console/video/logs/recordings">
              Consola de Twilio
            </Link>
            . La grabación estará disponible una vez terminada esta reunión.
          </>
        }
        variant="info"
        handleClose={() => setActiveSnackbar(Snackbars.none)}
      />
    </>
  );
}
