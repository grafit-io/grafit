![Logo](../img/color_logo_transparent.png)

[![Build Status](https://travis-ci.com/grafit-io/grafit.svg?branch=master)](https://travis-ci.com/grafit-io/grafit)
[![codecov](https://codecov.io/gh/grafit-io/grafit/branch/master/graph/badge.svg)](https://codecov.io/gh/grafit-io/grafit)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgrafit-io%2Fgrafit.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgrafit-io%2Fgrafit?ref=badge_shield)

grafit is an MIT-licensed web app that allows teams to store, share and search knowledge in an effective way. With intelligent relation detection, different data sources are presented and searchable at one central entry point.

## User Guide

The user documentation is available [here](userdoc/signup.md).

## Developer Guide

The documentation for developers is available [here](developerdoc/quickstart.md).
If you want to contribute to this project please follow the contributing guidelines [here](https://github.com/grafit-io/grafit/blob/master/CONTRIBUTING.md).

## Deployment

Grafit can be deployed via a docker-compose file. The prerequisite for this is that you have Docker and Docker-Compose installed on the target machine.  
Instructions can be found here:  
Install Docker [Mac](https://docs.docker.com/docker-for-mac/install/) / [Windows](https://docs.docker.com/docker-for-windows/install/)

Once Docker is installed the current production docker-compose file can be downloaded with the following curl command:

```bash
curl https://raw.githubusercontent.com/grafit-io/grafit/master/docker-compose.yml -o docker-compose.yml
```

Next all containers can be startet with the docker-compose command:

```bash
docker-compose up
```

Once all containers have started the following actions can be taken:

- Go to [http://localhost:3000](http://localhost:3000) to start the app.
- Go to [http://localhost:8001](http://localhost:8001) to read the docs.

More about the different containers can be read [here](developerdoc/containers.md).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgrafit-io%2Fgrafit.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgrafit-io%2Fgrafit?ref=badge_large)
