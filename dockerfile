FROM node
WORKDIR /AttackMonitor
COPY . /AttackMonitor
RUN npm install -g pnpm
