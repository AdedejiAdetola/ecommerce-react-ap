import SignIn from '../../Components/SignIn/SignIn';
import SignUp from '../../Components/SignUp/SignUp';
import './SignInSignUp.scss';

const SignInSignUp = () => {
    return ( 
        <div className='signin-signup'>
            <SignIn />
            <SignUp />
        </div>
     );
}
 
export default SignInSignUp;