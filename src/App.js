import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  Card,
  Avatar,
  Col,
  Row,
  Checkbox,
  Button,
  Modal,
  Input,
  Alert,
  DatePicker,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEditVisable, setIsModalEditVisabl] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [date, setDate] = useState(new Date());

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log(isModalVisible);
    setIsModalVisible(false);
  };

  const addNewTask = () => {
    let id = uuidv4();
    let checked = false;
    let name = newTask;
    console.log("....", newTask);
    tasks.push({
      id,
      checked,
      name,
      date,
    });
    setTasks(tasks);
    console.log(tasks);
    setIsModalVisible(false);
  };

  const onChange = (id, value) => {
    let task = tasks.find((t) => t.id === id);
    let newTasks = tasks.filter((t) => t.id !== id);
    task.check = value;
    newTasks.push(task);
    setTasks(newTasks);
    
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskToEdit(taskToEdit);
    setIsModalEditVisabl(true);
  };

  const verify_input_empty = (name) => {
     if (name == "") {
      setValidInput(false)
     } else {
      setValidInput(false);
     }
  }

  

  const onOkModalEdit = () => {
    console.log(taskToEdit);
    //onst modifyTasks = tasks.find((task) => task.id !== taskToEdit.id);
    //modifyTasks.push(taskToEdit);

    setTasks(tasks.map((t) => (t.id !== taskToEdit.id ? t : taskToEdit)));
    setIsModalEditVisabl(false);
  };

  

  const deleteTask = (id) => {
    console.log("delete", id.getDate());
    const newArrayTask = tasks.filter((task) => task.id !== id);
    setTasks(newArrayTask);
  };
  let task_checked = tasks.filter((task) =>  task.check);
  let task_unchecked = tasks.filter((task)  => !task.check);

  const task_checked_array = task_unchecked.map((task) => {
    return (
      <>
        <div key={task.id}>
          <p style={{ marginBottom: "20px" }}>
            <Checkbox
              checked={task.check}
              onChange={(e) => onChange(task.id, e.target.checked)}
            >
              {task.name}
            </Checkbox>
          </p>
          <DatePicker defaultValue={moment(task.date, "YYYY-MM-DD")} />
          <Button
            style={{ margin: "0 10px" }}
            type="primary"
            size="small"
            onClick={() => editTask(task.id)}
          >
            editar
          </Button>
          <Button
            style={{ margin: "0 10px" }}
            type="primary"
            size="small"
            onClick={() => deleteTask(task.id)}
          >
            borrar
          </Button>
        </div>
      </>
    );
  });

  const task_unchecked_array = task_checked.map((task) => {
    return (
      <>
        <div key={task.id}>
          <p style={{ marginBottom: "20px" }}>
            <Checkbox
              checked={task.check}
              onChange={(e) => onChange(task.id, e.target.checked)}
            >
              {task.name}
            </Checkbox>
          </p>
          <DatePicker defaultValue={moment(task.date, "YYYY-MM-DD")} />
          <Button
            style={{ margin: "0 10px" }}
            type="primary"
            size="small"
            onClick={() => editTask(task.id)}
          >
            editar
          </Button>
          <Button
            style={{ margin: "0 10px" }}
            type="primary"
            size="small"
            onClick={() => deleteTask(task.id)}
          >
            delete
          </Button>
        </div>
      </>
    );
  });
  return (
    <>
      <p>Tareas Hechas</p>
      {task_checked_array}
      <p>Tareas por Hacer</p>
      {task_unchecked_array}
      <Button
        style={{ margin: "0 10px" }}
        type="primary"
        size="small"
        onClick={showModal}
      >
        create new task
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={addNewTask}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        Tarea
        <Input
          placeholder="new task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        Fecha
        <DatePicker onChange={(date) => setDate(date)} />
      </Modal>
      <Modal
        title="Basic Modal"
        visible={isModalEditVisable}
        onOk={onOkModalEdit}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Input
          placeholder="new task"
          onChange={(e) =>
            setTaskToEdit({
              ...taskToEdit,
              name: e.target.value,
            })
          }
          value={taskToEdit.name}
        />

        <DatePicker
          onChange={(e) =>
            setTaskToEdit({
              ...taskToEdit,
              date: e,
            })
          }
        />
      </Modal>
    </>
  );
}

export default App;
