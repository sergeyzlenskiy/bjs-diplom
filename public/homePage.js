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
            moneyManager.setMessage('isSuccess', "Получилось!");
        } else {
            moneyManager.setMessage('', 'Не получилось, попробуйте еще раз.');
        }
    });
};

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage('isSuccess', "Получилось!");
        } else {
            moneyManager.setMessage('', 'Не получилось, попробуйте еще раз.');
        }
    });
};

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage('isSuccess', "Получилось!");
        } else {
            moneyManager.setMessage('', 'Не получилось, попробуйте еще раз.');
        }
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
            moneyManager.setMessage('isSuccess', "Получилось, пользователь добавлен в список избранных!");
        } else {
            moneyManager.setMessage('', 'Не получилось, попробуйте еще раз.');
        }
    });
};

favs.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favs.clearTable();
            favs.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage('isSuccess', "Получилось, пользователь удален из избранного.");
        } else {
            moneyManager.setMessage('', 'Не получилось, попробуйте еще раз.');
        }
    });
};

