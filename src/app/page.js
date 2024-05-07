'use client';
import { faAngleDown, faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'

export default function Page() {

    const words = ["フシギダネ", "フシギソウ", "フシギバナ", "ヒトカゲ", "リザード", "リザードン", "ゼニガメ", "カメール", "カメックス", "アーボ", "アーボック"];
    const [resultArray, setResultArray] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [search, setSearch] = useState(words);
    const [selected, setSelected] = useState(0);
    const [Typing, setTyping] = useState(false);
    const [focus, setFocus] = useState();
    const [deleted, setDelated] = useState(false);
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
                    setInputVal("")
                    setResultArray([...resultArray, search[selected]])
                } else {
                    setInputVal("")
                    setResultArray([...resultArray, inputVal])
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
            setResultArray([...resultArray, inputVal])
            setInputVal("")
        } else {
            setInputVal("")
        }
        setSelected(0)
        if (deleted) {
            input.current.focus()
        }
        setDelated(false)
        console.log("blur")
    }

    return (
        <main style={{ height: "100vh", color: "#757575", fontSize: "64.5%", fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <div style={{ position: "relative", fontSize: "0.9rem" }}>
                <div style={{ minHeight: "52px", paddingRight: "60px", paddingLeft: "7px", paddingTop: "7px", paddingBottom: "7px", flexWrap: "wrap", margin: "24px", border: "1px solid #C4C4C4", borderRadius: "4px", display: "flex", alignItems: "center" }} onClick={() => input.current.focus()}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        {resultArray.map((item, index) => {
                            return (
                                <div key={index} style={{ margin: "3px", paddingLeft: "10px", paddingRight: "8px", paddingTop: "6px", paddingBottom: "6px", backgroundColor: "#EBEBEB", borderRadius: "20px", display: "flex", alignItems: "center" }}>
                                    <p style={{ color: "#1E1E1E", fontSize: "0.8rem" }}>{item}</p>
                                    <FontAwesomeIcon icon={faXmark} style={{ marginLeft: "8px", backgroundColor: "#AEAEAE", color: "#EBEBEB", fontSize: "1.0rem", paddingRight: "3px", paddingLeft: "3px", paddingTop: "1px", paddingBottom: "1px", borderRadius: "20px" }} />
                                </div>
                            )
                        })}
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
                            style={{ borderRadius: "3px", width: widthByRef, maxWidth: "100%", minWidth: "1px", height: "18px", overflow: "hidden", margin: "3px" }}
                            onCompositionStart={() => setTyping(true)}
                            onCompositionEnd={() => setTyping(false)}
                        />
                    </div>
                    <div style={{ position: "absolute", right: "38px" }}>
                        {focus ? <FontAwesomeIcon icon={faXmark} style={{ fontSize: "1.2rem" }} onMouseDown={() => {
                            input.current.focus()
                            setInputVal("")
                            setResultArray(resultArray.filter((item) => (item === "")))
                            setDelated(true)
                            console.log("clicked")
                        }} /> : <p></p>}
                        <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: "12px", transform: focus ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </div>
                </div>
                {focus ?
                    <div style={{ width: "calc(100% - 48px)", padding: "6px 0px", position: "absolute", bottom: "0px", left: "50%", transform: "translate(-50%, 100%)", margin: "auto", borderRadius: "4px", boxShadow: "0px 0px 2px 1px rgba(148, 148, 148, 0.45)" }}>
                        {search.map((item, index) => {
                            return (<p
                                key={index}
                                onMouseEnter={() => setSelected(index)}
                                onMouseDown={() => {
                                    setInputVal("")
                                    setResultArray([...resultArray, item])
                                }}
                                style={{ backgroundColor: selected === index ? '#F5F5F5' : 'white', padding: "10px 14px" }}>
                                {item}
                            </p>)
                        })}
                        {search.length === 0 ? <p style={{ backgroundColor: 'white', padding: "10px 14px", color: "#A2A2A2" }}>No options</p> : <p></p>}
                    </div> : <div></div>}
                <span ref={length} style={{ visibility: "hidden", position: "absolute" }}>{inputVal}</span>
            </div>
            <div style={{ margin: "24px", fontSize: "1.0rem" }}>
                {resultArray.map((item, index) => {
                    return <p key={index}>{item}</p>
                })}
            </div>
        </main>
    )
}
