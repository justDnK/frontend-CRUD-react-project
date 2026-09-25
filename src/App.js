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

  //update method start

  const[activeFormUpdate, setActiveBlockUpdate] = useState(false);
  const[badResultText, setBadResultText] = useState(false);

  const updateUserData = async () => {
    await fetch("http://localhost:8080/update", {
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

    setName("")
    setAge("")
    setPosition("")
    setSalary("")
  }

  const checkUserById = async () => {
    const response = await fetch(`http://localhost:8080/check/${id}`,
      {method: "GET"}
    );

    if(response.status == 200) {
      setActiveBlockUpdate(true);
    } else {setBadResultText(true);}
  }

  // update method end

  const deleteUser = async () => {
    const response = await fetch(`http://localhost:8080/delete/${id}`, {
      method: "DELETE"
    });

    setId("");
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
          <p className={activeFormUpdate ? "none-block" : "text-update-block"}>write id of user which you want delete: </p>

          <NumberPole 
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder={"id.."}
          className={activeFormUpdate ? "none-block" : "existing-block"}
          />


          <div className={activeFormUpdate ? "ghost-block" : "none-block"}>
              <p className="text-update-block">User was finded ! Write data of user which you want delete:</p>

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
                text={"okay"}
                onClick={updateUserData}
              />

          </div>

          <p className={badResultText ? "text-update-block" : "none-block"}>error: user not finded !</p>

          <SimpleButton 
          text="okay" 
          className={activeFormUpdate ? "none-block" : "existing-block"}
          onClick={checkUserById}
          />

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