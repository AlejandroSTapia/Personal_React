import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NameList from './components/NameList';
import DetailsCard from './components/DetailsCard';
import type { personal } from './types/personal';

function App() {
 const [people, setPeople] = useState<personal[]>([])
  const [selected, setSelected] = useState<personal | null>(null)
  const [search, setSearch] = useState('')


  useEffect(() => {
    fetch('/Personal_React/data.csv')
      .then(res => res.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            const raw = result.data as any[] // OJO: raw es de tipo any[]

            const mapped: personal[] = raw
              .filter(p => p["Nombre completo"]) // ignorar filas vacías
              .map((p, index) => ({
                id: String(index + 1),
                fullName: p["Nombre completo"],
                age: p["Edad"],
                gender: p["Sexo"],
                occupation: p["Ocupación"],
                levelOfEducation: p["Nivel de estudios"],
              }))

            setPeople(mapped.slice(0, 50))
          },
        })
      })
  }, [])

  const filtered = people.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase())
  )

  const handleClose = () => setSelected(null)

  

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Directorio</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

     <div className="d-flex justify-content-center">
        <div className="col-md-12">
          <NameList people={filtered} onSelect={setSelected} isCentered={true} />
        </div>
      </div>

      {/* Modal para el detalle */}
      {selected && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={handleClose}  // clic afuera cierra modal
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={e => e.stopPropagation()} // evitar cerrar modal si clic dentro
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles de {selected.fullName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <DetailsCard person={selected} />
              </div>
            </div>
          </div>
        </div>
      )}
  </div>
  )
}

export default App
