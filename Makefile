# NAME         := supply-chain-ui
NPM_REGISTRY := $(shell npm config get registry)
NPM          := npm
DOCKER       := docker
GIT          := git
CLIENT_IMAGE := app
CLIENT_PORT  := 4000
API_IMAGE    := api
API_PORT     := 8080
NOCACHE      ?= 0

include .env 

ifeq ($(NOCACHE), 1)
		DOCKER_BUILD_OPTS=--no-cache
endif

ifeq ($(NOCACHE), 1)
		DOCKER_BUILD_OPTS=--no-cache
endif

srv/log: ./srv/docker-compose.yml
	cd srv && mkdir -p $(shell grep -oE './log/(.+):/usr/src/app/log' $< | cut -d ':' -f 1)


# DOCKER_COMPOSE := docker-compose  -p $(NAME) 
DOCKER_COMPOSE := docker-compose

start-dev: .env # start dev with compose
	$(DOCKER_COMPOSE) up --remove-orphans --force-recreate

stop-dev: .env # stop dev
	$(DOCKER_COMPOSE) down --remove-orphans

restart-dev: # restart all services in compose
		$(DOCKER_COMPOSE) restart

node_modules: package.json ## install node modules
	$(NPM) ci --quiet --registry=$(NPM_REGISTRY)

lint: node_modules # Run ES Lint for UI code.
	$(NPM) run lint

analyse: ## analyse bundle
	webpack --profile --json --mode=production > stats.json && webpack-bundle-analyzer stats.json

help: ## display help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z._-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help
