import "./App.css";

function App() {
  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("Users added successfully");
          form.reset();
        }
      });
  };

  return (
    <div>
      <h1>Simple Crud</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="enter your name" />
        <br />
        <input type="email" name="email" placeholder="enter your email" />
        <br />
        <input
          type="password"
          name="password"
          placeholder="enter your password"
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
