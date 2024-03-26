# Use the official Node.js runtime as the base image
FROM node:21 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package.json
COPY yarn.lock yarn.lock

# Install dependencies
RUN yarn install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN yarn build

ENV NGINX_ENVSUBST_OUTPUT_DIR "/etc/nginx"
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Remove default nginx static assets
COPY nginx_run.sh /nginx_run.sh
RUN chmod +x /nginx_run.sh

# Note: This needs the trailing slash
# ENV GATEWAY_URL "http://192.168.208.1:6523/"
EXPOSE 8080

CMD ["/nginx_run.sh"]
