import logo from './logo.svg';
import './App.css';
import Login from './login';
import Signup from './Signup';
import UserPortal from './userportal';
import AdminPortal from './adminportal';
import { BrowserRouter as Router, Route,Redirect,Routes } from 'react-router-dom';
import AddProductForm from './addproduct_form';
import GenerateLicenseForm from './generatelicense';
import ActivatedLicenses from './activated_licenses';
import ActivateLicense from './ActivateLicense';
const App = () => {
  return (
   <body>
    
   <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userportal" element={<UserPortal />} />
        <Route path="/adminportal" element={<AdminPortal />} />
        <Route path="*" element={<Login />} />
        
        <Route path='/addproduct' element={<AddProductForm/>}/>
        <Route path='generatelicense' element={<GenerateLicenseForm/>}/>
        <Route path='userlicense' element={<ActivatedLicenses/>}/>
        <Route path='activatelicense' element={<ActivateLicense/>}/>
      </Routes>
    </Router>
    </body>
  );
};
export default App;
