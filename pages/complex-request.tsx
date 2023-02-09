import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import astronaut from '../assets/images/vecteezy_astronaut.png'
import robot from '../assets/images/vecteezy_robot.png'
import styles from '../styles/ComplexRequest.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

export default function ComplexRequest() {
    const [request, setRequest] = useState<string>('')
    const [result, setResult] = useState<string>('')
    const [qnaLog, setQnaLog] = useState<string[]>([])
    const [listenState, setListenState] = useState<boolean>(false)

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
            setResult(data.result);
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
                                 <Image className={qnaLog.length - 1 === index && index >= 5 ? `${styles.robot} ${styles.lastChat}` : `${styles.robot}`} src={robot} alt="robot icon"/>}
              <div className={qnaLog.length - 1 === index && index >= 5 ? `${styles.chat} ${styles.lastChat}` : `${styles.chat}`}>{qna}</div>
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
                <button className={styles.sendButton}><FontAwesomeIcon className={styles.airPlane} icon={faPaperPlane} /></button>
            </form>
          </div>  
          <footer className={styles.footer}>위 AI는 ChatGPT를 기반으로 답변합니다. <br />image copyright vecteezy</footer>
        </div>
    )
}