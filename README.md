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
docker run -it --name proxy-stp -p 3036:3036 stp-app-img bash
# Тест ответа
>curl http://localhost:3036
>exit
# Удаление контейнера и образа
docker image rm -f stp-app-img stpapp-form_webapp
```


## Run Selenoid linked

Даём имя контейнеру при запуске: stp-app
```sh
docker container rm -f stp-app
docker run -d --name stp-app stp-app-img
```
Теперь мы можем ссылаться на этот контейнер по имени stp-app.
Самое интересное в этой строчке: --link name:alias. name — имя контейнера, alias — имя, под которым этот контейнер будет известен запускаемому.
### Запускаем второй контейнер, связывая его с первым: 
Очистим систему от старого Селенойда
```sh
docker stop selenoid
docker rm -f selenoid
docker start selenoid
```

### Запуск Селенойда
Установим Selenoid без локальной cm - Источник <https://habr.com/ru/post/327184//> 

Создать каталог для хранения конфигурации Selenoid и сгенерировать конфигурационный файл:
```sh
mkdir -p /home/sakuldodo/Projects/selenoid_cfg
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aerokube/cm:1.0.0 selenoid \
  --last-versions 2 --tmpfs 128 --pull > /home/sakuldodo/Projects/selenoid_cfg/browsers.json
```
  Запустить Selenoid:
```sh
docker run -d --name selenoid -p 4444:4444 -v /home/sakuldodo/Projects/selenoid_cfg/:/etc/selenoid:ro \
      -v /var/run/docker.sock:/var/run/docker.sock aerokube/selenoid:1.1.1
```
```sh
docker ps
# NAMES
# stp-app
# selenoid
```
```sh
docker rm -f selenoid
```
Запустить линкованный Selenoid:
```sh
docker run -d --name selenoid -p 4444:4444 -v /home/sakuldodo/Projects/selenoid_cfg/:/etc/selenoid:ro \
      --link stp-app:stp-app                          \
      -v /var/run/docker.sock:/var/run/docker.sock aerokube/selenoid:1.1.1
```

### Тест
Подключимся к запущенному селенойду
```sh
docker container exec -it selenoid sh
```
Информация о системе
```sh
cat /etc/os-release
```
Установить curl в Alpine Linux из командной строки:
Источник <https://www.shellhacks.com/ru/alpine-install-curl/> 
```sh
apk --no-cache add curl
```
Посмотрим ответ приложнения
curl http://stp-app:3036


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Development server

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
