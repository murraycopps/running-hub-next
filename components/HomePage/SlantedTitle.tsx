const SlantedTitle = ({ title }: { title: string }) => (
  <div className="relative flex flex-col items-center justify-center w-full min-h-16 py-4 text-white slanted bg-ronchi-600">
    <h2 className="relative z-10 h-10 text-4xl font-bold">{title}</h2>
  </div>
);

export default SlantedTitle;
