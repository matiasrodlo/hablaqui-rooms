# Imagen base
FROM node:14-alpine

# Crea una carpeta con el parámetro -p, sin error si existe, crea directorios padre según sea necesario, 
# con sus modos de archivo no afectados por ninguna opción -m.  Luego le cambia la propiedad a todos los
# archivos de la carpeta /app asignandosela a node.
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Cambiar de directorio actual a /home/node/app
WORKDIR /home/node/app

# Cambia el usuario actual a node
USER node

# Copia todos los archivos de la carpeta actual a la carpeta /home/node/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node . ./

# Instala las dependencias del proyecto
RUN npm install

# Se declaran las variables de entorno
ARG TWILIO_ACCOUNT_SID
ARG TWILIO_API_KEY_SECRET
ARG TWILIO_API_KEY_SID
ARG TWILIO_CONVERSATIONS_SERVICE_SID
ARG TWILIO_AUTH_TOKEN
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_DATABASE_URL
ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID

# Se establecen las variables de entorno
ENV TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
ENV TWILIO_API_KEY_SECRET=${TWILIO_API_KEY_SECRET}
ENV TWILIO_API_KEY_SID=${TWILIO_API_KEY_SID}
ENV TWILIO_CONVERSATIONS_SERVICE_SID=${TWILIO_CONVERSATIONS_SERVICE_SID}
ENV TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
ENV REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY}
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=${REACT_APP_FIREBASE_AUTH_DOMAIN}
ENV REACT_APP_FIREBASE_DATABASE_URL=${REACT_APP_FIREBASE_DATABASE_URL}
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${REACT_APP_FIREBASE_MESSAGING_SENDER_ID}

# Se construye el proyecto
RUN npm run build

# Se expone el puerto 4000
EXPOSE 4000

ENTRYPOINT [ "npm", "run", "start" ]