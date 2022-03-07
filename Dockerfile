FROM node:12

# Create app directory, container in image
WORKDIR /app

# To install dependencies
COPY package*.json .


# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Copy app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]