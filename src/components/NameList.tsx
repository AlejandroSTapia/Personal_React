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
        className="d-flex align-items-center mb-2"
      >
        {}
        <div className="text-end text-muted fw-bold me-2" style={{ width: '30px' }}>
          {indexOffset + idx + 1}.
        </div>

        {/* Botón con nombre */}
        <button
          className="card mb-2 shadow-sm hover-shadow-sm list-group-item-action flex-fill text-start"
          onClick={() => onSelect(p)}
        >
          <div className="card-body py-2 px-3">
          {p.fullName}
           </div>
        </button>
      </div>
    ))}
  </div>
)


  return (
    <div className={`d-flex gap-4 ${isCentered ? 'justify-content-center' : 'justify-content-start'}`}>
    <div className="flex-fill">{renderList(col1, 0)}</div>
    <div className="flex-fill">{renderList(col2, col1.length)}</div>
  </div>
  )
}
export default NameList
