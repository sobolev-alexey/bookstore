import { Link } from 'react-router-dom';
import logo from '../../assets/header/logo.svg';

const Footer = () => {
  return (
    <footer className='footer-wrapper'>
      <div className='footer-content'>
        <Link to='/'>
          <img src={logo} alt='Crypto Exchange Directory' className='logo' />
        </Link>
        <div className='copyright'>
          <a href='https://lexer.dev' target='_blank' rel='noopener noreferrer' className='personal'>
            © Alexey Sobolev 🇺🇦 (https://lexer.dev)
          </a>
          <span>
            Design by
            <a
              href='https://www.bookdepository.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              &nbsp;The Book Depository
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
