FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
RUN npm install --save-dev typescript @types/node @types/express @types/cors
COPY . .
RUN npm run build
RUN npm prune --production
EXPOSE 5000              
CMD ["npm","start"]