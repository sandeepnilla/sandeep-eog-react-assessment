import WeatherSagas from "./Weather";
import DroneSagas from "./DroneData";
import ApiErrors from "./ApiErrors";

export default [...ApiErrors, ...WeatherSagas, ...DroneSagas];
