import React from 'react';
import Snackbar from '../Snackbar/Snackbar';
import useRoomState from '../../hooks/useRoomState/useRoomState';

export default function ReconnectingNotification() {
  const roomState = useRoomState();

  return (
    <Snackbar
      variant="error"
      headline="Conexión perdida:"
      message="Reconectando a la sala..."
      open={roomState === 'reconnecting'}
    />
  );
}
