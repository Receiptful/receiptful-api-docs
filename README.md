CM Commerce API Documentation
========

Deployment
------------------------------
This repository is deployed to Github Pages using [Codeship](https://app.codeship.com/projects/e569c180-4c7e-0132-836b-56f215a90c58). The Github Page is aliased by the [CM Commerce developers](https://developers.commerce.campaignmonitor.com) sub-domain, which is managed by the CM infrastructure team. In the event it needs to change, the `source/CNAME` file also needs to be updated to tell Github to accept requests on the new domain.

Local Development
------------------------------
A handy-dandy Dockerfile and Docker Compose file is provided, so just run `docker-compose up` and then you can see the docs at <http://localhost:4567>. Editing the `.md` files under `source/` should automatically restart your server.

Now that Slate is all set up your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/tripit/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/tripit/slate/wiki/Deploying-Slate).
