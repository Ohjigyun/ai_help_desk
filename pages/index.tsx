import Image from 'next/image'
import SpeechBox from '../components/SpeechBox'
import robot from '../assets/images/vecteezy_robot.jpg'
import balloon from '../assets/images/speech_bubble.png'
import styles from '../styles/Home.module.css'

export default function Home() {
  const welcomeMessage = `안녕하세요? \n 저는 헬프봇입니다.\n 원하시는 메뉴를 선택해주세요. \n \n1. 회원 가입 2. 로그인 \n3. 웹페이지 이동 4. AI 체험`
  return (
    <div className={styles.container}>
      <div className={styles.balloonBox}>
        <div className={styles.welcomeText}>
          <SpeechBox welcomeMessage={welcomeMessage} />
        </div>
        <Image className={styles.balloon} src={balloon} alt="Robot icon"/>
      </div>
      <div className={styles.robotBox}>
        <Image className={styles.robot} src={robot} alt="Robot icon"/>
      </div>
      <footer className={styles.footer}>이 웹 앱은 모바일 환경에서는 작동하지 않습니다. <br />image copyright vecteezy</footer>
    </div>
  )
}
