import React from "react";

const axios = {
  post: (url, body) => Promise.resolve({ data: { access_token: "123token" } }),
  get: (url, config) => Promise.resolve({
    data: {
      animals: Array.from(Array(100)).map((a, i) => {
        return {
          id: i,
          type: ["cat", "dog"][Math.floor(Math.random() * 2)],
          gender: ["male", "female"][Math.floor(Math.random() * 2)],
          age: Math.floor(Math.random() * 20),
        };
      }),
    },
  }),
};

export const CustomContext = React.createContext();

const useCustomHook = () => {
  const [token, setToken] = React.useState("");
  const [animals, setAnimals] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("/api/token", { credentials: "xyz" })
      .then((response) => setToken(response.data.access_token));
  }, []);

  const getAnimals = (type, gender, age) => {
    return axios
      .get(`/api/animals?type=${type}&gender=${gender}&age=${age}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAnimals(
          response.data.animals.filter(
            (a) => a.type === type && a.gender === gender && a.age <= age
          )
        );
      });
  };

  return {
    token,
    animals,
    getAnimals
  };
};

export const CustomProvider = (props) => {
  const value = useCustomHook();
  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
