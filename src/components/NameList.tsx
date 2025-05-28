import type { personal } from "../types/personal"



interface Props {
  people: personal[]
  onSelect: (personal: personal) => void
  isCentered?: boolean 
}

const NameList = ({ people, onSelect, isCentered }: Props) => {
  const half = Math.ceil(people.length / 2)
  const col1 = people.slice(0, half)
  const col2 = people.slice(half)

 const renderList = (list: personal[], indexOffset = 0) => (
  <div className="list-group">
    {list.map((p, idx) => (
      <div
        key={idx}
        className="d-flex align-items-stretch mb-2"
      >
        {/* Número alineado verticalmente */}
        <div
          className="text-muted fw-bold me-2 d-flex align-items-center justify-content-end"
          style={{ width: '30px', flexShrink: 0 }}
        >
          {indexOffset + idx + 1}.
        </div>

        {/* Botón de nombre */}
        <button
          className="card shadow-sm hover-shadow-sm rounded-3 w-100 text-start p-2"
          onClick={() => onSelect(p)}
        >
          {p.fullName}
        </button>
      </div>
    ))}
  </div>
);


  return (
    <div className={`d-flex gap-4 ${isCentered ? 'justify-content-center' : 'justify-content-start'}`}>
    <div className="flex-fill">{renderList(col1, 0)}</div>
    <div className="flex-fill">{renderList(col2, col1.length)}</div>
  </div>
  )
}
export default NameList
