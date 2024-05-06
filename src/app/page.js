'use client';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const words = ["ホゲータ", "ニャオハ", "クワッス", "グソクムシャ"];
    const [inputVal, setInputVal] = useState("");
    const [search, setSearch] = useState(words);
    const [selected, setSelected] = useState(0);
    const [Typing, setTyping] = useState(false);
    const [focus, setFocus] = useState();

    useEffect(() => {

        setSearch(words.filter((item) => (kanaToHira(item).includes(kanaToHira(inputVal)) && !(kanaToHira(item) === kanaToHira(inputVal)))))

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
            if (search.length === 0) return
            setInputVal(search[selected])
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

    return (
        <div style={{ width: "200px" }}>
            <input
                type="text"
                value={inputVal}
                onKeyDown={(e) => handleEscape(e)}
                onChange={(e) => handleChange(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => {setTimeout(() => {setFocus(false)}, 1)}}
                style={{ borderRadius: "3px", border: "1px solid #E8EAEE", width: "100%" }}
                onCompositionStart={() => setTyping(true)}
                onCompositionEnd={() => setTyping(false)}
            />
            {focus ?
                <div>
                    {search.map((item, index) => {
                        return (<p
                            key={index}
                            onMouseEnter={() => setSelected(index)}
                            onClick={() => {
                                setInputVal(item)
                                setSelected(0)
                            }}
                            style={{ backgroundColor: selected === index ? '#F5F5F5' : 'white' }}>
                            {item}
                        </p>)
                    })}
                </div> : <div></div>}
            <p>{selected}</p>
        </div>
    )
}
