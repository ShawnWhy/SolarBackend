//import api from "../api";

import User from "../models/user";
import Task from "../models/task";
import API from "./API";

//set user history
export const setUserHistory = async (req, res) => {
  try {
    const { userId, taskId } = req.body;
    const user = await

    User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    ;
}
catch (error) {
    res.status(500).json({ message: error.message });
}
};
```
//User class
```
class userUtility {
createUSer(id, name, email, password, role) {
    const user = {
        id: id,
        name: name,
        email: email,
        password: password,
        role: role,
    }
    //use api to create user
    return user;
}
    //get user info by id
storeUserHistory() {
        const userHistory = {
            userId: this.id,
            SearchId: this.taskId,
            date: new Date().toISOString(),
        };
        return userHistory;
    }
storeUserMessage() {
        const userMessage = {
            userId: this.id,
            taskId: this.taskId,
            date: new Date().toISOString(),
        };
        return userMessage;
    }
storeUserFavorite() {
        const userFavorite = {
            userId: this.id,
            taskId: this.taskId,
            date: new Date().toISOString(),
        };
        return userFavorite;
    }

}
//Task class
```
class USertask {
  constructor(id, title, description, date, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.status = status;
  }
  //get user info by id
    getUserById(id) {
    return this.users.find((user) => user.id === id);
    }


    //get task by id
  


}
