<h1 align="center">Millennium Falcon</h1>
<p align="center">
    💘 <i>Video Chat Application based on WebRTC & JavaScript & Kubernetes</i>
</p>
<br />
<p align="center">
    <img src="https://cdn.dribbble.com/users/1107691/screenshots/4523506/media/7f356b2c7d30aabd0037fede0ef3ba3a.gif" alt="Icebreaker">
</p>

<br />

### Technologies Stack
**Build Pack:** [PNPM & Workspaces](https://pnpm.io/workspaces), [TypeScript](https://www.typescriptlang.org/docs/);

**Backend:** [Node.js](https://nodejs.dev/en/), [Nest.js](https://nestjs.com), [TypeORM](https://typeorm.io), [PostgresSQL](https://www.postgresql.org);

**Frontend:** [Next.js](https://nextjs.org), [React](https://react.dev), [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API), [Tailwind](https://tailwindcss.com/docs/installation);

**Deployment:** [Docker](https://www.docker.com), [Kubernetes](https://kubernetes.io), [Skaffold](https://skaffold.dev), [Minikube](https://minikube.sigs.k8s.io/docs/start/), [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/);

**Testing:**: [Node Test Runner](https://nodejs.org/api/test.html), [Node Assertions](https://nodejs.org/api/assert.html), [Playwright](https://playwright.dev/docs/intro)

**CI**: [GitHub Actions](https://docs.github.com/en/actions)


## Starting Point
It will be a steep climb, but step by step we will get there.

It's better to set it up once than every time. Good luck and have fun 🪖

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install nvm
nvm install 20

pnpm i
```

So, you have the necessary packages installed, but now you're wondering how to connect them to external services like databases. 🤔
Not to worry, you can accomplish this using tools like Docker, Kubernetes, and Skaffold.

With these tools, you can automate the installation and building of all the necessary dependencies, making the process feel almost magical 🪄.
For example, you can easily install and connect PostgresSQL, NATS Streaming service, and other services to your API services.

```bash
brew install --cask docker
brew install skaffold
brew install minikube

minikube start
minikube addons enable metrics-server
minikube addons enable ingress

# Add to /etc/hosts
127.0.0.1 millenium.com

# Build and Deploy Containers
cd deployment/k8s
skaffold dev

# Finally... In new terminal window 😭 Release Icebreaker 🎉 🎉 🎉
sudo minikube tunnel

# Visit http://millenium.com 🚀
```

### Alternative
In order to skip Kubernetes start up you could create service dependencies manually
and connect them in environment variables.
One way to do this is to run Docker images of a specific dependency and inject them.

```shell
# Learn more at https://hub.docker.com/_/postgres
docker run -d \
	--name postgres \
	-p 5432:5432
	-e POSTGRES_PASSWORD=root \
	-e POSTGRES_USER=root \
	-e POSTGRES_DB=storage \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v /custom/mount:/var/lib/postgresql/data \
	postgres

# Learn more at https://hub.docker.com/_/nats/
docker run -d \
	--name nats \
	-p 4222:4222 \
	-p 8222:8222 \
	nats --http_port 8222
```

## Workspace
You could find services in the `application/services` folder. Here is the main logic of the application. <br />
Configuration packages lives in the `application/configuraion` folder. <br />
Services packages lives in the `application/packages` folder. All shared login you could put there.

## Infrastructure
```
TODO
```

## Links
- [Application Concept (Draft)](https://dormammun.notion.site/Product-Concept-01c721c64cbc4060aa768d5fb97faeb4?pvs=4)
- [Architecture Design (Draft)](https://dormammun.notion.site/Architecture-Document-955e79bc073b4fd7a88de06d81cab296)
- [Design](https://www.figma.com/file/kjHb3gcPDZ9wHmQle0474n/Untitled?type=design&node-id=0-1&mode=design&t=xiiu4bSlGt9aF3g5-0)