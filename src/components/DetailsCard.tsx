import type { personal } from "../types/personal";

const DetailsCard = ({ person }: { person: personal }) => (
  <div className="card shadow rounded-4">
    <div className="card-body">
      <h4 className="card-title text-center mb-3 text-primary fw-bold">
        {person.fullName}
      </h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Edad:</strong> {person.age}
        </li>
        <li className="list-group-item">
          <strong>Sexo:</strong> {person.gender === 'M' ? 'Masculino' : 'Femenino'}
        </li>
        <li className="list-group-item">
          <strong>Ocupación:</strong> {person.occupation}
        </li>
        <li className="list-group-item">
          <strong>Nivel de estudios:</strong> {person.levelOfEducation}
        </li>
      </ul>
    </div>
  </div>
)


export default DetailsCard