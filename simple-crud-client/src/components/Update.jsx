import { useLoaderData } from "react-router-dom";

const Update = () => {
  const loadedUser = useLoaderData();
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email);
  };
  return (
    <div>
      <h3>update information of {loadedUser.name}</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          defaultValue={loadedUser?.name}
          id=""
          placeholder="name update"
        />
        <br />
        <input
          type="email"
          name="name"
          id=""
          placeholder="email update"
          defaultValue={loadedUser?.email}
        />
        <br />
        <input type="submit" value="Update" />
        <br />
      </form>
    </div>
  );
};

export default Update;
