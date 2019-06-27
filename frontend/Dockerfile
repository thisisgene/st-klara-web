FROM node:10-alpine as react-build

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

# RUN npm build

# CMD [ "npm", "run", "build" ]



# Alternative 1

# WORKDIR /app
# COPY . ./
# RUN yarn
# RUN yarn build

# # stage: 2 — the production environment
# FROM nginx:alpine
# COPY --from=react-build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]