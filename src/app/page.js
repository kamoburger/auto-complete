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
    const [trash, setTrash] = useState(false);
    const [widthByRef, setWidthByRef] = useState();
    const input = useRef();
    const length = useRef();
    const placeHolder = useRef();
    const scroll = useRef();

    useEffect(() => {

        setSearch(words.filter((item) => (kanaToHira(item).includes(kanaToHira(inputVal)) && !(kanaToHira(item) === kanaToHira(inputVal)) && !resultArray.includes(item))))
        setWidthByRef(length.current ? length.current.offsetWidth : 0);

    }, [inputVal, selected, resultArray])

    const handleChange = (e) => {
        setInputVal(e.target.value)
        setSelected(0)
    }

    const handleUpScroll = () => {
        const elm = scroll.current
        const frameTop = elm.scrollTop
        const frameBottom = elm.scrollTop + elm.clientHeight
        const optionTop = 37 * selected
        const optionBottom = 37 * (selected + 1)
        if (frameTop + 37 > optionTop) {
            elm.scrollTo(0, 37 * (selected - 1))
        }
        if (frameBottom < optionBottom) {
            elm.scrollTo(0, 37 * (selected - 1))
        }
        if (selected === 0) {
            elm.scrollTo(0, 10000)
        }
        // console.log(frameTop, frameBottom, optionTop, optionBottom)
    }

    const handleDownScroll = () => {
        const elm = scroll.current
        const frameTop = elm.scrollTop
        const frameBottom = elm.scrollTop + elm.clientHeight
        const optionTop = 37 * selected
        const optionBottom = 37 * (selected + 1)
        if (frameBottom - 37 < optionBottom) {
            elm.scrollTo(0, 37 * (selected - 6))
        }
        if (frameTop > optionTop) {
            elm.scrollTo(0, 37 * (selected - 6))
        }
        if (selected === search.length - 1) {
            elm.scrollTo(0, 0)
        }
        // console.log(frameTop, frameBottom, optionTop, optionBottom)
    }

    const handleEscape = (event) => {

        if (event.code === "ArrowUp") {
            event.preventDefault()
            if (search.length === 0) return
            setSelected((selected) => selected - 1)
            if (selected === 0) {
                setSelected(search.length - 1)
            }
            if (focus) {
                handleUpScroll()
            }
        }
        else if (event.code === "ArrowDown") {
            if (search.length === 0) return
            setSelected((selected) => selected + 1)
            if (selected === search.length - 1) {
                setSelected(0)
            }
            if (focus) {
                handleDownScroll()
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
        } else if (event.code === "Backspace") {
            if (inputVal === "" && resultArray.length !== 0) {
                setResultArray(resultArray.filter((item, index) => (index !== (resultArray.length - 1))))
            }
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
        setFocus(false)
    }

    return (
        <main style={{ color: "#757575", fontSize: "64.5%", fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <div style={{ position: "relative", fontSize: "0.9rem" }}>
                <div style={{ minHeight: "52px", paddingRight: "60px", paddingLeft: "7px", paddingTop: "7px", paddingBottom: "7px", flexWrap: "wrap", margin: "24px", border: "1px solid #C4C4C4", borderRadius: "4px", display: "flex", alignItems: "center" }} onClick={() => {
                    if (trash) {
                        setTrash(false)
                    } else {
                        input.current.focus()
                    }
                }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        {resultArray.map((item, index) => {
                            return (
                                <div key={index} style={{ margin: "3px", paddingLeft: "10px", paddingRight: "8px", paddingTop: "6px", paddingBottom: "6px", backgroundColor: "#EBEBEB", borderRadius: "20px", display: "flex", alignItems: "center" }}>
                                    <p style={{ color: "#1E1E1E", fontSize: "0.8rem" }}>{item}</p>
                                    <FontAwesomeIcon onMouseDown={() => {
                                        input.current.blur()
                                        setResultArray(resultArray.filter((data) => (data !== item)))
                                        setTrash(true)
                                    }} icon={faXmark} style={{ marginLeft: "8px", backgroundColor: "#AEAEAE", color: "#EBEBEB", fontSize: "1.0rem", paddingRight: "3px", paddingLeft: "3px", paddingTop: "1px", paddingBottom: "1px", borderRadius: "20px" }} />
                                </div>
                            )
                        })}
                        <div style={{height: "30px", position: "relative", margin: "3px 3px 3px 6px", display: "flex", alignItems: "center", minWidth: "112px"}}>
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
                                style={{ fontSize: "16px", borderRadius: "3px", width: widthByRef, maxWidth: "100%", minWidth: 1, height: "100%", overflow: "hidden" }}
                                onCompositionStart={() => setTyping(true)}
                                onCompositionEnd={() => setTyping(false)}
                            />
                            {inputVal === "" ? <p ref={placeHolder} style={{position: "absolute", whiteSpace: "nowrap", left: "0", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#A2A2A2"}}>ポケモンを検索</p> : <p></p>}
                        </div>
                    </div>
                    <div style={{ position: "absolute", right: "38px" }}>
                        {focus ? <FontAwesomeIcon icon={faXmark} style={{ fontSize: "1.2rem" }} onMouseDown={() => {
                            input.current.focus()
                            setInputVal("")
                            setResultArray(resultArray.filter((item) => (item === "")))
                        }} /> : <p></p>}
                        <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: "12px", transform: focus ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </div>
                </div>
                    {focus ? <div ref={scroll} style={{ maxHeight: "308px", overflow: "scroll", width: "calc(100% - 48px)", backgroundColor: "#FFFFFF", padding: "6px 0px", position: "absolute", bottom: "0px", left: "50%", transform: "translate(-50%, 100%)", margin: "auto", borderRadius: "4px", boxShadow: "0px 0px 2px 1px rgba(148, 148, 148, 0.45)" }}>
                        {search.map((item, index) => {
                            return (<>
                                {!resultArray.includes(item) || resultArray.length === 0 ? <div
                                    key={index}
                                    onMouseEnter={() => setSelected(index)}
                                    onMouseDown={() => {
                                        setInputVal("")
                                        setResultArray([...resultArray, item])
                                    }}
                                    style={{ backgroundColor: selected === index ? '#F5F5F5' : 'white', height: "37px", display: "flex", alignItems: "center"}}>
                                        <p style={{marginLeft: "14px"}}>{item}</p>
                                </div> : <div></div>}
                            </>)
                        })}
                        {search.length === 0 ? <p style={{ backgroundColor: 'white', padding: "10px 14px", color: "#A2A2A2" }}>No options</p> : <p></p>}
                    </div> : <div></div>}
                <span ref={length} style={{ visibility: "hidden", position: "absolute", fontSize: "16px" }}>{inputVal}</span>
            </div>
            <div style={{ margin: "24px", fontSize: "1.0rem" }}>
                {resultArray.map((item, index) => {
                    return <p key={index}>{item}</p>
                })}
            </div>
        </main>
    )
}
