#FROM parrotsec/parrot-core:4.6
FROM ubuntu:16.04
#RUN apt-get update; apt-get -y dist-upgrade;apt-get -y install parrot-pico;apt-get -y install parrot-mini parrot-tools-cloud; rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install
RUN apk update && apk add --no-cache docker
COPY crond.sh /crond.sh
RUN chmod -v +x /crond.sh
RUN mkdir -p /var/log/cron && touch /var/log/cron/cron.log
CMD ['./crond.sh']
COPY teste.js /tmp/teste.js
EXPOSE 5000
CMD ["bash", "start"]