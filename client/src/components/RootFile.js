import { useEffect, useState } from "react";
import Form from "./form"
import Card from "./Card"
import axios from "axios";
import {
  useNavigate
  } from "react-router-dom";
  
const RootFile = (props) => {
    let navigate = useNavigate();

  const [task, setTasks] = useState([]);
  const [dataSent, setDataSent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const getAllTasks=()=>{
    axios({
      method: "get",
      url: "http://localhost:8000/",
    })
      .then(function (response) {
          console.log("response==>",response)
          setTasks(response?.data?.message)
          navigate('/')
      }).catch((error)=>{
          console.log("error ===> ",error)
      }) 

      
  }

  const formDataHandler =async (title, body, date) => {
  const formData={title: title,body: body,date: date}
  console.log("Sending post request with this data ===>",formData)
    axios({
        method: "post",
        url: "http://localhost:8000/",
        data: {
         formData
        },
      })
        .then(function (response) {
            console.log("response==>",response)
            setDataSent(new Date())
            navigate('/')
        }).catch((error)=>{
            console.log("error ===> ",error)
        })

  };
  const showNewTask = () => {
    setShowForm(!showForm);
  };
  const addTasks = (
    <Form
      showForm={showForm}
      setShowForm={setShowForm}
      onChangeFormHandler={formDataHandler}
    ></Form>
  );

  useEffect(()=>{
    getAllTasks()
  },[dataSent])

  

  return (
    <div>
      <h1 className="m-5 text-center">ToDo Application 📝</h1>
      <div className="container ">
        <div className="new-expense">
          {showForm ? (
            addTasks
          ) : (
            <button onClick={showNewTask}>Add Tasks</button>
          )}
        </div>
        <h1 className="m-5 text-center">Current Tasks 🏃</h1>
        <div className="expenses">
          {task?.length && <Card tasks={task} setDataSent={setDataSent}></Card>}
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary btn-lg m-2"
            type="submit "
            onClick={() => {
              navigate("/completed");
            }}
          >
            Show me Completed Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default RootFile;
