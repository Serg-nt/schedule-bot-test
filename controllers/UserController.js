import UserModel from '../models/User.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Не удалось получить данные'});
    }
}

export const addUser = async (req, res) => {
    try {
        const doc = new UserModel({

            fullName: req.body.fullName,
            performance: 1,
            comment: "",
            personalWeekends: [],
            definedWeekends: []
        });

        const user = await doc.save();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Не удалось добавить пользователя'});
    }
}

export const removeUser = async (req, res) => {
    try {
        const user = await UserModel.findOneAndDelete({_id: req.params.id})
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        return res.status(200).json({message: 'Пользователь успешно удален'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Произошла ошибка при удалении пользователя'});
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id
    const updatedUserData = req.body.params;
    console.log('userId', userId)
    console.log('updatedUserData', updatedUserData)

    try {
        const user = await UserModel.findById(userId).exec()

        if (!user) {
            return res.status(404).json({ message: `Пользователь ${userId} не найден` });
        }

        user.fullName = updatedUserData.fullName;
        user.performance = updatedUserData.performance;
        user.comment = updatedUserData.comment;
        user.personalWeekends = updatedUserData.personalWeekends;
        user.definedWeekends = updatedUserData.definedWeekends;

        console.log('user после обновления', user)

        await user.save()
        console.log('user', user)

        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Не удалось изменить пользователя'});
    }
}

export const sortUser = async (req, res) => {
    try {
        const user = await UserModel.find().sort({fullName: req.params.sort})
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Не удалось отсортировать данные'})
    }


}