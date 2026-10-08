import { brand, footer } from '../data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <p className="footer-name">{brand.name}</p>
          <ul className="footer-areas mono">
            {footer.areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p className="footer-ed mono">
            © {brand.year} {brand.name}
            <br />
            <span className="accent">{brand.tagline}</span>
          </p>
          <p className="footer-status mono">
            <span className="pulse" aria-hidden="true" /> System online
          </p>
        </div>
        <div className="footer-base mono">
          <a href="#index">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
