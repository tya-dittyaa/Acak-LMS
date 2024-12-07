FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
  libzip-dev \
  zip \
  unzip

RUN a2enmod rewrite

RUN docker-php-ext-install pdo_mysql zip

# get node js version 20
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

COPY . /var/www/html

RUN ls -la /var/www/html

WORKDIR /var/www/html

RUN npm install

RUN npm run build

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install

RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

CMD ["sh", "-c", "npm run preview & apache2-foreground"]