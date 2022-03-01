import { Link } from 'react-router-dom';
import { getLoginState } from '../login/loginSlice';

export const Message = () => {
    return (
        <div>
            <h2> This is Message page.</h2>
            <Link to='/counter'> Counter Page </Link>
            <Link to='/'> Home Page </Link>
            <Link to='/login'> Login Page </Link>
        </div>
    )
}