import TelegramApi from 'node-telegram-bot-api'
import UserModel from "../models/User.js";
import {options} from "./options.js";

const BotToken = '6614465396:AAHXYP9zkmBIr6IdWlUW-j2-ZLrYHkLRd0k'

const bot = new TelegramApi(BotToken, {polling: true})

export const startBot = async () => {

    bot.onText(/\/start/, async msg => {
            const chatId = msg.chat.id;

            try {
                const user = await UserModel.findOne({userBotId: msg.from.id})

                if (user) {
                    bot.sendMessage(chatId, 'Выберите соответствующую команду', options.commandOptions);
                } else {
                    bot.sendMessage(chatId, 'Введите ваши данные в формате Фамилия Имя');

                    bot.onText(/^(.+)$/, async (msg, match) => {
                        console.log('user text', match[1])
                        console.log('msg', msg)
                        const userName = match[1]
                        const [lastName, firstName] = userName.split(' ');

                        const doc = new UserModel({
                            fullName: userName.toString(),
                            performance: 1,
                            comment: "",
                            personalWeekends: [],
                            definedWeekends: [],
                            userBotId: msg.from.id
                        });

                        const user = await doc.save();
                        console.log('данные юзера', user)
                        bot.sendMessage(chatId, `Пользователь успешно сохранен. Вы ввели фамилию:  ${lastName},  имя: ${firstName}`, options.commandOptions);
                    })
                }
            } catch
                (err) {
                console.log(err);
            }

        }
    )

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const userBotId = msg.from.id

        if (data.startsWith('SelectPersonal')) {
            const day = data.replace('SelectPersonal','').toLowerCase();
            return handleDayOfWeekSelection(day, chatId, userBotId, 'personalWeekends')
        }
        if (data.startsWith('SelectDefined')) {
            const day = data.replace('SelectDefined','').toLowerCase();
            return handleDayOfWeekSelection(day, chatId, userBotId, 'definedWeekends')
        }

        switch (data) {
            case 'changePersonalWeekend':
                await bot.sendMessage(chatId, `Выберите день важного выходного`, options.DaysPersonalOptions);
                break;
            case 'changeDefineWeekend':
                await bot.sendMessage(chatId, `Выберите день важного выходного`, options.DaysDefinedOptions);
                break;
            case 'addComment':
                break;
            default:
                bot.sendMessage(chatId, 'Я тебя не понимаю)');
                break;
        }

    })
}

const handleDayOfWeekSelection = async (dayOfWeek, chatId, userId, arrayWeekends) => {
    try {
        const user = await UserModel.findOne({ userBotId: userId });
        if (user) {
            const index = user[arrayWeekends].indexOf(dayOfWeek);

            const DaysWeek = {
                'mon': 'Понедельник',
                'tue': 'Вторник',
                'wed': 'Среда',
                'thu': 'Четверг',
                'fri': 'Пятница',
                'sat': 'Суббота',
                'sun': 'Воскресенье',
            }

            if (index === -1) {
                user[arrayWeekends].push(dayOfWeek);
                await bot.sendMessage(chatId, `${DaysWeek[dayOfWeek]} добавлен.`);
            } else {
                user[arrayWeekends].splice(index, 1);
                await bot.sendMessage(chatId, `${DaysWeek[dayOfWeek]} удален.`);
            }

            await user.save();
            console.log('УСПЕШНО')
        } else {
            await bot.sendMessage(chatId, "Пользователь не найден. Пожалуйста, введите ваше имя снова.");
        }
    } catch (error) {
        console.error("Ошибка при обновлении дня недели:", error);
        await bot.sendMessage(chatId, "Произошла ошибка при обработке вашего запроса.");
    }
}