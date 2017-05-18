/**
 * Created by plutonii on 04.04.17.
 */
const errorMap = new Map();
errorMap.set(1, "Логин или пароль неверный.");
errorMap.set(2, "Пользователь с такими данными уже существует.");
errorMap.set(3, "Срок действия ссылки истек.");
errorMap.set(4, "Не удалось отправить письмо.");
errorMap.set(5, "Доступ запрещён.")

export default errorMap;