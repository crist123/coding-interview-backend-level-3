FROM node:20

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Set `HOST_DB_CONTAINER` environment variable for db connection in container
ENV HOST_DB_CONTAINER=mysql_db
ENV HOST_CONTAINER=0.0.0.0
ENV ENV=prod

WORKDIR /usr/src

EXPOSE 3000

CMD [ "npm", "run", "start:serve"]
