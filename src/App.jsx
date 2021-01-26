import React from "react";
import { CustomContext } from "./CustomProvider";

export const App = () => {
  const contextValue = React.useContext(CustomContext);

  const [formData, setFormData] = React.useState({
    type: "dog",
    gender: "female",
    age: 10,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    contextValue
      .getAnimals(formData.type, formData.gender, formData.age)
      .then(() => {
        // do other stuff like go to next page
      });
  };

  return (
    <div>
      <p>Token: {contextValue.token}</p>
      <form onSubmit={handleSubmit}>
        {/* inputs */}
        <button type="submit">GET</button>
      </form>
      <div>
        Animals:
        <ul>
          {contextValue.animals.map((a, i) => (
            <li key={i}>{JSON.stringify(a)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
