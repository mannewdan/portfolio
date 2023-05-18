type IconProps = {
  url: string;
};

export default function Icon({ url }: IconProps) {
  return (
    <div
      className="icon"
      style={{ maskImage: `url(${url})`, WebkitMaskImage: `url(${url})` }}
    >
      <div className="blend"></div>
      <img src={url}></img>
    </div>
  );
}
