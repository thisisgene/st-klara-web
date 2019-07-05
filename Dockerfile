FROM wordpress

RUN apt-get update && apt-get -y install ghostscript && apt-get clean