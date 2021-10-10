import React, { useState } from 'react';
import Snackbar from '../../Snackbar/Snackbar';
import useDevices from '../../../hooks/useDevices/useDevices';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export function getSnackbarContent(hasAudio: boolean, hasVideo: boolean, error?: Error) {
  let headline = '';
  let message = '';

  switch (true) {
    // These custom errors are thrown by the useLocalTracks hook. They are thrown when the user explicitly denies
    // permission to only their camera, or only their microphone.
    case error?.message === 'CameraPermissionsDenied':
      headline = 'No se puede acceder a la cámara:';
      message =
        'Has denegado el permiso para utilizar el vídeo. Por favor, concede el permiso al navegador para acceder a tu cámara.';
      break;
    case error?.message === 'MicrophonePermissionsDenied':
      headline = 'No se puede acceder a tu micrófono:';
      message =
        'Has denegado el permiso para utilizar el audio. Por favor, concede el permiso al navegador para acceder a tu micrófono.';
      break;

    // This error is emitted when the user or the user's system has denied permission to use the media devices
    case error?.name === 'NotAllowedError':
      headline = 'No se puede acceder a tu cámara/micrófono:';

      if (error!.message === 'Permission denied by system') {
        // Chrome only
        message =
          'El sistema operativo ha bloqueado el acceso del navegador al micrófono o a la cámara. Por favor, comprueba la configuración de tu sistema operativo.';
      } else {
        message =
          'Has denegado el permiso para utilizar el audio y el vídeo. Por favor, concede permiso al navegador para acceder al micrófono y a la cámara.';
      }

      break;

    // This error is emitted when input devices are not connected or disabled in the OS settings
    case error?.name === 'NotFoundError':
      headline = 'Cannot Find Microphone or Camera:';
      message =
        'El navegador no puede acceder al micrófono o a la cámara. Asegúrate de que todos los dispositivos de entrada están conectados y habilitados.';
      break;

    // Other getUserMedia errors are less likely to happen in this app. Here we will display
    // the system's error message directly to the user.
    case Boolean(error):
      headline = 'Error obteniendo tus datos de video y/o audio:';
      message = `${error!.name} ${error!.message}`;
      break;

    case !hasAudio && !hasVideo:
      headline = 'Cámara o micrófono no detectado:';
      message = 'Los demás participantes en la sala no podrán verte ni oírte.';
      break;

    case !hasVideo:
      headline = 'Cámara no detectada:';
      message = 'Los demás participantes en la sala no podrán verte.';
      break;

    case !hasAudio:
      headline = 'Micrófono no detectado:';
      message = 'Los demás participantes en la sala no podrán oírte.';
  }

  return {
    headline,
    message,
  };
}

export default function MediaErrorSnackbar({ error }: { error?: Error }) {
  const { hasAudioInputDevices, hasVideoInputDevices } = useDevices();

  const { isAcquiringLocalTracks } = useVideoContext();

  const [isSnackbarDismissed, setIsSnackbarDismissed] = useState(false);

  const isSnackbarOpen =
    !isSnackbarDismissed &&
    !isAcquiringLocalTracks &&
    (Boolean(error) || !hasAudioInputDevices || !hasVideoInputDevices);

  const { headline, message } = getSnackbarContent(hasAudioInputDevices, hasVideoInputDevices, error);

  return (
    <Snackbar
      open={isSnackbarOpen}
      handleClose={() => setIsSnackbarDismissed(true)}
      headline={headline}
      message={message}
      variant="warning"
    />
  );
}
