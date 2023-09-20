export const options = {
    commandOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'Выбрать важные выходные', callback_data: 'changePersonalWeekend'},
                    {text: 'Выбрать неважные выходные', callback_data: 'changeDefineWeekend'},
                ],
                [
                    {text: 'Оставить комментарий', callback_data: 'addComment'},
                ],
            ],
        })
    },

    fullNameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Отправить', callback_data: 'addFullName'}],
            ]
        })
    },

    DaysPersonalOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'Понедельник', callback_data: 'SelectPersonalMon'},
                    {text: 'Вторник', callback_data: 'SelectPersonalTue'},
                    {text: 'Среда', callback_data: 'SelectPersonalWed'},
                ],
                [
                    {text: 'Четверг', callback_data: 'SelectPersonalThu'},
                    {text: 'Пятница', callback_data: 'SelectPersonalFri'},
                    {text: 'Суббота', callback_data: 'SelectPersonalSat'},
                ],
                [{text: 'Воскресенье', callback_data: 'SelectPersonalSun'},],
            ]
        })
    },

    DaysDefinedOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'Понедельник', callback_data: 'SelectDefinedMon'},
                    {text: 'Вторник', callback_data: 'SelectDefinedTue'},
                    {text: 'Среда', callback_data: 'SelectDefinedWed'},
                ],
                [
                    {text: 'Четверг', callback_data: 'SelectDefinedThu'},
                    {text: 'Пятница', callback_data: 'SelectDefinedFri'},
                    {text: 'Суббота', callback_data: 'SelectDefinedSat'},
                ],
                [{text: 'Воскресенье', callback_data: 'SelectDefinedSun'},],
            ]
        })
    },
}