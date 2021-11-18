import { createContext } from "react";

const Context = createContext({
  notification: {},
  addNotification: () => "",
  removeNotification: () => null,
});

export const Provider = Context.Provider;
export const Consumer = Context.Consumer;
export default Context;
