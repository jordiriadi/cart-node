FROM node:16.15-alpine3.14
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY . .
RUN npm install
RUN npm run test
RUN chown -R app /opt/app
USER app
EXPOSE 3001
CMD [ "npm", "run", "dev" ]