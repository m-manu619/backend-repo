# Use Node.js image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port and start the application
EXPOSE 3000
CMD ["node", "index.js"]
