import Image from 'next/image'
import SpeechBox from '../components/SpeechBox'
import robot from '../assets/images/vecteezy_robot.jpg'
import balloon from '../assets/images/speech_bubble.png'
import styles from '../styles/SimpleRequest.module.css'

export default function SimpleRequest() {
    const welcomeMessage = `이동하실 웹페이지를 말씀해주세요. \n ex) naver, google, youtube...`
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