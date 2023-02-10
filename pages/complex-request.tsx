import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import astronaut from '../assets/images/vecteezy_astronaut.png'
import robot from '../assets/images/vecteezy_robot.png'
import styles from '../styles/ComplexRequest.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

export default function ComplexRequest() {
  const [recognition, setRecognition] = useState<any>(null)
  const [listeningState, setListeningState] = useState<boolean>(false)
  const [request, setRequest] = useState<string>('')
  const [qnaLog, setQnaLog] = useState<string[]>([])

  useEffect(() => {
    const { webkitSpeechRecognition } = (window as any)
    const recognition = new webkitSpeechRecognition()

    if(!recognition) {
        alert('해당 브라우저는 음성 인식 기능을 지원하지 않으니 크롬으로 이용해주세요.')
        return;
    }

    setRecognition(recognition)
    recognition.lang = 'ko-KR'
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
  }, [])
 
  const handleListeningOn = (e: React.MouseEvent<HTMLDivElement>) => {
    setListeningState(true)
    recognition.start()
  }

  const handleListeningOff = (e: React.MouseEvent<HTMLDivElement>) => {
    setListeningState(false)
    recognition.stop()
  }

  useEffect(() => {
    if(listeningState){
        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript
            const isFinal = event.results[0].isFinal
            if(isFinal){
              setListeningState(false)
            }
            setRequest(text)
        }
    }
  }, [listeningState])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setQnaLog((prev) => [...prev, request, ''])
      for(let i = 0; i < 10; i++){
        try {
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ request: request }),
          });
    
          const data = await response.json();
          if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }
          
          setQnaLog((prev) => [...prev.slice(0, prev.length - 1), data.result])
          setRequest("");
          return;
        } catch(error: any) {
          // Consider implementing your own error handling logic here
          console.error(error);
          if(i === 9) alert(error.message)
        }
      }
    }

  return (
      <div className={styles.container}>
        {qnaLog.map((qna, index) => (
          <div className={styles.qnaLog} key={index}>
            {index % 2 === 0 ? <Image className={styles.astronaut} src={astronaut} alt="astronaut icon"/>
                                :
                                <Image className={qnaLog.length - 1 === index ? `${styles.robot} ${styles.lastChat}` : `${styles.robot}`} src={robot} alt="robot icon"/>}
            <div className={qnaLog.length - 1 === index ? `${styles.chat} ${styles.lastChat}` : `${styles.chat}`}>{qna}<span className={qnaLog.length - 1 === index ? styles.blinkChat : styles.hiddenChat}>|</span></div>
          </div>
        ))}
        <div className={styles.questionBox}>
          <form onSubmit={onSubmit}>
              <input
                  className={styles.questionText}
                  type="text"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
              />
              {listeningState ? 
                              <div className={styles.offButton} onClick={handleListeningOff}><FontAwesomeIcon icon={faMicrophoneSlash} /></div> 
                              : 
                              <div className={styles.onButton} onClick={handleListeningOn}><FontAwesomeIcon icon={faMicrophone} /></div>}
              
              
              <button className={styles.sendButton}><FontAwesomeIcon className={styles.airPlane} icon={faPaperPlane} /></button>
          </form>
        </div>  
        <footer className={styles.footer}>위 AI는 ChatGPT를 기반으로 답변합니다. <br />image copyright vecteezy</footer>
      </div>
  )
}