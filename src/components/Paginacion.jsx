import {useEffect, useState} from 'react';
import ProcessAdder from "./ProcessAdder.jsx";
import {Paginacion} from "../algoritmo/paginacion.js";


const Pagination = () => {
  const [enabled, setEnabled] = useState(false);
  const [processes, setProcesses] = useState([])
  const [frames, setFrames] = useState(new Array(10).fill(null));
  const [waitingQueue, setWaitingQueue] = useState([]);

  useEffect(() => {
    if (enabled) {
      const paginacion = new Paginacion(processes, 16, setFrames, setWaitingQueue);

      processes.forEach(async process => {
        await paginacion.addProcessToMemory(process);
      });
    }
  }, [enabled, processes]);
  const handleEnable = () => {
    setEnabled(prevState => !prevState);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ProcessAdder setProcesses={setProcesses} />
        {processes.length > 0 ? (
          <div>
            <h2>Procesos</h2>
            <table className="process-table">
              <thead>
              <tr>
                <th>Proceso</th>
                <th>Tamaño</th>
              </tr>
              </thead>
              <tbody>
              {processes.map((process) => (
                <tr
                  key={process.name}
                  style={{ backgroundColor: process.color}}
                >
                  <td>{process.name}</td>
                  <td>{process.size}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div>
          <h2>Página</h2>
          <table className="frames-table">
            <thead>
            <tr>
              <th>Marco</th>
              <th>Proceso</th>
            </tr>
            </thead>
            <tbody>
            {frames?.map((frame, index) => (
              <tr key={index} style={{backgroundColor: frame?.backgroundColor}}>
                <td>{index}</td>
                <td>{frame ? frame.processName : 'Empty'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Procesos en espera</h2>
          <table className="waiting-queue-table">
            <thead>
            <tr>
              <th>Posición</th>
              <th>Nombre del proceso</th>
            </tr>
            </thead>
            <tbody>
            {waitingQueue.map((process, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{process.name}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>



      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2 style={{
          textAlign: "center"
        }}>Algoritmo de paginacion de memoria</h2>
        <button onClick={handleEnable} style={{
          display: enabled ? 'none' : 'block'
        }}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Pagination;