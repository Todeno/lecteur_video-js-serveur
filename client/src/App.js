import React, { Component } from "react";
import './App.css';

export default class App extends Component
{
    render()
    {
        return (
            <div class="container">
                <h1>Lecteur vidéo</h1>
                <input id="input_nomVideo" type="text" placeholder="nom de la vidéo" style={{display: "flex"}}></input>
                <input id="input_codeVideo" type="text" placeholder="code secret" style={{display: "flex"}}></input>
                <button id="bouton_searchVideo" style={{display: "flex"}}>Rechercher</button>
                <span class="error" style={{display: 'none'}}>Le nom de la vidéo et le code ne correspondent pas</span>
                <div class="player_interface" style={{display: 'none'}}>
                    <video src="" class="video"></video>

                    <div class="controls">
                        <div id="timebar">
                            <div id="progression"></div>
                        </div>
                        <div class="buttons">
                            <div class="sound">
                                <button id="mute">Mute</button>
                                <input type="range" id="volumeSlider" min="0" max="100" value="50" step="1"></input>
                            </div>
                            <button id="fullscreen">Fullscreen</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}