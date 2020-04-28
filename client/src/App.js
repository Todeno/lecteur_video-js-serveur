import React, { Component } from "react";
import './App.css';
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

export default class App extends Component
{
    render()
    {
        return (
            <div className="container">
                <h1>Lecteur vidéo</h1>
                <input id="input_nomVideo" type="text" placeholder="nom de la vidéo" style={{display: "flex"}}></input>
                <input id="input_codeVideo" type="text" placeholder="code secret" style={{display: "flex"}}></input>
                <button id="bouton_searchVideo" style={{display: "flex"}}>Rechercher</button>
                <span className="error" style={{display: 'none'}}>Le nom de la vidéo et le code ne correspondent pas</span>
                <VideoPlayer url=""/>
            </div>
        );
    }
}