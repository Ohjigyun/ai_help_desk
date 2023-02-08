export default function SimpleRequest() {
    return "SimpleRequest"
}


// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'

// export default function SimpleRequest() {
//     const router = useRouter()

//     const [recognition, setRecognition] = useState<any>(null)
//     const [request, setRequest] = useState<string>("")
//     const [listeningState, setListeningState] = useState<boolean>(false)
//     const [targetWebPage, setTargetWebPage] = useState<string>('')

//     useEffect(() => {
//         const { webkitSpeechRecognition } = (window as any)
//         const recognition = new webkitSpeechRecognition()

//         if(!recognition) {
//             alert('해당 브라우저는 음성 인식 기능을 지원하지 않으니 크롬으로 이용해주세요.')
//             return;
//         }

//         setRecognition(recognition)
//         recognition.lang = 'ko-KR'
//         recognition.continuous = false;
//         recognition.interimResults = true;
//         recognition.maxAlternatives = 1;
//         setListeningState(true)
//         recognition.start()
//     }, [])

//     useEffect(() => {
//         if(listeningState){
//             recognition.onresult = (event: any) => {
//                 const text = event.results[0][0].transcript
//                 setRequest(text)
//             }
//         }
//     }, [listeningState])

//     useEffect(() => {
//       type ListOfWeb = [string, string]
      
//       const webList: ListOfWeb[] = [
//         ['네이버', 'https://www.naver.com'], 
//         ['다음', 'https://www.daum.net'], 
//         ['페이스북', 'https://www.facebook.com'], 
//         ['인스타그램', 'https://www.instagram.com'], 
//         ['유튜브', 'https://www.youtube.com'],
//         ['넷플릭스', 'https://www.netflix.com'],
//         ['웨이브', 'https://www.wavve.com'],
//         ['티빙', 'https://www.tving.com']
//       ]
//         for(const web of webList){
//             if(request.includes(web[0])){
//                 setTargetWebPage(web[1])
//                 return;
//           }
//         }
        
//     }, [request])

//     useEffect(() => {
//         if(targetWebPage){
//             router.push(targetWebPage)
//         }
            
//     }, [targetWebPage])

//     return (
//         <div>
//             <textarea value={request} readOnly></textarea>
//         </div>
//     )
//   }
