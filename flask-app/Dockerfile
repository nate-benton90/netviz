FROM python:3.8-alpine

# assign github auth env vars from pipeline
ARG GITHUB_CID=$GITHUB_CID
ARG GITHUB_CS=$GITHUB_CS
ENV GITHUB_CID=$GITHUB_CID \
    GITHUB_CS=$GITHUB_CS

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

# needed for python ssl package and certbot (i.e. letsencryt)
RUN apk update && \
    apk add libffi-dev && \
    apk add python3-dev && \
    apk add gcc && \
    apk add libc-dev
    
RUN pip install -r requirements.txt

COPY . /app

# check the python app for port matching and firewall rules in iac
EXPOSE 30000

ENTRYPOINT [ "python" ]

CMD [ "webpage.py" ]
