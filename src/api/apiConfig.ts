import axios from "axios";
import { POKEMON_API } from "../enviroments.ts";

const instance = axios.create({
  baseURL: POKEMON_API,
});

export default instance;
