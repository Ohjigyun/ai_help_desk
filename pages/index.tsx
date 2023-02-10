import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { auth } from './api/firebase'
import SpeechBox from '../components/SpeechBox'
import robot from '../assets/images/vecteezy_robot.png'
import balloon from '../assets/images/speech_bubble.png'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string>('')
  const welcomeMessage = `${currentUser ? `${currentUser}님 ` : ''}안녕하세요? \n 저는 헬프봇입니다.\n 원하시는 메뉴를 말씀해주세요.`
  const router = useRouter()

  const signupClickHandler = () => {
    router.push('/signup')
  }

  const signinClickHandler = () => {
    router.push('/signin')
  }

  const simpleRequestClickHandler = () => {
    router.push('/simple-request')
  }

  const complexRequestClickHandler = () => {
    router.push('/complex-request')
  }

  useEffect(() => {
    const user = auth.currentUser

    if(user){
      const name = user.email
      const id = (name as string).split('@')[0]
      
      setCurrentUser(id)
    }

  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.balloonBox}>
        <div className={styles.welcomeText}>
          <SpeechBox welcomeMessage={welcomeMessage} />
          <div className={styles.menuBox}>
            <div className={styles.menu} onClick={signupClickHandler}>1. 회원 가입</div>
            <div className={styles.menu} onClick={signinClickHandler}>2. 로그인</div>
          </div>
          <div className={styles.menuBox}>
            <div className={styles.menu} onClick={simpleRequestClickHandler}>3. 웹 페이지 이동</div>
            <div className={styles.menu} onClick={complexRequestClickHandler}>4. AI 체험</div>
          </div>
        </div>
        <Image className={styles.balloon} src={balloon} alt="Robot icon"/>
      </div>
      <div className={styles.robotBox}>
        <Image className={styles.robot} src={robot} alt="Robot icon"/>
      </div>
      <footer className={styles.footer}>이 웹 앱은 모바일 환경을 고려하지 않았으니<br /> 데스크톱 환경에서 접속하시는 것을 권장합니다. <br />image copyright vecteezy</footer>
    </div>
  )
}
