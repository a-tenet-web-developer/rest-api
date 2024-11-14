# Use the official Node.js image.
FROM node:20

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install both regular and development dependencies
RUN ls
RUN pwd
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run your app using nodemon
CMD ["npm", "run", "dev"]
