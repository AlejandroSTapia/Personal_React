import type { personal } from "../types/personal";

const DetailsCard = ({ person }: { person: personal }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{person.fullName}</h5>
      <p>Edad: {person.age}</p>
      <p>Sexo: {person.gender}</p>
      <p>Ocupación: {person.occupation}</p>
      <p>Nivel de estudios: {person.levelOfEducation}</p>
    </div>
  </div>
)

export default DetailsCard