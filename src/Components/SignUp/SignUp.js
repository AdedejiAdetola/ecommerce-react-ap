import './SignUp.scss';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import { useState } from 'react';
import { auth, createUserProfileDocument } from '../../Firebase/Firebase';

const SignUp = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async e => {

        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            
            //console.log(email);
            await createUserProfileDocument(user, { displayName });
            
            
            setEmail('');
            setDisplayName('');
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            console.error(error);
        }
    }

    return ( 
        
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type='text' 
                    name='displayName'
                    label='Display Name'
                    value={displayName} 
                    handleChange={(e) => {setDisplayName(e.target.value)}} 
                    required 
                />

                <FormInput 
                    type='email' 
                    name='email' 
                    label= 'Email'
                    value={email} 
                    handleChange={(e) => {setEmail(e.target.value)}} 
                    required 
                />

                <FormInput 
                    type='password' 
                    name='password' 
                    label='Password'
                    value={password} 
                    handleChange={(e) => {setPassword(e.target.value)}} 
                    required 
                />

                <FormInput 
                    type='password' 
                    name='confirmPassword' 
                    label='Confirm Password'
                    value={confirmPassword} 
                    handleChange={(e) => {setConfirmPassword(e.target.value)}} 
                    required 
                />

                <CustomButton type='submit'> Sign Up </CustomButton>
            </form>
        </div>
     );
}
 
export default SignUp;