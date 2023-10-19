import {useState} from "react";
import {Process} from "../algoritmo/proceso.js";


// eslint-disable-next-line react/prop-types
const ProcessAdder = ({setProcesses}) => {
  const [process, setProcess] = useState({
    name: "",
    burstTime: 0,
    time: 0,
    priority: 0,
    size: 0,
  });

  const addPrueba = () => {
    setProcesses((processes) => [...processes, new Process("A", 1, 0, 2)]);
    setProcesses((processes) => [...processes, new Process("B", 8, 4, 1)]);
    setProcesses((processes) => [...processes, new Process("C", 1, 3, 1)]);
    setProcesses((processes) => [...processes, new Process("D", 2, 2, 2)]);
    setProcesses((processes) => [...processes, new Process("E", 2, 1, 3)]);
    setProcesses((processes) => [...processes, new Process("F", 6, 5, 2)]);
    setProcesses((processes) => [...processes, new Process("G", 2, 6, 3)]);
    setProcesses((processes) => [...processes, new Process("H", 4, 6, 3)]);
    setProcesses((processes) => [...processes, new Process("I", 6, 6, 3)]);
    setProcesses((processes) => [...processes, new Process("J", 2, 6, 3)]);
  }

  const addProcess = () => {
    const validation = validateProcess();
    if (!validation) {
      return;
    }
    setProcesses((processes) => [...processes, new Process(process.name, Number(process.burstTime), Number(process.time), Number(process.priority))]);
    setProcess({
      name: "",
      burstTime: 0,
      time: 0,
      priority: 0,
      size: 0,
    });
  }


  const validateProcess = () => {
    if (process.name === "") {
      alert("El nombre del proceso no puede estar vacío");
      return false;
    }
    if (process.size < 0) {
      alert("El tiempo de ráfaga no puede ser negativo");
      return false;
    }
    return true;
  }

  const handleProcess = (e) => {
    setProcess({
      ...process,
      [e.target.name]: e.target.value,
    });
  }

  return (

    <div style={
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }
    }>
      <h1>Añadir procesos</h1>
      <label htmlFor="name">Nombre del proceso</label>
      <input type="text" placeholder="Nombre del proceso..." name="name" onChange={handleProcess} value={process.name}
             style={{
               marginBottom: "1rem",
               padding: "0.5rem 1rem",
               border: "1px solid #ccc",
               borderRadius: "4px",
             }}/>
      <label htmlFor="size">Tamaño del Proceso</label>
      <input type="number" placeholder="Tamaño del proceso..." name="size" onChange={handleProcess}
             value={process.size} min={0} style={{
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}/>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }
      }>
        <button onClick={addProcess} style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "1rem",
        }}>
          Añadir proceso
        </button>
        <button onClick={addPrueba} style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}>
          Pruebas
        </button>
      </div>


    </div>
  );
};

export default ProcessAdder;