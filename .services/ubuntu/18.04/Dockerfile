FROM ubuntu:18.04
MAINTAINER Aníbal Henrique @ahsouza <annibalhsouza@gmail.com>
# Let the container know that there is no tty
ENV DEBIAN_FRONTEN noninteractive
ENV LD_LIBRARY_PATH /opt/oracle/instantclient_12_2
ENV ORACLE_HOME /opt/oracle/instantclient_12_2

RUN echo "[CRECI-ES]--> Iniciando configurações..." && \
    dpkg-divert --local --rename --add /sbin/initctl && \
 ln -sf /bin/true /sbin/initctl && \
 mkdir /var/run/sshd && \
 mkdir /run/php

RUN echo "[CRECI-ES]--> Instalando PHP..." && \
    apt-get update && \
 apt-get install -y --no-install-recommends apt-utils software-properties-common python-software-properties language-pack-en-base apt-transport-https && \
 LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php && \
 apt-get update && apt-get upgrade -y && \
 apt-get install -y python-setuptools alien curl git vim sudo unzip openssh-server openssl supervisor nginx memcached ssmtp cron build-essential libaio1 && \
 apt-get install -y php7.1-fpm php7.1-mysql php7.1-curl php7.1-dev php7.1-gd php7.1-intl php7.1-mcrypt php7.1-sqlite php7.1-tidy php7.1-xmlrpc php-pear php7.1-ldap freetds-common php7.1-sqlite3 php7.1-json php7.1-xml php7.1-mbstring php7.1-soap php7.1-zip php7.1-cli php7.1-sybase php7.1-odbc php7.1-readline

RUN echo "[CRECI-ES]--> Instalando Composer..." && \
    curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer


COPY ./freetds/freetds.conf /etc/freetds/freetds.conf

RUN echo "[CRECI-ES]--> Instalando OCI8" && \
    echo "instantclient,$ORACLE_HOME" | pecl install oci8 && \
    echo -e "; priority=20\nextension=oci8.so" > /etc/php/7.1/mods-available/oci8.ini && \
    ln -s /etc/php/7.1/mods-available/oci8.ini /etc/php/7.1/fpm/conf.d/20-oci8.ini && \
    ln -s /etc/php/7.1/mods-available/oci8.ini /etc/php/7.1/cli/conf.d/20-oci8.ini

# Nginx configuration
RUN sed -i -e"s/worker_processes  1/worker_processes 5/" /etc/nginx/nginx.conf && \
 sed -i -e"s/keepalive_timeout\s*65/keepalive_timeout 2/" /etc/nginx/nginx.conf && \
 sed -i -e"s/keepalive_timeout 2/keepalive_timeout 2;\n\tclient_max_body_size 128m;\n\tproxy_buffer_size 256k;\n\tproxy_buffers 4 512k;\n\tproxy_busy_buffers_size 512k/" /etc/nginx/nginx.conf && \
 echo "daemon off;" >> /etc/nginx/nginx.conf && \
 # PHP-FPM configuration
 sed -i -e "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g" /etc/php/7.1/fpm/php.ini && \
 sed -i -e "s/upload_max_filesize\s*=\s*2M/upload_max_filesize = 100M/g" /etc/php/7.1/fpm/php.ini && \
 sed -i -e "s/post_max_size\s*=\s*8M/post_max_size = 100M/g" /etc/php/7.1/fpm/php.ini && \
 sed -i -e "s/;daemonize\s*=\s*yes/daemonize = no/g" /etc/php/7.1/fpm/php-fpm.conf && \
 sed -i "/listen = .*/c\listen = [::]:9000" /etc/php/7.1/fpm/pool.d/www.conf && \
 sed -i -e "s/;catch_workers_output\s*=\s*yes/catch_workers_output = yes/g" /etc/php/7.1/fpm/pool.d/www.conf && \
 sed -i -e "s/pm.max_children = 5/pm.max_children = 9/g" /etc/php/7.1/fpm/pool.d/www.conf && \
 sed -i -e "s/pm.start_servers = 2/pm.start_servers = 3/g" /etc/php/7.1/fpm/pool.d/www.conf && \
 sed -i -e "s/pm.min_spare_servers = 1/pm.min_spare_servers = 2/g" /etc/php/7.1/fpm/pool.d/www.conf && \
 sed -i -e "s/pm.max_spare_servers = 3/pm.max_spare_servers = 4/g" /etc/php/7.1/fpm/pool.d/www.conf && \
 sed -i -e "s/pm.max_requests = 500/pm.max_requests = 200/g" /etc/php/7.1/fpm/pool.d/www.conf && \
 sed -i -e "/pid\s*=\s*\/run/c\pid = /run/php/php7.1-fpm.pid" /etc/php/7.1/fpm/php-fpm.conf && \
 # sed -i -e "s/;listen.mode = 0660/listen.mode = 0750/g" /etc/php/7.1/fpm/pool.d/www.conf && \

 # mcrypt configurações
 phpenmod mcrypt && \
 # remove default nginx configuração
 rm -Rf /etc/nginx/conf.d/* && \
 rm -Rf /etc/nginx/sites-available/default && \
 # criando workdir diretório
 mkdir -p /var/www/app

# Limpando
RUN apt-get autoremove -y && \
apt-get clean && \
 apt-get autoclean

COPY ./config/nginx/nginx.conf /etc/nginx/sites-available/default.conf
# Supervisor Config
COPY ./config/supervisor/supervisord.conf /etc/supervisord.conf
# Start Supervisord
COPY ./config/cmd.sh /

# Application directory
WORKDIR "/var/www/app"

RUN rm -f /etc/nginx/sites-enabled/default && \
 ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default && \
 chmod 755 /cmd.sh && \
 chown -Rf www-data.www-data /var/www && \
 touch /var/log/cron.log && \
 touch /etc/cron.d/crontasks

# Expose Ports
EXPOSE 8080

ENTRYPOINT ["/bin/bash", "/cmd.sh"]