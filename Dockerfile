FROM node
# создание директории приложения
WORKDIR /usr/src/app/Backend
COPY Backend/app.js ./app.js
COPY Backend/package.json ./package.json
COPY dist/ ../dist


RUN  npm install
CMD ["node", "app.js"]
EXPOSE 3036
