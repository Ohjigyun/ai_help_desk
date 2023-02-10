import { signOut } from 'firebase/auth'
import { auth } from './api/firebase'
import { useRouter } from 'next/router'
import styles from '../styles/Signout.module.css'
import Image from 'next/image'
import Latte from '../assets/images/latte.jpg'

export default function Logout() {
    const router = useRouter()

    const navigateHome = () => {
        router.push('/')
    }

    const signoutHandler = () => {
        signOut(auth)
            .then(() => {
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return(
        <div className={styles.container}>
            <Image className={styles.latte} src={Latte} alt='dog image' />
            <div className={styles.Box}>
                <div className={styles.stateText}>로그인 된 상태입니다.</div>
                <div className={styles.questionText}>로그아웃 하시겠습니까?</div>
                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={navigateHome}>홈으로</button>
                    <button className={styles.button} onClick={signoutHandler}>로그아웃</button>
                </div>
            </div>
        </div>
    )
}