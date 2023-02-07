import './SignIn.scss';
import { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';

import { auth, signInWithGoogle } from '../../Firebase/Firebase';

const SignIn = () => {
    
    // const [state, setState] = useState({
    //     'email': '',
    //     'password': ''
    // })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error)
        }
        
        // setState({
        //     'email':'',
        //     'password':''
        // })
    }


    // const handleChange = e => {

    //     // const [name, value] = e.target;
    //     // setState({[name]: value})
        
    //     setState({[e.target.name]: e.target.value})
    // }
    return ( 
        <div className='signin'>
            <h2 className='title'>I already have an account</h2>
            <p>Sign in with your email and password</p>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    id='email' 
                    type='email' 
                    name='email' 
                    label= 'email'
                    value={email} 
                    handleChange={(e) => {setEmail(e.target.value)}} 
                    required 
                />

                <FormInput 
                    type='password' 
                    name='password' 
                    id='password' 
                    label='password'
                    value={password} 
                    handleChange={(e) => {setPassword(e.target.value)}} 
                    required 
                />

                <div className='buttons'>
                    <CustomButton type='submit'> Sign In </CustomButton>
                    <CustomButton onClick={ signInWithGoogle } isGoogleSignIn> Sign in with Google</CustomButton>
                </div>
                
            </form>
        </div>
     );
}
 
export default SignIn;