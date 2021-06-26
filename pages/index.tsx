import Head from 'next/head';
import { useState } from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function Home() {

    const [url, changeUrl] = useState("https://google.com");
    const [shortened, setShortened] = useState("...");

    const mainVariants = {
        init: {
            opacity: 0,
            scale: 0
        },
        load: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    }
    const handleForm = async () => {
        const res: any = await fetch("/api/create", {
            body: JSON.stringify({
                link: url
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        return setShortened(res.shortenedLink);
    }

    return (
        <>
            <Head>
                <title>Linx URL Shortener</title>
            </Head>
            <Main>
                <Input onChange={el => changeUrl(el.target.value)}></Input>
                <button onClick={handleForm}>create</button>
                <Result>Your link is available at linx.vercel.app/{shortened}</Result>
            </Main>
        </>
    )
}

const Main = styled(motion.div)`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
`

const Input = styled(motion.input)`
    text-align: left;
    border-radius: 8px;
    border: none;
    width: 80%;
    max-width: 250px;
    margin: 0 25px 15px;
    font-size: 1em;
    padding: 5px 10px;
    color: #aaabaf;
    background: #191d28;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    transition: background ease-in-out 0.2s;

    &:focus {
        outline: 0;
        background: #11151f;
    }
`

const Result = styled(motion.div)`

`