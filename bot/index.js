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
                    await bot.sendMessage(chatId, 'Привет \n Выбери соответствующую команду', options.commandOptions);
                } else {
                    await bot.sendMessage(chatId, `Привет \nДля того, чтобы указать свои данные введи команду /name и укажи фамилию и имя \nИтоговое сообщение должно выглядеть так \n /name Фамилия Имя`);

                    if (!user) {
                        await bot.onText(/\/name (.+)/, async (msg, match) => {
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
                            console.log('ДОБАВЛЕН НОВЫЙ ЮЗЕР', user)
                            await bot.sendMessage(chatId, `Пользователь успешно сохранен. Вы ввели фамилию:  ${lastName},  имя: ${firstName}`, options.commandOptions);
                        })
                    }
                }
            } catch
                (err) {
                console.log(err);
            }

        }
    )

    bot.onText(/\/comment (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const text = match[1];

        const user = await UserModel.findOne({userBotId: msg.from.id})

        if (user) {
            user.comment = text;

            await user.save();
            console.log('Комментарий добавлен', user.comment)
            await bot.sendMessage(chatId, `Твой комментарий успешно сохранен: ${text}`);
        } else {
            await bot.sendMessage(chatId, 'Пользователь не найден');
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const userBotId = msg.from.id

        if (data.startsWith('SelectPersonal')) {
            const day = data.replace('SelectPersonal', '').toLowerCase();
            return handleDayOfWeekSelection(day, chatId, userBotId, 'personalWeekends')
        }
        if (data.startsWith('SelectDefined')) {
            const day = data.replace('SelectDefined', '').toLowerCase();
            return handleDayOfWeekSelection(day, chatId, userBotId, 'definedWeekends')
        }

        switch (data) {
            case 'changePersonalWeekend':
                await bot.sendMessage(chatId, `Выбери день важного выходного`, options.DaysPersonalOptions);
                break;
            case 'changeDefineWeekend':
                await bot.sendMessage(chatId, `Выбери день неважного выходного`, options.DaysDefinedOptions);
                break;
            case 'addComment':
                await bot.sendMessage(chatId, `Для того, чтобы оставить комментарий отправь сообщение начинающееся на команду \n\n /comment далее ваш комментарий`);
                break;
            case 'giveResult':
                return giveResult(chatId, userBotId)
            default:
                bot.sendMessage(chatId, 'Я тебя не понимаю)');
                break;
        }

    })
}

const DaysWeek = {
    'mon': 'Понедельник',
    'tue': 'Вторник',
    'wed': 'Среда',
    'thu': 'Четверг',
    'fri': 'Пятница',
    'sat': 'Суббота',
    'sun': 'Воскресенье',
}

const giveResult = async (chatId, userBotId) => {
    const user = await UserModel.findOne({userBotId});
    console.log(user);
    const textPersonalWeekends = user.personalWeekends.map(day => DaysWeek[day]).join('\n');
    const textDefinedWeekends = user.definedWeekends.map(day => DaysWeek[day]).join('\n');
    const textWeekendsNull = 'не выбрано';

    await bot.sendMessage(chatId, `Твои заполненные данные: \n 
Фамилия Имя: ${user.fullName} \n 
Выбранные важные выходные:  
${textPersonalWeekends || textWeekendsNull}  \n
Выбранные неважные выходные: 
${textDefinedWeekends || textWeekendsNull} \n
Оставленный комментарий: 
${user.comment}
`);
}

const handleDayOfWeekSelection = async (dayOfWeek, chatId, userId, arrayWeekends) => {
    try {
        const user = await UserModel.findOne({userBotId: userId});
        if (user) {
            const index = user[arrayWeekends].indexOf(dayOfWeek);

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
            await bot.sendMessage(chatId, "Пользователь не найден. Пожалуйста, введи твое имя заново.");
        }
    } catch (error) {
        console.error("Ошибка при обновлении дня недели:", error);
        await bot.sendMessage(chatId, "Произошла ошибка при обработке твоего запроса.");
    }
}