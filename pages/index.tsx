import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function Home() {

    const [url, changeUrl] = useState("");
    const [shortened, setShortened] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [copyState, setCopyState] = useState("Copy");

    const copyContent = () => {
        navigator.clipboard.writeText(`https://linx.vercel.app/${shortened}`);
        setCopyState("Copied!");
        setTimeout(() => setCopyState("Copy"), 1500);
    };

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

    const sendLink = async () => {
        if (url === "") return;
        
        const res: any = await fetch("/api/create", {
            body: JSON.stringify({
                link: url
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const link = await res.json();

        setShowResult(true);
        return setShortened(link.shortenedLink);
    }

    return (
        <>
            <Head>
                <title>Linx URL Shortener</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet" /> 
            </Head>
            
            <Background>
                <Main initial="init" animate="load" variants={mainVariants}>
                    <Header>
                        Linx URL Shortener
                    </Header>
                    <Container>
                        <Input showResult={showResult} maxLength={200} placeholder="https://" onChange={el => changeUrl(el.target.value)}></Input>
                        <ShortenBtn showResult={showResult} onClick={sendLink}>Shorten</ShortenBtn>

                        <Result showResult={showResult}>https://linx.vercel.app/{shortened}</Result>
                        <CopyBtn showResult={showResult} onClick={copyContent}>{copyState}</CopyBtn>
                    </Container>

                    <GitHubLink href="https://github.com/cnrad/linx" target="_blank" whileHover={{scale: 0.9}} transition={{duration: 0.25, ease: "easeInOut"}}>
                        <GitHubIcon />
                    </GitHubLink>

                </Main>
            </Background>
        </>
    )
}

const Main = styled(motion.div)`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    color: #fff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Background = styled(motion.div)`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;

    background: linear-gradient(60deg, #000428, #004e92);
`

const Header = styled(motion.div)`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
`

const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled(motion.input)<{showResult: boolean}>`
    display: ${({showResult}) => showResult ? "none" : "inline"};
    text-align: left;
    border-radius: 8px;
    min-width: 20rem;
    width: 50%;
    font-size: 1em;
    border: none;
    padding: 0.5rem;
    color: #000;
    background: #fff;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
    transition: background ease-in-out 0.2s;

    &:focus {
        outline: 0;
        background: #eee;
    }
`

const ShortenBtn = styled(motion.div)<{showResult: boolean}>`
    display: ${({showResult}) => showResult ? "none" : "inline"};
    text-align: center;
    border-radius: 8px;
    width: 4rem;
    font-size: 1em;
    padding: 0.5rem;
    color: #fff;
    background: #3945df;
    transition: background ease-in-out 0.2s;

    &:hover {
        cursor: pointer;
        background: #5975ff;
    }
`

const Result = styled(motion.div)<{showResult: boolean}>`
    display: ${({showResult}) => showResult ? "inline" : "none"};
    text-align: center;
    border-radius: 8px;
    min-width: 20rem;
    width: 50%;
    font-size: 1em;
    font-weight: 500;
    border: none;
    padding: 0.5rem;
    color: #193259;
    background: #91deff;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
    transition: background ease-in-out 0.2s;
`

const CopyBtn = styled(motion.div)<{showResult: boolean}>`
    display: ${({showResult}) => showResult ? "inline" : "none"};

    border-radius: 8px;
    text-align: center;
    min-width: 4rem;
    text-align: center;
    width: 4rem;
    font-size: 1em;
    padding: 0.5rem;
    color: #fff;
    background: #3945df;
    transition: background ease-in-out 0.2s;

    &:hover {
        cursor: pointer;
        background: #5975ff;
    }
`

const GitHubLink = styled(motion.a)`
    position: fixed;
    bottom: 3rem;
    
    display: flex;
    align-items: center;

`

const GitHubIcon = (props: any) => {
    return(
        <motion.svg role="img" viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </motion.svg>
    )
}