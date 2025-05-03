// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/">Home</Link>
//         <Link to="/library">Library</Link>
//       </div>
      
//       <div className="navbar-right">
//         {user ? (
//           <>
//             <span>Welcome, {user.username}</span>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
      </div>
      
      <div className="navbar-right">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout} className="btn btn-sm btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;