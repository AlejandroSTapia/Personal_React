import type { personal } from "../types/personal";

interface Props {
  people: personal[]
  onSelect: (personal: personal) => void
}

const NameList = ({ people, onSelect }: Props) => {
  const half = Math.ceil(people.length / 2)
  const col1 = people.slice(0, half)
  const col2 = people.slice(half)

  const renderList = (list: personal[]) =>
    list.map((p, idx) => (
      <p
        key={idx}
        className="text-primary cursor-pointer"
        onClick={() => onSelect(p)}
        style={{ cursor: 'pointer' }}
      >
        {p.fullName}
      </p>
    ))

  return (
    <div className="col-md-6 d-flex">
      <div className="flex-fill">{renderList(col1)}</div>
      <div className="flex-fill">{renderList(col2)}</div>
    </div>
  )
}

export default NameList
