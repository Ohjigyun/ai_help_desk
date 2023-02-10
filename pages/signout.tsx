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
                console.log('signout is success')
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return(
        <div>
            <Image className={styles.latte} src={Latte} alt='dog image' />
            <div>로그인 된 상태입니다. 로그아웃 하시겠습니까?</div>
            <button onClick={navigateHome}>홈으로</button>
            <button onClick={signoutHandler}>로그아웃</button>
        </div>
    )
}