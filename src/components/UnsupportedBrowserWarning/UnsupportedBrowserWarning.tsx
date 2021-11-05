import React from 'react';
import Video from 'twilio-video';
import { Container, Link, Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    marginTop: '2.5em',
  },
  paper: {
    padding: '1em',
  },
  heading: {
    marginBottom: '0.4em',
  },
});

export default function UnsupportedBrowserWarning({ children }: { children: React.ReactElement }) {
  const classes = useStyles();

  if (!Video.isSupported) {
    return (
      <Container>
        <Grid container justifyContent="center" className={classes.container}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography variant="h4" className={classes.heading}>
                Navegador o entorno no compatible con Hablaquí Rooms.
              </Typography>
              <Typography>
                Usa Hablaquí Rooms con uno de los siguientes{' '}
                <Link
                  href="https://www.twilio.com/docs/video/javascript#supported-browsers"
                  target="_blank"
                  rel="noopener"
                >
                  navegadores soportados
                </Link>
                .
                <br />
                Si estás usando un navegador compatible, asegúrate de estar usando una{' '}
                <Link
                  href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
                  target="_blank"
                  rel="noopener"
                >
                  conexión segura
                </Link>{' '}
                (por ejemplo, https).
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return children;
}
