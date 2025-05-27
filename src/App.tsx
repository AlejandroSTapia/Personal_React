import { useEffect, useState } from 'react'
import Papa from 'papaparse'
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

     {!selected ? (
      <div className="d-flex justify-content-center">
        <div className="col-md-12">
          <NameList people={filtered} onSelect={setSelected} isCentered={true} />
        </div>
      </div>
    ) : (
      <div className="row">
        <div className="col-md-6">
          <NameList people={filtered} onSelect={setSelected} isCentered={false} />
        </div>
        <div className="col-md-6">
          <DetailsCard person={selected} />
        </div>
      </div>
    )}
  </div>
  )
}

export default App
