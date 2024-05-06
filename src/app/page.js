'use client';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const words = ["ホゲータ", "クワッス", "ニャオハ"]
    const [selCom, setSelCom] = useState(0);
    const [state, setState] = useState("");

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.code === "ArrowUp") {
                setSelCom((selCom) => selCom - 1)
            }
            else if (event.code === "ArrowDown") {
                setSelCom((selCom) => selCom + 1)
            }
            else if (event.code === "Enter") {
                setState(words[selCom])
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [selCom]);

    if (selCom === words.length) {
        setSelCom(0)
    }

    if (selCom === -1) {
        setSelCom(words.length - 1)
    }

    const handleClick = (e) => {
        console.log(e.target.value)
    }

    return (
        <>
            <input type="text" value={state} onChange={(event) => setState(event.target.value)} style={{backgroundColor: "", borderRadius: "3px", border: "1px solid #E8EAEE"}}/>
            {words.map((word, index) => {
                return (<p
                    key={index}
                    onClick={() => {
                        setSelCom(index)
                        setState(word)
                    }}
                    onMouseEnter={() => setSelCom(index)}
                    style={{ backgroundColor: selCom === index ? '#F5F5F5' : 'white' }}>
                    {word}
                </p>)
            })}
            <p>{selCom}</p>
        </>
    )
}
