function Service({ src, title, caption }) {
  return (
    <div className="gap-x-5 flex items-center px-5">
      <img loading="lazy" className="w-16" src={src} alt={title} />
      <div className="flex flex-col gap-y-3">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-sm">{caption}</p>
      </div>
    </div>
  );
}

export default Service;
