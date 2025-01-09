# Usa una imagen oficial de Node.js como base
FROM node:16

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si lo tienes)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la app escuchará (ajustar al puerto de tu app)
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]