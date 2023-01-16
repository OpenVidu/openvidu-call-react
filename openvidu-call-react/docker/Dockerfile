FROM node:16-alpine3.16

COPY . ./openvidu-call-react

WORKDIR /openvidu-call-react


# Install openvidu-call-react dependencies and build it
RUN npm install && \
	npm run build && \
	cp -r ./build/ ./openvidu-basic-node/public

# Copy openvidu-basic-node
RUN cp -r ./openvidu-basic-node /opt/openvidu-basic-node && \
	rm -rf ../openvidu-call-react

# Install openvidu-basic-node dependencies
RUN npm --prefix /opt/openvidu-basic-node install

WORKDIR /opt/openvidu-basic-node

COPY docker/entrypoint.sh .

ENTRYPOINT [ "./entrypoint.sh" ]