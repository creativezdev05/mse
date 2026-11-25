export function BandBlinds() {
  return (
    <div className="band-blinds" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => (
        <span className="band-blind" key={index} />
      ))}
    </div>
  );
}
