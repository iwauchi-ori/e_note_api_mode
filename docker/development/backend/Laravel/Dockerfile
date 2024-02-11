FROM php:8.3

# phpで最低限必要なものをインストール
RUN apt-get update && apt-get install -y unzip git libonig-dev && \
    docker-php-ext-install pdo_mysql mysqli

# composer入れる(2行目はバージョンによってハッシュ値が変わるので作成時の最新のものを入れるべき)
# => https://composer.github.io/pubkeys.html
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"; \
    php -r "if (hash_file('sha384', 'composer-setup.php') === 'edb40769019ccf227279e3bdd1f5b2e9950eb000c3233ee85148944e555d97be3ea4f40c3c2fe73b22f875385f6a5155') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;";\
    php composer-setup.php;\
    php -r "unlink('composer-setup.php');";

COPY /Docker/development/backend/Laravel/php.ini /usr/local/etc/php/php.ini

CMD /bin/bash

WORKDIR /tretter