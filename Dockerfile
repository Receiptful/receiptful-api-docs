FROM ruby:2.6.3

RUN apt-get update
RUN apt-get install -yq build-essential
RUN gem install --no-document bundler
RUN cd /app; bundle install
WORKDIR /app
CMD ["bundle", "exec", "middleman", "server"]
