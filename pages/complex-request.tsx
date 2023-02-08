import React, { useState } from 'react'
import styles from '../styles/ComplexRequest.module.css'

export default function ComplexRequest() {
    const [request, setRequest] = useState<string>('')
    const [result, setResult] = useState<string>('')

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
    
          setResult(data.result);
          setRequest("");
        } catch(error: any) {
          // Consider implementing your own error handling logic here
          console.error(error);
          alert(error.message);
        }
      }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="animal"
                    placeholder="Enter an animal"
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                />
                <input type="submit" value="Generate names" />
            </form>
            <div className={styles.result}>{result}</div>
            <footer className={styles.footer}>위 AI는 ChatGPT를 기반으로 답변합니다. <br />image copyright vecteezy</footer>
        </div>
    )
}