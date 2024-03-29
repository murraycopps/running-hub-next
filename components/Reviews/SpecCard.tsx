type CardProps = {
  title: string;

  info: string | number;
};

export default function SpecsCard({ title, info }: CardProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 justify-start">
        <p className="text-lg sm:text-xl font-medium">{title}:</p>
        <p className="text-xl sm:text-2xl font-bold">{info}</p>
      </div>
    </>
  );
}
