FROM ubuntu:18.04
# Install.
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y build-essential && \
  apt-get install -y software-properties-common && \
  apt-get install -y byobu curl git htop man unzip vim wget nginx && \
  apt-get install -y --no-install-recommends mysql-client && \
  echo "daemon off;" >> /etc/nginx/nginx.conf && \
  
ENTRYPOINT ["mysql"]
# Add files.
ADD root/.bashrc /root/.bashrc
ADD root/.gitconfig /root/.gitconfig
ADD root/.scripts /root/.scripts

# Set environment variables.
ENV HOME /root
ADD exemplo /etc/nginx/sites-enabled/default
# Define working directory.
WORKDIR /root
EXPOSE 8080
# Define default command.
CMD ["service nginx start", "bash"]