
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';



const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext)
  const navigate = useNavigate(); 

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;












const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users'); // Replace '/api/user' with your API endpoint URL
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }
console.log('shihab',userData)
console.log('shihab',userData?.role)



{userData.role === 'admin' && (
    <>
      <li>
        <NavLink to="/dashboard/adminhome">
          <FaHome></FaHome> Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageuser">
          <FaUserCog></FaUserCog> Manage User
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageclass">
          <FaCog></FaCog> Manage Class
        </NavLink>
      </li>
    </>
  )}

  {userData.role === 'instructor' && (
    <>
      <li>
        <NavLink to="/dashboard/selectedclasses">
          <FaUsers></FaUsers> All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addclass">
          <FaPlusCircle></FaPlusCircle> Add Class
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myclass">
          <FaPlusCircle></FaPlusCircle> My Class
        </NavLink>
      </li>
    </>
  )}

  {userData.role !== 'admin' && userData.role !== 'instructor' && (
    <>
      <li>
        <NavLink to="/dashboard/payment">
          <FaCreditCard></FaCreditCard> Payment
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myenrolled">
          <FaCreditCard></FaCreditCard> myenrolled
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/paymenthistory">
          <FaCreditCard></FaCreditCard> history
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/mycart">
          <FaShoppingCart></FaShoppingCart> My Cart
        </NavLink>
      </li>
    </>
  )}
      



















// /////////////////////////////////








  {isAdmin && (
    <>
      <li>
        <NavLink to="/dashboard/adminhome">
          <FaHome></FaHome> Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageuser">
          <FaUserCog></FaUserCog> Manage User
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageclass">
          <FaCog></FaCog> Manage Class
        </NavLink>
      </li>
    </>
  )}
  
  {isInstructor && (
    <>
     
      <li>
        <NavLink to="/dashboard/addclass">
          <FaPlusCircle></FaPlusCircle> Add Class
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myclass">
          <FaPlusCircle></FaPlusCircle> My Class
        </NavLink>
      </li>
    </>
  )}
  
  {!isAdmin &&  !isInstructor && (
    <>
      <li>
        <NavLink to="/dashboard/payment">
          <FaCreditCard></FaCreditCard> Payment
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myenrolled">
          <FaCreditCard></FaCreditCard> myenrolled
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/paymenthistory">
          <FaCreditCard></FaCreditCard> history
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/mycart">
          <FaShoppingCart></FaShoppingCart> My Cart
        </NavLink>
      </li>
    </>
  )}
  
