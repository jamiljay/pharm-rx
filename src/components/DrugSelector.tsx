import { Chip } from 'primereact/chip';
import { Dropdown } from 'primereact/dropdown';

interface DrugSelectorProps {
  selected: string[]
  available: string[]
  onAdd: (drug: string) => void
  onRemove: (drug: string) => void
}

const DrugSelector = ({ selected, available, onAdd, onRemove }: DrugSelectorProps) => {
  return (
    <div className='mt-2 mb-3'>
      <Dropdown
        options={available}
        onChange={(e) => onAdd(e.value)}
        placeholder="Select a Drug"
        virtualScrollerOptions={{ itemSize: 38 }} />
      <div className='mt-3'>
        {selected.map((drug) => (
          <Chip
            removable
            key={drug}
            label={drug}
            className="mr-1 mb-1"
            onRemove={() => onRemove(drug)} />
        ))}
      </div>
    </div>
  );
}

export default DrugSelector;
