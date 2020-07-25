import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import './styles.css';

import api from '../../src/api';


export default function Logon() {
    const [ url, setUrl ] = useState('');
    const [ data, setData ] = useState([]);

    async function handleLogin(e) {       

        e.preventDefault();

        var posicao = url.length - url.split("").reverse().join("").indexOf("/");
        var tamanho = url.length - posicao;
        var id = url.substr(posicao, tamanho);

        try 
        {            
            api.get('baixarvideo/'+id).then(response => {
                setData(response.data.media);                    
            });
        } catch (err) {
            alert(err);
        }

    }

    return (
        <div className="download-container">
            <div>
                <section className="form">             
                    <form onSubmit={handleLogin}>
                        <h1>Url tweet</h1>
                        <input placeholder="url" value={url} onChange={e => setUrl(e.target.value)} />
                        <button className="button" type="submit">Obter Vídeos</button> 
                    </form>                
                </section>
            </div>         
        
            <ul>
                {data.map(media => (
                    <li key={media.url}>      
                    <ReactPlayer 
                            className="video" 
                            playing={false} 
                            width={100}
                            height={100}
                            url={[{src: media.url, type: 'video/mp4'}]}/>         
                                     
                        <a target="_blank" href={media.url}>
                            <ReactPlayer 
                            className="video" 
                            playing={false} 
                            width={100}
                            height={100}
                            url={[{src: media.url, type: 'video/mp4'}]}/>
                            </a>
                    </li>
                ))}  
            </ul>
        </div>
    );
} 