type IconProps = {
  url: string;
  className?: string;
};

export default function Icon({ url, className }: IconProps) {
  return (
    <div
      className={`icon ${className}`}
      style={{ maskImage: `url(${url})`, WebkitMaskImage: `url(${url})` }}
    >
      <div className="blend"></div>
      <img src={url}></img>
    </div>
  );
}
