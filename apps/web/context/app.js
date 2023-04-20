import { createContext } from "react";

const AppContext = createContext({ isModalOpen: false, budget: 0 });
export default AppContext;
