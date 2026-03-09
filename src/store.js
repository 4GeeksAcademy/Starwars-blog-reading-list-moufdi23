export const initialStore = () => {
  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return {
        ...store,
        people: action.payload
      };

    case "set_planets":
      return {
        ...store,
        planets: action.payload
      };

    case "set_vehicles":
      return {
        ...store,
        vehicles: action.payload
      };

    case "add_favorite":
      if (store.favorites.includes(action.payload)) return store;
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter((f) => f !== action.payload)
      };

    default:
      return store;
  }
}

export const actions = (dispatch, getStore) => ({
  fetchPeople: async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/people");
      const data = await response.json();
      dispatch({
        type: "set_people",
        payload: data.results || []
      });
    } catch (error) {
      console.error("fetchPeople error:", error);
      dispatch({ type: "set_people", payload: [] });
    }
  },

  fetchPlanets: async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/planets");
      const data = await response.json();
      dispatch({
        type: "set_planets",
        payload: data.results || []
      });
    } catch (error) {
      console.error("fetchPlanets error:", error);
      dispatch({ type: "set_planets", payload: [] });
    }
  },

  fetchVehicles: async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/vehicles");
      const data = await response.json();
      dispatch({
        type: "set_vehicles",
        payload: data.results || []
      });
    } catch (error) {
      console.error("fetchVehicles error:", error);
      dispatch({ type: "set_vehicles", payload: [] });
    }
  },

  addFavorite: (itemName) => {
    dispatch({ type: "add_favorite", payload: itemName });
  },

  removeFavorite: (itemName) => {
    dispatch({ type: "remove_favorite", payload: itemName });
  }
});


