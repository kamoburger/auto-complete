'use client';
import { faAngleDown, faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'

export default function Page() {

    const words = ["ホゲータ", "ニャオハ", "クワッス", "グソクムシャ"];
    const [inputVal, setInputVal] = useState("");
    const [search, setSearch] = useState(words);
    const [selected, setSelected] = useState(0);
    const [Typing, setTyping] = useState(false);
    const [focus, setFocus] = useState();
    let [widthByRef, setWidthByRef] = useState(200);
    const input = useRef()
    const length = useRef()

    useEffect(() => {

        setSearch(words.filter((item) => (kanaToHira(item).includes(kanaToHira(inputVal)) && !(kanaToHira(item) === kanaToHira(inputVal)))))
        setWidthByRef(length.current ? length.current.offsetWidth : 0);

    }, [inputVal, selected])

    const handleChange = (e) => {
        setInputVal(e.target.value)
        setSelected(0)
    }

    const handleEscape = (event) => {

        if (event.code === "ArrowUp") {
            event.preventDefault()
            if (search.length === 0) return
            setSelected((selected) => selected - 1)
            if (selected === 0) {
                setSelected(search.length - 1)
            }
        }
        else if (event.code === "ArrowDown") {
            if (search.length === 0) return
            setSelected((selected) => selected + 1)
            if (selected === search.length - 1) {
                setSelected(0)
            }
        }
        else if (event.code === "Enter" && Typing === false) {

            input.current.blur()

            let data = []
            words.map((item) => {
                if (item === inputVal || item === search[selected])
                    data = [...data, item]
            })
            if (data.length !== 0) {
                if (search[selected]) {
                    setInputVal(search[selected])
                } else {
                    setInputVal(inputVal)
                }
            } else {
                setInputVal("")
            }

            setSelected(0)

        }
    };

    function kanaToHira(str) {
        return str.replace(/[\u30a1-\u30f6]/g, function (match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    }

    function hiraToKana(str) {
        return str.replace(/[\u3041-\u3096]/g, function (match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }

    const handleBlur = () => {
        setFocus(false)
        let data = []
        words.map((item) => {
            if (item === inputVal)
                data = [...data, item]
        })
        if (data.length !== 0) {
            return
        } else {
            setInputVal("")
        }
    }

    return (
        <main style={{ height: "100vh", color: "#757575" }}>
            <div style={{position: "relative"}}>
                <div style={{ margin: "24px", height: "56px", border: "1px solid #C4C4C4", borderRadius: "4px", display: "flex", alignItems: "center" }} onClick={() => input.current.focus()}>
                    <input
                        type="text"
                        ref={input}
                        value={inputVal}
                        onKeyDown={(e) => handleEscape(e)}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                            setFocus(true)
                        }}
                        onBlur={() => handleBlur()}
                        style={{ borderRadius: "3px", width: widthByRef, maxWidth: "100%", minWidth: "1px", height: "18px", marginLeft: "10px", marginRight: "60px", overflow: "hidden" }}
                        onCompositionStart={() => setTyping(true)}
                        onCompositionEnd={() => setTyping(false)}
                    />
                    <div style={{position: "absolute", right: "38px"}}>
                        {focus ? <FontAwesomeIcon icon={faXmark} onMouseDown={() => setInputVal("")}/> : <p></p>}
                        <FontAwesomeIcon icon={faAngleDown} style={{marginLeft: "12px"}}/>
                    </div>
                </div>
                {focus ?
                    <div style={{width: "calc(100% - 48px)", position: "absolute", top: "56px", right: "0", left: "0", margin: "auto"}}>
                        {search.map((item, index) => {
                            return (<p
                                key={index}
                                onMouseEnter={() => setSelected(index)}
                                onMouseDown={() => {
                                    setInputVal(item)
                                }}
                                style={{ backgroundColor: selected === index ? '#F5F5F5' : 'white' }}>
                                {item}
                            </p>)
                        })}
                    </div> : <div></div>}
                    <span ref={length} style={{visibility: "hidden", position: "absolute"}}>{inputVal}</span>
            </div>
            <div style={{margin: "24px"}}>aaa</div>
        </main>
    )
}
