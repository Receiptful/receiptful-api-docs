CM Commerce API Documentation
========

Deployment
------------------------------
This repository is deployed to Github Pages using [Codeship](https://app.codeship.com/projects/e569c180-4c7e-0132-836b-56f215a90c58). The Github Page is aliased by the [CM Commerce developers](https://developers.commerce.campaignmonitor.com) sub-domain, which is managed by the CM infrastructure team. In the event it needs to change, the `source/CNAME` file also needs to be updated to tell Github to accept requests on the new domain.

Getting Started with Slate
------------------------------

### Prerequisites

You're going to need:

 - **Ruby, version 2.2.2 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

### Getting Set Up

 1. Install all dependencies: `bundle install`
 2. Start the test server: `bundle exec middleman server`

> Note: If you get an error installing the native extensions for the `eventmachine` gem, try `gem install eventmachine -v '1.2.7' -- --with-cppflags=-I/usr/local/opt/openssl/include`.

You can now see the docs at <http://localhost:4567>. And as you edit `source/index.md`, your server should automatically update! Whoa! That was fast!

Now that Slate is all set up your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/tripit/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/tripit/slate/wiki/Deploying-Slate).

### Tips (for Ubuntu)

- You might have to update the Gemfile to match your own Ruby version. Just don't commit it :-)
- Before running `bundle install`, you might have to manually install a newer
  JSON version than the one the bundler wants, e.g.:

  `sudo gem install json -v '1.8.2'`
