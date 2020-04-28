import React, { Component } from "react";
import "./VideoPlayer.css";

export default class VideoPlayer extends Component
{
    // Il nous faut un state pour modifier les propriétés HTML du lecteur
    state = {
        video_muted: false,
        video_volume: 50,
        progression_width: 0,
        fullscreen: 'Fullscreen', // Si on est en fenêtré alors il est marqué "Fullscreen" (pour dire, appuyer pour passer en fullscreen)
        bouton_mute_txt: 'Mute'
    };

    // Evènement changer texte bouton en fonction changement plein écran / fenêtré
    fullscreenStatus(event)
    {
        if(this.state.fullscreen === "Windowed") // Si on est en plein écran
        {
            this.setState({fullscreen: "Fullscreen"}); // Indique qu'on est en fenêtré
        }
        else
        {
            this.setState({fullscreen: "Windowed"}); // Indique qu'on est en plein écran
        }
    }

    // Evènement basculer en mode plein écran / fenêtré
    switchFullscreen(event)
    {
        if(this.state.fullscreen === "Windowed") // Si on est en plein écran
        {
            document.exitFullscreen(); // Passe en fenêtré            
        }
        else // Si on est en fenêtré
        {
            document.getElementById("rjsvp_player_interface").requestFullscreen(); // Passe en plein écran
        }
    }
    
    // Evènement basculer mute/démute
    switchMute(event)
    {
        if(this.state.video_muted) // Si la vidéo est déjà muté
        {
            this.setState({video_muted: false}); // La démute
            this.setState({bouton_mute_txt: "Mute"}); // Puis change le texte du bouton
        } 
        else // Si le son de la vidéo est toujours activé
        {
            this.setState({video_muted: true}); // La mute
            this.setState({bouton_mute_txt: "Démute"}); // Puis change le texte du bouton
        }
    }

    // Evènement changer le volume
    changeVolume(event)
    {
        this.setState({video_volume: Number(event.currentTarget.value)}); // Suite à un changement de valeur, le volume de la vidéo devient égale à la nouvelle valeur (divisé par 100 car on veut %)
        //console.log(this.state);
        document.getElementById("rjsvp_video").volume = this.state.video_volume/100;
    }

    // Evènement actualiser time bar
    updateTimebar(event)
    {
        this.setState({progression_width: (event.currentTarget.currentTime / event.currentTarget.duration)* 100 + '%'}) // La barre prend la taille du temps écoulé en %
    }

    render()
    {
        document.onfullscreenchange = (event) => this.fullscreenStatus(event);
        return (
            <div id="rjsvp_player_interface" style={{display: "flex"}}>
                <video src={this.props.url} id="rjsvp_video" onTimeUpdate={(event) => this.updateTimebar(event)} muted={this.state.video_muted}/>
                <div id="rjsvp_controls">
                    <div id="rjsvp_timebar">
                        <div id="rjsvp_progression" style={{width: this.state.progression_width}}/>
                    </div>
                    <div id="rjsvp_buttons">
                        <div id="rjsvp_sound">
                            <button id="rjsvp_mute" onClick={(event) => this.switchMute(event)}>{this.state.bouton_mute_txt}</button>
                            <input id="rjsvp_volumeSlider" type="range" min="0" max="100" value={this.state.video_volume} step="1" onChange={(event) => this.changeVolume(event)}/>
                        </div>
                        <button id="rjsvp_fullscreen_button" onClick={(event) => this.switchFullscreen(event)}>{this.state.fullscreen}</button>
                    </div>
                </div>
            </div>
        );
    }
}