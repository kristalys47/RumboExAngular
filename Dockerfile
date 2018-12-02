# base image
FROM node:8.12.0

# set working directory
WORKDIR /app

# install app dependencies
# this is done before copying app to avoid re-intalling dependencies when a file is changed
COPY package.json /app/package.json
RUN npm install -g @mobiscroll/cli
RUN DEBIAN_FRONTEND='noninteractive' -irixa.vales@upr.edu -chocolate | mobiscroll login -g
RUN mobiscroll config angular
RUN npm install
RUN npm install -g @angular/cli@6.0.6

# copy everything to app
COPY . /app

# make port 8000 available to the world outside this container
EXPOSE 8000

#start app
CMD ng serve --host 0.0.0.0
