<h1 align="center">Millennium Falcon</h1>
<p align="center">
    💘 <i>Video Chat Application based on WebRTC & JavaScript & Kubernetes</i>
</p>
<br />
<p align="center">
    <img src="https://cdn.dribbble.com/users/673247/screenshots/3929270/media/5134ca6144669a782ad63a6daea1d3cb.gif" alt="Icebreaker">
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

## Workspace
You could find services in the `application/services` folder. Here is the main logic of the application. <br />
Configuration packages lives in the `application/configuraion` folder. <br />
Services packages lives in the `application/packages` folder. All shared login you could put there.

## Infrastructure
```
TODO
```