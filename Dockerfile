FROM node:16-alpine

# set working directory
WORKDIR /app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# copy project files
COPY . .

# expose port
EXPOSE 5173

# start application
CMD ["npm", "run", "dev"]
