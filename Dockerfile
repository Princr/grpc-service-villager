FROM alpine:latest

RUN apk add -no-cache nodejs npm

# Set a working directory
WORKDIR /grpc-service    

COPY . /grpc-service

# Install Node.js dependencies
RUN npm install

# Set NODE_ENV env variable to "production" for faster expressjs
ENV NODE_ENV production

CMD [ "node", "server.js" ]

EXPOSE 9005