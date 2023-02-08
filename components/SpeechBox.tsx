import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/SpeechBox.module.css'

interface SpeechBoxProps {
    welcomeMessage: string
}

export default function SpeechBox( props: SpeechBoxProps ) {
    const router = useRouter()

    const [recognition, setRecognition] = useState<any>(null)
    const [request, setRequest] = useState<string>(props.welcomeMessage || '')
    const [listeningState, setListeningState] = useState<boolean>(false)
    const [targetWebPage, setTargetWebPage] = useState<string>('')

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
        setListeningState(true)
        recognition.start()

    }, [])

    const handleListeningState = (e: React.MouseEvent<HTMLButtonElement>) => {
        setListeningState(true)
        recognition.start()
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

    useEffect(() => {
        // 메뉴 선택
        if(request === '회원가입'){
            router.push('/signup')
            return
        }
        if(request === '로그인'){
            router.push('/signin')
            return
        }
        if(request === '웹 페이지 이동'){
            router.push('/simple-request')
            return
        }
        if(request === 'AI 체험'){
            router.push('/complex-request')
            return
        }
        // 웹페이지 이동        
        type ListOfWeb = [string, string]
        
        const webList: ListOfWeb[] = [
            ['네이버', 'https://www.naver.com'], 
            ['다음', 'https://www.daum.net'], 
            ['페이스북', 'https://www.facebook.com'], 
            ['인스타그램', 'https://www.instagram.com'], 
            ['유튜브', 'https://www.youtube.com'],
            ['넷플릭스', 'https://www.netflix.com'],
            ['웨이브', 'https://www.wavve.com'],
            ['티빙', 'https://www.tving.com'],
            ['구글', 'https://google.com'],
            ['쿠팡', 'https://coupang.com'],
            ['아마존', 'https://amazon.com'],
            ['스택오버플로우', 'https://stackoverflow.com/']
        ]

        for(const web of webList){
            if(request.includes(web[0])){
                setTargetWebPage(web[1])
                return;
            }
        }
          
    }, [request])

    useEffect(() => {
        if(targetWebPage){
            router.push(targetWebPage)
        }
            
    }, [targetWebPage])

    console.log(listeningState)
    return (
        <div className={styles.container}>
            <div className={styles.RequestText}>{props.welcomeMessage}</div>
            {listeningState ? 
                null
                :
                <button onClick={handleListeningState}>재입력</button>}
        </div>
    )
}
