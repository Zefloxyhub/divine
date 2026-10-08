import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <p className="footer-name">Divine Park</p>
          <p className="footer-tag mono">people / systems / code</p>
          <p className="footer-ed mono">
            © {profile.year}
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
