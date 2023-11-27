import React from "react"
import '../styles/Home.css'

export default function Home() {
    return(
    <>
        <div className="hero-container">
            <div className="hero-title">
                <h1>DÖVAS</h1>
                <h1>FÖRENINGAR</h1>
                <h1>I ÖREBRO</h1>
            </div>
        </div>

        <div className="homepage-welcome">
            <div className="homepage-welcome-text">
                <p>Välkommen till vår gemensamma hemsida för Örebros dövas förening, Idrottsföreningen Nerike, och Örebro Dövas Pensionärsförening. Vi är stolta över att erbjuda en omfattande plattform för döva och hörselskadade i samhället.</p>
                </div>
            <div className="homepage-image1"/>
        </div>

        <div className="homepage-welcome">
        <div className="homepage-image2"/>

            <div className="homepage-welcome-text">
                <p>På vår gemensamma hemsida erbjuder vi en översiktlig kalenderfunktion som ger dig en snabb och enkel överblick över våra aktuella Aktiviteter och evenemang. Genom att klicka på kalendern får du tillgång till information om kommande händelser, möten, och roliga aktiviteter.</p>
                </div>
        </div>

        <div className="homepage-welcome">
            <div className="homepage-welcome-text">
                <p>Engagera dig och bli en del av vår gemenskap! Vi välkomnar alla som delar vårt engagemang för döva och hörselskadades rättigheter och vill vara en del av våra aktiva och levande föreningar. Oavsett om du är döv, hörselskadad eller hörande med intresse för teckenspråk, så är du hjärtligt välkommen att bli medlem hos Örebros dövas förening, Idrottsföreningen Nerike eller Örebro Dövas Pensionärsförening.</p>
            </div>

            <div className="homepage-image3"/>
        </div>

    </>
    )
}