# Telegraph
This service holds logic for messaging between users.

## Starting Point
```sh
# Install Deps
## Learn more at https://hub.docker.com/_/postgres
docker run -d \
	--name telegraph-postgres \
	-p 5432:5432 \
	-e POSTGRES_PASSWORD=root \
	-e POSTGRES_USER=root \
	-e POSTGRES_DB=telegraph \
	postgres

## Learn more at https://hub.docker.com/_/nats/
docker run -d \
	--name nats \
	-p 4222:4222 \
	-p 8222:8222 \
	nats
	
# Copy env
cp .env.example .env

# Install packages and run app
pnpm i
pnpm start:dev
```

