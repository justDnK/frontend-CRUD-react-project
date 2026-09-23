import React, {useState} from "react"
import TextPole from "./components/TextPole";
import NumberPole from "./components/NumberPole";
import SimpleButton from "./components/SimpleButton";
import PageLine from "./components/PageLine";
import "./styles.css";

const App = () => {

  const [id, setId] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  let responseText = "";

  const createUserFunction = async () => {
    const response = await fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        age: age,
        position: position,
        salary: salary
      })
    });

    if(response.status == 200) {
      responseText = "New user was created !";
      resultPrint(responseText);
    }

    setName("")
    setAge("")
    setPosition("")
    setSalary("")


  }

  function resultPrint(responseText) {
    const resultText = document.getElementById("server-ans");
    resultText.textContent = responseText;

    setTimeout(() => {
      resultText.textContent = "";
    }, 5000);
  }

  const showInfoFunction = async () => {
    const response = await fetch("http://localhost:8080/show");
    const data = await response.json();

    document.getElementById("info-text").textContent = JSON.stringify(data, null, 2);
  } 

  return(
    <div className="container">
      <div className="header">
        <p>My CRUD Application</p>
      </div>

      <div className="block-create">
        <div className="title"><p>1. Create.</p></div>

        <div className="form">
          <TextPole
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"name.."}
          className="form-element"
          />

          <NumberPole 
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder={"age.."}
          className="form-element"
          />

          <TextPole 
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder={"position.."}
          className="form-element"
          />

          <NumberPole 
          value={salary}
          onChange={(e)=>setSalary(e.target.value)}
          placeholder={"salary.."}
          className="form-element"
          />

          <SimpleButton 
          text="okay" 
          className="form-element"
          onClick={createUserFunction}
          />

        </div>

        <div className="server-ans">
          <p id="server-ans"></p>
        </div>
      </div>

      <PageLine/>

      <div className="block-get">

        <div className="title"><p>2. Get</p></div>

        <div className="user-ans">
          <p>Show information about all users ?</p>
          <SimpleButton
            text="okay"
            className=""
            onClick={showInfoFunction}
          />
        </div>

        <div className="info">
          <p id="info-text"></p>
        </div>
      </div>

      <PageLine />

      <div className="block-update">

      </div>
    </div>
  )
}

export default App