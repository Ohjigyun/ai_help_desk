import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from './api/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'

import styles from '../styles/Signup.module.css'

export default function Signup() {
    const router = useRouter()
    
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                router.push('/')
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }

    const googleLogin = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(user)
            router.push('/')
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(error)
            });
    }

    const githubLogin = () => {
        const provider = new GithubAuthProvider()

        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
      
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log(user)
          router.push('/')
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
        });
    }

    useEffect(() => {
        const user = auth.currentUser
        console.log(user)

        if(user) {
            router.push('/signout')
            return;
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <div className={styles.header}>회원 가입</div>
                <form onSubmit={submitHandler}>
                    <div className={styles.emailBox}>
                        <div>이메일</div>
                        <input
                            className={styles.email}
                            type='text'
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.passwordBox}>
                        <div>비밀번호</div>
                        <input
                            className={styles.password}
                            type='password'
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonBox}>
                        <button className={styles.signupButton}>제출</button>
                    </div>
                </form>
                <div className={styles.line}><span className={styles.lineText}> OR </span></div>
                <div className={styles.socialBox}>
                    <FontAwesomeIcon className={styles.faGoogle} icon={faGoogle} size='2x' onClick={googleLogin}/>
                    <FontAwesomeIcon className={styles.faGithub} icon={faGithub} size='2x' onClick={githubLogin}/>
                </div>
            </div>
        </div>
    )
}