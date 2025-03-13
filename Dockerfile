FROM node:22 

# Create app directory
WORKDIR /app


ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}

COPY . . 

RUN if [ "$NODE_ENV" = "production" ]; then \
  /app/builds/scripts/production-build.sh; \
fi

RUN chown -R node:node /app
USER node

CMD [ "npm", "run", "start:prod" ]
