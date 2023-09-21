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
                    {text: 'Посмотреть результат', callback_data: 'giveResult'},
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
                    {text: 'ПН', callback_data: 'SelectPersonalMon'},
                    {text: 'ВТ', callback_data: 'SelectPersonalTue'},
                    {text: 'СР', callback_data: 'SelectPersonalWed'},
                    {text: 'ЧТ', callback_data: 'SelectPersonalThu'},
                    {text: 'ПТ', callback_data: 'SelectPersonalFri'},
                    {text: 'СБ', callback_data: 'SelectPersonalSat'},
                    {text: 'ВС', callback_data: 'SelectPersonalSun'},
                ]
            ]
        })
    },

    DaysDefinedOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'ПН', callback_data: 'SelectDefinedMon'},
                    {text: 'ВТ', callback_data: 'SelectDefinedMon'},
                    {text: 'СР', callback_data: 'SelectDefinedMon'},
                    {text: 'ЧТ', callback_data: 'SelectDefinedMon'},
                    {text: 'ПТ', callback_data: 'SelectDefinedMon'},
                    {text: 'СБ', callback_data: 'SelectDefinedMon'},
                    {text: 'ВС', callback_data: 'SelectDefinedMon'},
                ]
            ]
        })
    },
}

