FROM node:22 

# Create app directory
WORKDIR /app

COPY . . 

RUN if [ "$APP_ENV" = "production" ]; then \
        /app/builds/scripts/production-build.sh; \
    fi

RUN chown -R node:node /app
USER node

CMD [ "npm", "run", "start" ]
