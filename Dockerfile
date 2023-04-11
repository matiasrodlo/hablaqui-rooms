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

# Se construye el proyecto
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]