FROM node
WORKDIR /AttackMonitor
COPY . /AttackMonitor
RUN cd /AttackMonitor/backend/ && touch access.log
RUN npm install -g pnpm
