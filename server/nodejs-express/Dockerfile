FROM node:16.20-buster-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . /app/

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]
