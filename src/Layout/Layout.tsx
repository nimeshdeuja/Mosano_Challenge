import './layout.css';

type Props = {
    children: JSX.Element
};

const Layout = ({children}: Props) => {
    
  return <div className="container">
      <div className='header'>Mosano - <span>Frontend Developer - Code Challenge</span></div>
    <div className='body'>{children}</div>
    <div className='footer'>
        by Nimesh Deuja
    </div>
  </div>;
};

export default Layout;
