# Use the Playwright-prepared image that already has dependencies installed
FROM mcr.microsoft.com/playwright:v1.42.1-focal

# Set the working directory for your application
WORKDIR /app

# Copy your application files to the container
COPY . /app

# Install required Node.js and lib dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm-dev \
    libxkbcommon-dev \
    libgbm-dev \
    libasound-dev \
    libatspi2.0-0 \
    libxshmfence-dev \
 && rm -rf /var/lib/apt/lists/* \
 && npm install

# Expose the port your app runs on, if applicable
EXPOSE 3000

# Playwright needs the following browsers; ensure they are installed
RUN npx playwright install

# Command to run tests
CMD ["npx", "playwright", "test"]