FROM node:20-alpine
WORKDIR /usr/src/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/app.js"]
