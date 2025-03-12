FROM node:22.14-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]
# CMD ["node", "dist/app.js"]