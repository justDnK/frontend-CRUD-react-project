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

  const updateUserData = async () => {
    const response = await fetch("http://localhost:8080/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        name: name,
        age: age,
        position: position,
        salary: salary
      })
    });

    if(response.status === 200) {
      changeClassNameForm();
    } else {
      changeClassNameTextResult();
    }

    setId("")
    setName("")
    setAge("")
    setPosition("")
    setSalary("")
  }

  const deleteUser = async () => {
    const response = await fetch(`http://localhost:8080/delete/${id}`, {
      method: "DELETE"
    });

    if(response.ok) {
      showDeleteResult();
    }

    setId("");
  }

  function showDeleteResult() {
    const result = document.getElementById("result-delete");
    result.textContent = "user was deleted !";
  }

  const [active, setActive] = useState(false);
  const[activeText, setActiveText] = useState(false);

  function changeClassNameForm() {
    setActive(!active);
  }

  function changeClassNameTextResult() {
    setActiveText(!activeText);
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

        <pre className="info">
          <p id="info-text"></p>
        </pre>
      </div>

      <PageLine />

      <div className="block-update">
        <div className="title"><p>3. Update</p></div>

        
        <div className="form">
          <p>write id of user which you want delete: </p>

          <NumberPole 
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder={"id.."}
          className="form-element"
          />


          <div className={active ? "active-form-block-update" : "inactive-form-block-update"}>
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

          </div>

          <SimpleButton 
          text="okay" 
          onClick={updateUserData}
          />

        </div>

        <div className="ghost-block" id="ghost">
            <p className={activeText ? "inactive-text-result" : "active-text-result"}>error: user does not exist !!!</p>
        </div>
      </div>

      <PageLine />

      <div className="block-delete">
        <div className="title"><p>4. Delete</p></div>

        <div className="id-delete">
          <p>Write name of user which you want delete.</p>

          <NumberPole
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="id.."
          className={"form-element"}
          id="id-to-delete"
          />

          <SimpleButton 
          text="okay"
          onClick={deleteUser}
          />

          <h1 id="result-delete"></h1>
        </div>
      </div>
    </div>
  )
}

export default App