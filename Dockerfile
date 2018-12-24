FROM node:8
# Create app directory
WORKDIR /usr/src/storyflip
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package*.json ./

RUN cd server && npm install --only=production
CMD [ "npm", "install-all" ]
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

