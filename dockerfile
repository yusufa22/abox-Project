FROM node

WORKDIR /srv

COPY . .

RUN npm install

RUN npm run build

CMD npm run start


