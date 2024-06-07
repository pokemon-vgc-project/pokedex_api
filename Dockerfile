FROM node:22 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build 
RUN npm run proto:install
CMD [ "npm", "run", "start" ]
