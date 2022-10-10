import { ProgressSpinner } from 'primereact/progressspinner';

interface LoadingProps {
  text: string
}

const Loading = ({ text }: LoadingProps) => (
  <div className="text-center">
    <ProgressSpinner style={{ width: '2rem', height: '2rem' }} /> {text || 'Loading'}...
  </div>
);

export default Loading;
