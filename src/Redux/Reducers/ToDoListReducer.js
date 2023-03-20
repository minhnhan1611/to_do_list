import { ToDoListDraculaTheme } from "../../JSS_StyledComponent/Themes/ToDoListDraculaTheme"
import { add_task, change_theme, delete_task, done_task, edit_task, rely_task, update_task } from "../Types/ToDoListTypes";
import { arrTheme } from "../../JSS_StyledComponent/Themes/ThemeManager";

const initialState = {
    themeToDoList: ToDoListDraculaTheme,
    taskList: [
        { id: 'task-1', taskName: 'task1', done: true },
        { id: 'task-2', taskName: 'task2', done: false },
        { id: 'task-3', taskName: 'task3', done: true },
        { id: 'task-4', taskName: 'task4', done: false },
    ],
    taskEdit: { id: '-1', taskName: '', done: false }
}

const ToDoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case add_task: {
            if (action.newTask.taskName.trim() === '') {
                alert('Task name is require!');
                return { ...state };
            }
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName ===
                action.newTask.taskName);
            if (index !== -1) {
                alert('Task name already exists!');
                return { ...state };
            }
            taskListUpdate.push(action.newTask);
            state.taskList = taskListUpdate;
            return { ...state };
        }
        case change_theme: {
            let theme = arrTheme.find(theme => theme.id == action.themeId);
            if (theme) {
                state.themeToDoList = { ...theme.theme };
            }
            return { ...state };
        }
        case done_task: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id == action.taskId)
            if (index !== -1) {
                taskListUpdate[index].done = true;
            }
            return { ...state, taskList: taskListUpdate };
        }
        case delete_task: {
            let taskListUpdate = [...state.taskList];
            taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId)
            return { ...state, taskList: taskListUpdate };
        }
        case rely_task: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id == action.taskId)
            if (index !== -1) {
                taskListUpdate[index].done = false;
            }
            return { ...state, taskList: taskListUpdate };
        }
        case edit_task: {

            return { ...state, taskEdit: action.task }
        }
        case update_task: {
            // Chỉnh sữa lại taskName của taskEdit
            state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

            // Tìm trong taskList cập nhập lại taskEdit người dùng Update
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);

            if (index !== -1) {
                taskListUpdate[index] = state.taskEdit;
            }

            state.taskList = taskListUpdate;
            state.taskEdit = { id: '-1', taskName: '', done: false }
            return { ...state }
        }
        default: return { ...state }
    }
}

export default ToDoListReducer;
