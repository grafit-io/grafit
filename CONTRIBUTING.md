# Contribute :rocket:

Thank you for contributing! 

By participating in this project, you agree to abide by the code of conduct.

Before we can merge your Pull-Request here are some guidelines that you need to follow. 
These guidelines exist not to annoy you, but to keep the code base clean, unified and future proof.

## Unit-Tests :umbrella:

Please try to add a test for your pull-request. 
This project uses [Django](https://www.djangoproject.com/) on the backend and you can run tests with the following command:
```
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py test
```


## Documentation :notebook:
User and developer documentation is available [here](https://grafit.readthedocs.io/en/latest/).  
UI-Guidelines are available [here](https://brandguidelines.logojoy.com/grafit-io).

## CI :construction_worker:

We automatically run your pull request through [Travis CI](https://www.travis-ci.org) and [Codecov](https://codecov.io/).

## Issues and Bugs :bug:

To create a new issue, you can use the GitHub issue tracking system.
We use the [Issue.sh GitHub Extension](https://issue.sh/) to get a better Issue Board with Issue Dependencies.

## Getting merged :checkered_flag:

Please allow us time to review your pull requests.
We will give our best to review everything as fast as possible, but cannot always live up to our own expectations.

We try to follow a coherent [commit message style](https://karma-runner.github.io/2.0/dev/git-commit-msg.html) laid out by Karama Runner.

Pull requests without tests most probably will not be merged.
Documentation PRs obviously do not require tests.

Thank you very much again for your contribution!

If you habe any questions, you can drop a mail to grafitio@protonmail.com


