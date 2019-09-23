FROM node:10

WORKDIR /usr/src/app/
COPY package*.json ./
#RUN apt-get update && apt-get install -y yarn
RUN npm install && npm migrate
COPY . .
EXPOSE 8000

CMD ["npm", "start"]
