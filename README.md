# StpApp

### Image source
`Available images:`
<a href="docs/pageScreen.jpg" rel="some text">
  <img src="docs/_pageScreen.jpg" width="150" >
</a>

### Backend

```sh
    cd Backend
    npm install
```

## Run simple
```sh
    node app.js
```
Output:
```
Running at Port 3036
```

Open page: http://localhost:3036/

## Run Docker 

### Compose
```sh
docker-compose up
```

### Docker
```sh
docker build . -t stp-app-img
# Запустим и присоединимся к контейнеру, для запуска в нем команд
docker run -d --name proxy-stp -p 3036:3036 stp-app-img bash
# docker rm -f proxy-stp
# Или запустим контейнер для работы
docker run -d --name stp-app -p 3036:3036 stp-app-img
# docker rm -f stp-app
# Тест ответа
>curl http://localhost:3036
>exit
# Удаление контейнера и образа
docker image rm -f stp-app-img stpapp-form_webapp
```


## Run Selenoid linked

Даём имя контейнеру при запуске: stp-app
```sh
# docker container rm -f stp-app
docker build . -t stp-app-img
docker run -d --name stp-app stp-app-img
```

Теперь мы можем ссылаться на этот контейнер по имени stp-app.

Самое интересное в этой строчке: --link name:alias. name — имя контейнера, alias — имя, под которым этот контейнер будет известен запускаемому.
### Запускаем второй контейнер, связывая его с первым: 
Источник <https://habr.com/ru/post/327184//> 

Очистим систему от старого Селенойда
```sh
# Просмотр параметров текущего экземпляра
docker container inspect selenoid
# Очистим систему от старого Селенойда
docker rm -f selenoid
# Запустить линкованный Selenoid:
docker run -d --name selenoid -p 4444:4444 -v /home/droid/.aerokube/selenoid:/etc/selenoid:ro \
-v /var/run/docker.sock:/var/run/docker.sock       \
-v /home/droid/.aerokube/selenoid/video:/opt/selenoid/video \
-v /home/droid/.aerokube/selenoid/logs:/opt/selenoid/logs \
--link stp-app:stp-app  \
aerokube/selenoid      
```

### Тест
```sh
# Подключимся к запущенному селенойду
docker container exec -it selenoid sh
# Информация о системе
cat /etc/os-release
# Установить curl в Alpine Linux из командной строки:
apk --no-cache add curl
# Посмотрим ответ приложнения
curl http://stp-app:3036
```

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
