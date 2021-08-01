"use strict";

let logout = new LogoutButton();
logout.action = function () {
    ApiConnector.logout(response => {
        console.log(response);
        if (response.success) {
            location.reload();
        }
    });
};


ApiConnector.current(response => {
    if (response.success) {
        console.log(response);
        ProfileWidget.showProfile(response.data);
    }
});


let board = new RatesBoard();
board.table = function () {
    ApiConnector.getStocks(response => {
        if (response.success) {
            board.clearTable();
            board.fillTable(response.data);
            console.log(response);
        }
    });
};
setInterval(board.table(), 60000);


let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            
        }
        response.success ? moneyManager.setMessage(true, "Получилось, Ваш счет пополнен!") : moneyManager.setMessage(false , 'Невозможно выполнить отрицательный перевод.');
    });
};

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
        }
            response.success ? moneyManager.setMessage(true, "Конвертация прошла успешно!") : moneyManager.setMessage(false, 'Невозможно конвертировать данные значения.');
        
    });
};

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
        }
            response.success ? moneyManager.setMessage(true, "Получилось, деньги переведены!") : moneyManager.setMessage(false, 'Невозможно перевести отрицательную сумму.');
        
    });
};


let favs = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        console.log(response);
        favs.clearTable();
        favs.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favs.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favs.clearTable();
            favs.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
            response.success ? moneyManager.setMessage(true, "Получилось, пользователь добавлен в список избранных!") : moneyManager.setMessage(false, 'Не получилось, такой ID уже существует. Проверьте правильность введенных данных и попробуйте еще раз.');
        
    });
};

favs.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favs.clearTable();
            favs.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
            response.success ? moneyManager.setMessage('isSuccess', "Получилось, пользователь удален из избранного.") : moneyManager.setMessage('', 'Не получилось, проверьте правильность ваших действий и попробуйте еще раз.');
        
    });
};

