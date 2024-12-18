FROM php:8.3-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
  libzip-dev \
  zip \
  unzip

RUN a2enmod rewrite

RUN docker-php-ext-install pdo_mysql zip

# Get Node.js version 20
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs

# Set Apache document root
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy application files
COPY . /var/www/html

RUN ls -la /var/www/html

# Set working directory
WORKDIR /var/www/html

# Install Node.js dependencies and build
RUN npm install
RUN npm run build

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install

# Run Laravel Artisan commands
RUN php artisan config:clear \
  && php artisan config:cache \
  && php artisan route:clear \
  && php artisan route:cache \
  && php artisan optimize

# Set permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Start services
CMD ["sh", "-c", "npm run preview & apache2-foreground"]
