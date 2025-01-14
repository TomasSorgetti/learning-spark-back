# Etapa 1: Builder
FROM node:18 AS builder

WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de desarrollo
RUN npm install

# Copiar todo el código fuente, incluyendo los archivos de src
COPY . .

# Transpilar TypeScript a JavaScript
RUN npm run build  # Este comando debe compilar los archivos de src a dist

# Etapa 2: Producción
FROM node:18

WORKDIR /app

# Copiar el archivo package.json y las dependencias de producción
COPY package*.json ./

RUN npm install --only=production

# Copiar los archivos compilados desde la etapa de build
COPY --from=builder /app/dist /app/dist

# Exponer el puerto donde la app escuchará
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["node", "dist/server.js"]
