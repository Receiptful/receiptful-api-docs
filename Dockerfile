FROM ruby:2.6.3

RUN apt-get update
RUN apt-get install -yq build-essential
RUN gem install --no-document bundler
ADD Gemfile /app/
ADD Gemfile.lock /app/
RUN cd /app && bundler install
WORKDIR /app
CMD ["bundle", "exec", "middleman", "server"]
