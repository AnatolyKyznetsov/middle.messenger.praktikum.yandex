# Мессенджер

## В проект войдут стандартные функции чата:
+ регистрация
+ авторизация
+ список чатов
+ обмен сообщениями

## На данный момент реализованно:
+ [Макет](https://www.figma.com/file/pbGFCt4LJYFiVVSkSvfPFk/messenger.praktikum?node-id=13%3A171&t=Q8wPAsf3I90JBCUM-1)
+ Шаблоны страниц с использованием handlebars
+ Публикация на [Netlify](https://celadon-zabaione-8d93f1.netlify.app/)

## Структура проекта
+ Компонент шаблонов - */src/components*
+ Шаблоны страниц - */src/pages*
+ Стили - */src/styles*

## Стили
Для написания стилей используется SCSS + БЭМ.  
Стили для компонентов шаблонов хранятся в */src/styles/components*.

## Сборка проекта
Для сборки используется Parcel.

Запуск проекта для разработки:
```
npm run dev
```

Сборка проекта:
```
npm run build
```

Сборка и запуск сервера:
```
npm run start
```
