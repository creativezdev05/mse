import Image from "next/image";

const smokePuffs = ["a", "b", "c"] as const;

export function FooterMachines() {
  return (
    <div className="footer-machines" aria-hidden="true">
      <div className="footer-truck">
        <Image
          src="/images/yard/mixer-truck.png"
          alt=""
          width={1077}
          height={444}
          sizes="14rem"
          className="footer-machine-photo"
        />
        <span className="footer-smoke">
          {smokePuffs.map((puff) => (
            <span key={puff} />
          ))}
        </span>
      </div>
      <div className="footer-crane-set">
        <Image
          src="/images/yard/stone-heap.png"
          alt=""
          width={1161}
          height={309}
          sizes="9rem"
          className="footer-stone-heap"
        />
        <div className="footer-crane">
          <Image
            src="/images/yard/crawler.png"
            alt=""
            width={941}
            height={647}
            sizes="11rem"
            className="footer-machine-photo footer-crane-body"
          />
          <Image
            src="/images/yard/crawler.png"
            alt=""
            width={941}
            height={647}
            sizes="11rem"
            className="footer-machine-photo footer-crane-shovel"
          />
        </div>
      </div>
    </div>
  );
}
