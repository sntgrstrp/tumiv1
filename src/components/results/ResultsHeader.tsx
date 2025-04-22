
interface ResultsHeaderProps {
  title: string;
  description: string;
}

const ResultsHeader = ({ title, description }: ResultsHeaderProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="ubike-gradient">{title}</span>
      </h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default ResultsHeader;
