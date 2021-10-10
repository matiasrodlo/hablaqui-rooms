import React, { PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import { version as appVersion } from '../../../package.json';
import Video from 'twilio-video';
import { useAppState } from '../../state';

interface AboutDialogProps {
  open: boolean;
  onClose(): void;
}

function AboutDialog({ open, onClose }: PropsWithChildren<AboutDialogProps>) {
  const { roomType } = useAppState();
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>Acerca de esta sala</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>Navegador compatible: {String(Video.isSupported)}</DialogContentText>
        <DialogContentText>Versión del SDK: {Video.version}</DialogContentText>
        <DialogContentText>Versión de la app: {appVersion}</DialogContentText>
        {roomType && <DialogContentText>Tipo de sala: {roomType}</DialogContentText>}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AboutDialog;
